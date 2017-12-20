import { Component, OnInit, OnChanges, Input, SimpleChanges, ElementRef } from '@angular/core';

import { OpenRefineService } from '../../shared/open-refine/open-refine.service';

import * as d3 from 'd3';

@Component({
  selector: 'metric-preview',
  templateUrl: './metric-preview.component.html',
  styleUrls: ['./metric-preview.component.sass']
})
export class MetricPreviewComponent implements OnInit, OnChanges {

  @Input() private projectId: string;

  private svgHeight:number = 100;

  private htmlElement: HTMLElement;
  private metricsOverlayModel;
  private columnMetricColors: any;
  private spanMetricColors: any;

  constructor(private element: ElementRef, private openRefineService: OpenRefineService) {
    this.htmlElement = this.element.nativeElement;
  }

  ngOnInit() {
    if (this.metricsOverlayModel) {
      let colorbrewer = require('colorbrewer');
      let colColors = colorbrewer.Reds[this.metricsOverlayModel.availableMetrics];
      let spanColors = colorbrewer.Oranges[this.metricsOverlayModel.availableMetrics];
      this.columnMetricColors = {};
      this.spanMetricColors = {};
      for(let m in this.openRefineService.model.availableMetrics) {
        this.columnMetricColors[this.openRefineService.model.availableMetrics[m]] = colColors[m];
      }
      for (let m in this.openRefineService.model.availableSpanningMetrics) {
        this.spanMetricColors[this.openRefineService.model.availableSpanningMetrics[m]] = spanColors[m];
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["projectId"]) {
      this.openRefineService.getRefineProject(this.projectId).subscribe(
        (project:any) => {
          // console.log(project.overlayModels["metricsOverlayModel"]);
          this.metricsOverlayModel = project.overlayModels["metricsOverlayModel"];
          let svg = d3.select(this.htmlElement).select("svg");
          if(this.metricsOverlayModel) {
            
            let stack = d3.stack().keys(this.metricsOverlayModel.availableMetrics) //.concat(this.metricsOverlayModel.availableSpanningMetrics)
              .order(d3.stackOrderNone)
              .offset(d3.stackOffsetNone)
              .value(function(d, key) {
                if(d) {
                  if (d.metrics && d.metrics[key])
                    return d.metrics[key].measure;
                }
              });

            let metrics = stack(this.metricsOverlayModel.metricColumns);
            var bandScale = d3.scaleBand()
              .domain(project.columnModel.columns.map(function(d) { return d.name }))
              .range([0, 500])
              .padding(0);
            var y = d3.scaleLinear().domain([0,this.metricsOverlayModel.availableMetrics.length]).range([this.svgHeight, 0])
            
            let colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];

            let area = d3.area()
              // .interpolate("cardinal")
              .x(function(d:any) {
                // console.log(bandScale(d.data.columnName));
                return bandScale(d.data.columnName); 
              })
              .y0(function(d:any) {
                // console.log(y(d["0"]));
                return y(d["0"]); 
              })
              .y1(function(d:any) {
                // console.log(y(d["1"]));
                return y(d["1"]); 
              });

            svg.selectAll("g.metric")
              .data(metrics)
              .enter().append("g")
              .attr("class", "metric")
              .selectAll("rect")
              .data((d) => { return d; })
              .enter()
              .append("rect")
                .attr("x", (d:any) => { 
                  return bandScale(d.data.columnName);
                })
                .attr("y", (d:any) => { return y(d[1]) })
                .attr("height", (d:any) => {
                  if(d[1] > 0)
                    console.log(d[1]);
                  return y(d[0]) - y(d[1]);
                })
                .attr("width", bandScale.bandwidth());
              // .attr("d", function(d:any, i:number) {
              //   return area(d);
              // });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
