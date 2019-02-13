import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild, SimpleChange, SimpleChanges }  from '@angular/core';

import { OpenRefineService }         from './../../shared/open-refine/open-refine.service';

import * as d3 from 'd3';
import * as d3Transform from 'd3-transform';

@Component({
  selector: 'app-quality-provenance-vis',
  templateUrl: './quality-provenance-vis.component.html',
  styleUrls: ['./quality-provenance-vis.component.scss']
})
export class QualityProvenanceVisComponent implements OnInit, OnChanges {

  @Input() pageWidth: number;
  @Input() componentHeight: number;
  @Input() openRefineService: OpenRefineService;
  @Input() projectId: number;
  @Input() histId: number;

  currentHistId: any;
  qualityViewWidth: number = 80;
  transition: any;

  @ViewChild('qualityView')
  svgDetailView:ElementRef;
  @ViewChild('issueView')
  svgErrorView:ElementRef;

  errorMessage;
  uniqueMetrics: string[] = [];

  provenanceOverlayModel: any;

  constructor() { 
    // this.d3Transform = require("d3-transform");
    this.transition = d3.transition()
      .duration(750)
      .ease(d3.easeLinear);
  }

  ngOnInit() {
    this.getRefineProject();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.provenanceOverlayModel && changes.histId) {
      const histId: SimpleChange = changes.histId;
      this.currentHistId = histId.currentValue;
      this.renderIssueView(this.histId);
    }
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
                this.renderQualityView(history.past, true);

                // this.currentHistId = this.provenanceOverlayModel.currentHistoryEntry.localPart
                this.renderIssueView(this.histId);
            });
          }
        },
        error => this.errorMessage = <any>error
    );
  }

  private renderQualityView(pastEntriesList:any, qualitMode: boolean) {

    let historyFlow = [];
    let metricColPair = [];

    var div = d3.select("body").append("div")
      .attr("class", "d3tooltip")
      .style("opacity", 0);

    for (let pastEntry of pastEntriesList) {
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
    let y = d3.scaleLinear().rangeRound([this.svgDetailView.nativeElement.scrollHeight - 20, 0]).domain([0, maxVal]).nice();

    // let metricColorScale = d3.scaleSequential(d3.interpolateViridis);
    metricColPair.forEach(val => {
      if(!this.uniqueMetrics.includes(val.metric.replace("quality:", "")))
        this.uniqueMetrics.push(val.metric.replace("quality:", "")); 
    })

    let metricColorScale = d3.scaleOrdinal(d3.schemePastel2).domain(this.uniqueMetrics);
    let metricBorderScale = d3.scaleOrdinal(d3.schemeDark2).domain(this.uniqueMetrics);
    let scaleByHistory = d3.scaleBand().domain(historyFlow.map(historyEntry => historyEntry.pastEntry.id)).range([15, parseFloat(this.svgDetailView.nativeElement.scrollWidth) - 15]).padding(0.05);

    d3.select('svg.barchart').selectAll("g")
      .data(stack).enter()
      .append("g")
        .attr("class", (stack:any) => stack.key.column + " " + stack.key.metric)
        .attr("transform", d3Transform.transform().translate(20,15))
        .attr("fill", (d:any) => metricColorScale(d.key.metric.replace("quality:", "")) )
        .attr("stroke", (d:any) => metricBorderScale(d.key.metric.replace("quality:", "")) )
        .attr("stroke-width", .5)
        .attr("stroke-opacity", .6)
        .on("mouseover", (data:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1);
          div.transition()
            .duration(100)
            .style("opacity", .9);
          div.html(data.key.column + " " + data.key.metric)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (d:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", .5)
            .attr("stroke-opacity", .6);
          div.transition()
            .duration(100)
            .style("opacity", 0);
        })
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
        .attr("width", scaleByHistory.bandwidth());
  }

  private renderIssueView(histId: any) {
    let issues = [];
    for (let ent in this.provenanceOverlayModel.provenance.entity) {
      // let histId = entity[0].replace("history_entry:", "");
      let errorIndices = [];
      if(this.provenanceOverlayModel.provenance.entity[ent]["error:"+histId]) {
        for (let errorArray of this.provenanceOverlayModel.provenance.entity[ent]["error:"+histId])
          errorIndices.push({metric: errorArray.type, indices: JSON.parse(errorArray.$)});
        issues.push({col: ent, issues: errorIndices});
      }
    };
  
    let metricColorScale = d3.scaleOrdinal(d3.schemePastel2).domain(this.uniqueMetrics);
    let metricBorderScale = d3.scaleOrdinal(d3.schemeDark2).domain(this.uniqueMetrics);
    
    let scaleXColumn = d3.scaleBand()
      .domain(issues.map(issuesEntry => issuesEntry.col))
      .range([15, parseFloat(this.svgErrorView.nativeElement.scrollWidth) - 15]); //.padding(0.05)
    let maxRows:number[] = Object.values(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]).map((el: any) => {
      if(el.type === "project_info:rowSize")
        return parseInt(el.$);
    }).filter(el => el != null);
    let maxRowNumber = Math.max.apply(Math, maxRows);
    
    let scaleYRows = d3.scaleLinear()
      .domain([0, maxRowNumber])
      .rangeRound([this.svgDetailView.nativeElement.scrollHeight - 20, 15]);
    // let issueView = 
    //   .data(issues);

    // // EXIT old elements not present in new data.
    // issueView.exit()
    //   // .attr("class", "exit")
    //   .transition(this.transition)
    //     .style("fill-opacity", 1e-6)
    //     .remove();
    // // UPDATE old elements present in new data.
    // issueView//.attr("class", "update")
    //     .style("fill-opacity", 1)
    //   .transition(this.transition);
    // ENTER new elements present in new data.
    let gCols = d3.select('#issueView').selectAll("g.column")
      .data(issues);
    // EXIT old elements not present in new data.
    gCols.exit()
      .transition(this.transition)
      .remove();
    // UPDATE old elements present in new data.
    gCols.transition(this.transition)
        .attr("transform", (d:any) => "translate(" + scaleXColumn(d.col) + ",0)")
    // ENTER new elements present in new data.
    gCols.enter().append("g")
        .attr("class", (d:any) => "column " + d.col)
        .attr("stroke-width", 0)
      // .transition(this.transition)
        .attr("transform", (d:any) => "translate(" + scaleXColumn(d.col) + ",0)");
    
    let gIssues = d3.select('#issueView').selectAll("g.column").selectAll("g").data((d:any) => d.issues);
    // EXIT old elements not present in new data.
    gIssues.exit()
      .transition(this.transition)
        .attr("fill", "none")
      .remove();
    // UPDATE old elements present in new data.
    // ENTER new elements present in new data.
    gIssues.enter().append("g")
      .attr("class", (d:any) => d.metric.replace("error:", "") )
      .attr("fill", (d:any) =>  metricColorScale(d.metric.replace("error:", "")))
      .attr("stroke", (d:any) =>  metricColorScale(d.metric.replace("error:", "")));

    let rectIssues = d3.select('#issueView').selectAll("g.column").selectAll("g").selectAll("rect")
      .data((d:any) => d.indices);
    // UPDATE old elements present in new data.
    rectIssues
      .transition(this.transition)
        .attr("width", scaleXColumn.bandwidth())
        .attr("height", (d:any) => scaleYRows(d-1) - scaleYRows(d))
        .attr("y", (d:any) => scaleYRows(d));
        // .attr("transform", (d:any) => "translate(0, "+scaleYRows(d) + ")");
    rectIssues.enter()
      .append("rect")
      .transition(this.transition)
        .attr("height", (d:any) => scaleYRows(d-1) - scaleYRows(d))
        .attr("y", (d:any) => scaleYRows(d))
        .attr("width", scaleXColumn.bandwidth())
    rectIssues.exit()
      .transition(this.transition)
        .attr("y", scaleYRows(maxRowNumber))
      .remove();

    // let colGroups = issueView;
    // colGroups.exit()
    //   .transition(this.transition)
    //     .style("fill-opacity", 1e-6)
    //   .remove();
  }
}
