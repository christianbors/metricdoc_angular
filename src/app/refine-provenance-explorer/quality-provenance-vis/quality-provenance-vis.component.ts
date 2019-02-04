import { Component, OnInit, Input, ElementRef, ViewChild }  from '@angular/core';

import { OpenRefineService }         from './../../shared/open-refine/open-refine.service';

import * as d3 from 'd3';
import * as d3Transform from 'd3-transform';

@Component({
  selector: 'app-quality-provenance-vis',
  templateUrl: './quality-provenance-vis.component.html',
  styleUrls: ['./quality-provenance-vis.component.sass']
})
export class QualityProvenanceVisComponent implements OnInit {

  @Input() pageWidth: number;
  @Input() componentHeight: number;
  @Input() openRefineService: OpenRefineService;
  @Input() projectId: number;

  @ViewChild('detailView')
  svgBase:ElementRef;

  errorMessage;

  provenanceOverlayModel: any;

  constructor() { 
    // this.d3Transform = require("d3-transform");
  }

  ngOnInit() {
    this.getRefineProject();
  }

  private getRefineProject() {
    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];

          if(this.provenanceOverlayModel) {
            
            this.openRefineService.getHistory(this.projectId)
              .subscribe((history: any) => {
                // gather all relevant history entries/activities -- with this we want to create the quality bars

                let historyFlow = [];
                let metricColPair = [];

                for (let pastEntry of history.past) {
                  let quality = [];
                  for (let ent in this.provenanceOverlayModel.provenance.entity) {
                    // let histId = entity[0].replace("history_entry:", "");
                    if(this.provenanceOverlayModel.provenance.entity[ent]["quality:"+pastEntry.id])
                      quality.push({col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:"+pastEntry.id]});
                  };
                  let metrics = [];
                  for (let pair of Object.values(quality)) {
                    for (let m of pair.metrics) {
                      if(!metricColPair.some(obj => obj.metric === m.type && obj.column === pair.col ))
                        metricColPair.push({metric: m.type, column: pair.col});
                      let found = metrics.find((metric: any, idx: number, array: any[]) => {
                        return metric.name == m.type;
                      });
                      if (found != null)
                        found.values.push({value: m.$, column: pair.col});
                      else
                        metrics.push({name: m.type, values: [{value: m.$, column: pair.col}]})
                    }
                  }
                  if (metrics.length > 0)
                    historyFlow.push({pastEntry: pastEntry, metrics: metrics});
                }
                metricColPair.sort((a: any, b:any) => {
                  if(a.metric < b.metric) { return -1; }
                  if(a.metric > b.metric) { return 1; }
                  return 0;
                })
                let stack = d3.stack()
                    .keys(metricColPair)
                    .value((d: any, key: any, j, data) => {
                      let metricStack = d.metrics.find((d:any) => { return d.name === key.metric });
                      let metric = metricStack.values.find((obj => obj.column === key.column));
                      if(metric)
                        return parseFloat(metric.value);
                      else return 0;
                    })(historyFlow);

                let arr = Array.prototype.concat.apply([], stack[stack.length-1]);
                let maxVal = Math.max.apply(Math, arr);
                // max scale needs to be determined
                let y = d3.scaleLinear().rangeRound([this.svgBase.nativeElement.scrollHeight - 20, 0]).domain([0, maxVal]).nice();

                // let metricColorScale = d3.scaleSequential(d3.interpolateViridis);
                let uniqueMetrics = [];
                metricColPair.forEach(val => { if(!uniqueMetrics.includes(val.metric)) uniqueMetrics.push(val.metric); })

                let metricColorScale = d3.scaleOrdinal(d3.schemePastel2).domain(uniqueMetrics);
                let metricBorderScale = d3.scaleOrdinal(d3.schemeDark2).domain(uniqueMetrics);
                let scaleByHistory = d3.scaleBand().domain(historyFlow.map(historyEntry => historyEntry.pastEntry.id)).range([15, parseFloat(this.svgBase.nativeElement.scrollWidth) - 15]).padding(0.05);

                d3.select('svg.barchart').selectAll("g")
                  .data(stack).enter()
                  .append("g")
                  .attr("class", (stack:any) => stack.key.column + " " + stack.key.metric)
                  .attr("transform", d3Transform.transform().translate(20,15))
                  .attr("fill", (d:any) => { 
                    return metricColorScale(d.key.metric); 
                  })
                  .attr("stroke", (d:any) => {
                    return metricBorderScale(d.key.metric);
                  })
                  .attr("stroke-width", .5)
                  .attr("stroke-opacity", .6)
                .selectAll("rect")
                .data(stack => stack).enter()
                .append("rect")
                  .attr("x", (d:any) => {
                    return scaleByHistory(d.data.pastEntry.id); 
                  })
                  .attr("y", (d) => { 
                    return y(d[1]); 
                  })
                  .attr("height", (d) => {
                    return y(d[0]) - y(d[1]); 
                  })
                  .attr("width", scaleByHistory.bandwidth())
                ;
            });
          }
        },
        error => this.errorMessage = <any>error
    );
  }
}
