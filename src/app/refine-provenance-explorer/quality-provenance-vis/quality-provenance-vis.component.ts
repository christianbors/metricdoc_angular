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
  @Input() nodeHistory: any[];
  @Input() loadFinished: boolean;

  currentHistId: any;
  qualityViewWidth: number = 80;
  maxRowNumber: number;
  transition;
  scaleByHistory;

  @ViewChild('qualityView')
  svgQualityView:ElementRef;
  @ViewChild('issueView')
  svgErrorView:ElementRef;
  div;

  errorMessage;
  uniqueMetrics: string[] = [];

  columnModel: any;
  provenanceOverlayModel: any;

  constructor() { 
  }

  ngOnInit() {
    this.getRefineProject();
    this.transition = d3.transition()
      .duration(500)
      .ease(d3.easeLinear);
  }

  ngOnChanges(changes: SimpleChanges) {
    // && changes.histId && 
    if (this.provenanceOverlayModel && changes.nodeHistory) {
      if (this.loadFinished) {
        // this.scaleByHistory = d3.scaleBand().domain(historyArray).range([20, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]);//.padding(0.05);
        this.scaleHistory();
        
        this.renderIssueSelectionView();
        if(this.nodeHistory && this.nodeHistory.length > 0) {
          this.renderIssueHistoryView();
          this.renderQualityView(true);
        }
      }
    }
    if (changes.nodeHistory && changes.nodeHistory.currentValue != null && this.provenanceOverlayModel) {
      this.nodeHistory = changes.nodeHistory.currentValue;
      this.scaleHistory();
    }
    if (changes.histId)
      this.histId = changes.histId.currentValue;
  }

  private getRefineProject() {
    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.columnModel = openRefineProject.columnModel;
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];
          this.openRefineService.getHistory(this.projectId)
            .subscribe((history: any) => {
              this.nodeHistory = [];
              this.nodeHistory.push({ id: 0, value: this.provenanceOverlayModel.provenance.entity["history_entry:0"] });
              for (let pastEntry of history.past) {
                this.nodeHistory.push({ id: pastEntry.id, value: this.provenanceOverlayModel.provenance.entity["history_entry:" + pastEntry.id] });
                d3.select("svg.provGraph").select("rect#activity" + pastEntry.id)
                  .classed("selected", true);
                d3.select("svg.provGraph").select("path#activity" + pastEntry.id)
                  .classed("selected", true);
              }
              this.loadFinished = true;
              this.scaleHistory();
              this.renderIssueSelectionView();
              // this.renderIssueViewForHistId(this.histId, d3.select("#issueView"), parseFloat(this.svgErrorView.nativeElement.scrollWidth) - 15);
              if(this.nodeHistory && this.nodeHistory.length > 0) {
                this.renderIssueHistoryView();
                this.renderQualityView(true);
              }
            });
        },
        error => this.errorMessage = <any>error
    );
  }

  private renderQualityView(qualitMode: boolean) {

    let historyFlow = [];
    let metricColPair = [];

    this.div = d3.select("body").append("div")
      .attr("class", "d3tooltip")
      .style("opacity", 0);

    for (let pastEntry of this.nodeHistory) {
      let quality = [];
      pastEntry.id = pastEntry.id;
      for (let ent in this.provenanceOverlayModel.provenance.entity) {
        // let histId = entity[0].replace("history_entry:", "");
        if (this.provenanceOverlayModel.provenance.entity[ent]["quality:"+pastEntry.id])
          quality.push({col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:"+pastEntry.id]});
      };
      let metrics = [];
      for (let pair of Object.values(quality)) {
        for (let m of pair.metrics) {
          if (!metricColPair.some(obj => obj.metric === m.type && obj.column === pair.col ))
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
      if (a.metric < b.metric) { return -1; }
      if (a.metric > b.metric) { return 1; }
      return 0;
    })
    let stack = d3.stack()
      .keys(metricColPair)
      .value((d: any, key: any, j, data) => {
        let metricStack = d.metrics.find((d:any) => { return d.name === key.metric });
        let metric = metricStack.values.find((obj => obj.column === key.column));
        if (metric)
          return parseFloat(metric.value);
        else return 0;
      })(historyFlow);

    let arr = Array.prototype.concat.apply([], stack[stack.length-1]);
    let maxVal = Math.max.apply(Math, arr);
    // max scale needs to be determined
    let y = d3.scaleLinear().rangeRound([this.svgQualityView.nativeElement.scrollHeight - 20, 0]).domain([0, maxVal]).nice();

    // let metricColorScale = d3.scaleSequential(d3.interpolateViridis);
    if(this.uniqueMetrics.length == 0) {
      metricColPair.forEach(val => {
        if (!this.uniqueMetrics.includes(val.metric.replace("quality:", "")))
          this.uniqueMetrics.push(val.metric.replace("quality:", "")); 
      })
      this.uniqueMetrics.sort();

      this.scaleHistory();
    }

    d3.select('svg.barchart').selectAll("g").remove();

    d3.select('svg.barchart').selectAll("g")
      .data(stack).enter()
      .append("g")
        .attr("class", (stack:any) => stack.key.column + " " + stack.key.metric)
        // .attr("transform", d3Transform.transform().translate(20,15))
        .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
        .attr("stroke", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
        .attr("stroke-width", .5)
        .attr("stroke-opacity", .6)
        .on("mouseover", (data:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1);
          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html(data.key.column + " " + data.key.metric)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (d:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", .5)
            .attr("stroke-opacity", .6);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
        })
      .selectAll("rect")
      .data(stack => stack).enter()
      .append("rect")
        .attr("x", (d:any) => {
          return this.scaleByHistory(d.data.pastEntry.id); 
        })
        .attr("y", (d) => { 
          return y(d[1]); 
        })
        .attr("height", (d) => {
          return y(d[0]) - y(d[1]); 
        })
        .attr("width", this.scaleByHistory.bandwidth());
  }

  private renderIssueViewForHistId(histId: any, selectElement: any, translate: number, elementWidth: number):any {
    let issues = [];
    for (let ent in this.provenanceOverlayModel.provenance.entity) {
      // let histId = entity[0].replace("history_entry:", "");
      let errorIndices = [];
      if (this.provenanceOverlayModel.provenance.entity[ent]["error:"+histId]) {
        for (let errorArray of this.provenanceOverlayModel.provenance.entity[ent]["error:"+histId]) {
          errorIndices.push({metric: errorArray.type, indices: JSON.parse(errorArray.$)});
          if (!this.uniqueMetrics.includes(errorArray.type.replace("error:",""))) {
            this.uniqueMetrics.push(errorArray.type.replace("error:",""));
          }
        }
        issues.push({col: ent, issues: errorIndices});
      }
    };
    this.uniqueMetrics.sort();
    issues.sort((colA: any, colB:any) => {
      let fullColA = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === colA.col.replace("column:",""));
      let fullColB = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === colB.col.replace("column:",""));

      fullColA = this.columnModel.columns.find((d:any) => d.name === fullColA.columnName);
      fullColB = this.columnModel.columns.find((d:any) => d.name === fullColB.columnName);
      return fullColA.cellIndex - fullColB.cellIndex;
    })

    selectElement.attr("transform", "translate(" + translate + ",15)");
  
    let scaleXColumn = d3.scaleBand()
      .domain(issues.map(issuesEntry => issuesEntry.col))
      .range([translate, elementWidth]); //.padding(0.05)
    let maxRows:number[] = Object.entries(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]).map((el: any) => {
      // let histIds = this.nodeHistory.map(d => d.id);
      if (this.nodeHistory && this.nodeHistory.map(d => parseInt(d.id)).includes(parseInt(el[0].replace("other:", ""))) && el[1].type === "project_info:rowSize")
        return parseInt(el[1].$);
    }).filter(el => el);
    this.maxRowNumber = Math.max.apply(Math, maxRows);
    
    let scaleYRows = d3.scaleLinear()
      .domain([0, this.maxRowNumber])
      .range([15, this.svgQualityView.nativeElement.scrollHeight - 20]);

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
    let gCols = selectElement.selectAll("g.column")
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
        .attr("class", (d:any) => "column " + d.col.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
        .attr("stroke-width", 0)
      // .transition(this.transition)
        .attr("transform", (d:any) => "translate(" + scaleXColumn(d.col) + ",0)")
        .on("mouseover", (data:any, i:number, el:any) => {
          d3.selectAll("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " g")
            .attr("fill", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))])
            // .attr("stroke-opacity", 1);
        })
        .on("mouseout", (data:any, i:number, el:any) => {
          d3.selectAll("g."+data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " g")
            .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))])
            // .attr("stroke-opacity", .6);
        });
    
    let gIssues = selectElement.selectAll("g.column").selectAll("g").data((d:any) => d.issues);
    // EXIT old elements not present in new data.
    gIssues.exit()
      .transition(this.transition)
        .attr("fill", "none")
      .remove();
    // UPDATE old elements present in new data.
    // ENTER new elements present in new data.
    gIssues.enter().append("g")
      .attr("class", (d:any) => d.metric.replace("error:", "") )
      .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))])
      .attr("stroke", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))]);

    let rectIssues = selectElement.selectAll("g.column").selectAll("g").selectAll("rect")
      .data((d:any) => d.indices);
    // UPDATE old elements present in new data.
    rectIssues
      .transition(this.transition)
        .attr("width", scaleXColumn.bandwidth())
        .attr("height", (d:any) => scaleYRows(d) - scaleYRows(d-1))
        .attr("y", (d:any) => scaleYRows(d));
        // .attr("transform", (d:any) => "translate(0, "+scaleYRows(d) + ")");
    rectIssues.enter()
      .append("rect")
        .on("mouseover", (data:any, i:number, el:any) => {
          let col = d3.select(el[i].parentNode.parentNode).node();
          d3.select(el[i].parentNode.parentNode).selectAll("g")
            .attr("fill", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))]);

          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html("<span>Column: " + col.__data__.col.replace("column:","") + "</span> <span>Row: " + data + "</span>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (data:any, i:number, el:any) => {
          d3.select(el[i].parentNode.parentNode).selectAll("g")
            .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))]);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
        })
      .transition(this.transition)
        .attr("height", (d:any) => scaleYRows(d) - scaleYRows(d-1))
        .attr("y", (d:any) => scaleYRows(d))
        .attr("width", scaleXColumn.bandwidth())
    rectIssues.exit()
      .transition(this.transition)
        .attr("y", scaleYRows(this.maxRowNumber))
      .remove();

    let xAxis = d3.axisBottom(scaleXColumn);
    let axisGroup = selectElement.append("g")
      .classed("axis", true);
    axisGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", "translate(0, 15)")
      .call((g:any) => {
        g.call(xAxis);
        // g.select(".domain").remove();
        g.selectAll(".tick line").attr("transform", "translate(-" + (scaleXColumn.bandwidth()/2) + ",0)");
        g.selectAll(".tick text").remove();
      });
    // let colGroups = issueView;
    // colGroups.exit()
    //   .transition(this.transition)
    //     .style("fill-opacity", 1e-6)
    //   .remove();
  }

  private renderIssueSelectionView() {
    let translX = 25;
    d3.select('#issueView g.axis').remove();
    this.renderIssueViewForHistId(this.histId, d3.select("#issueView"), translX, parseFloat(this.svgErrorView.nativeElement.scrollWidth) - 15);
    d3.select("#issueView").attr("transform", "translate(" + translX + ",0)");
    let scaleYRows = d3.scaleLinear()
      .domain([0, this.maxRowNumber])
      .range([15, this.svgQualityView.nativeElement.scrollHeight - 20]);
    let yAxis = d3.axisLeft(scaleYRows);
    d3.select('#issueView g.axis').append("g")
      .classed("y-axis", true)
      .attr("transform", "translate(" + translX + ",0)")
      .call(yAxis);
  }

  private renderIssueHistoryView() {
    // let histIdList = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes("history_entry:"));
    d3.select('#issueHistory').selectAll("g").remove();
    let qualityIssueHistoryView = d3.select('#issueHistory').selectAll("g.histEntry").data(this.nodeHistory.map((d:any) => d.id));
    qualityIssueHistoryView.enter().append("g")
      .each((d:any, i: number, data:any[]) => {
        let el = d3.select(data[i]).classed(d, true);
        this.renderIssueViewForHistId(d, el, 0, this.scaleByHistory.bandwidth());
      })
      .attr("transform", (d:any) => {
        let id = d;
        if(this.scaleByHistory(id))
          return "translate(" + this.scaleByHistory(id) + ",0)";
        else
          return "translate(-" + this.scaleByHistory.bandwidth() + ",0)";
      })
      .classed("histEntry", true);
    let scaleYRows = d3.scaleLinear()
      .domain([0, this.maxRowNumber])
      .range([15, this.svgQualityView.nativeElement.scrollHeight - 20]);
    let yAxis = d3.axisLeft(scaleYRows);
    d3.select('#issueHistory').append("g")
      .classed("y-axis", true)
      .attr("transform", "translate(" + this.scaleByHistory(this.nodeHistory[0].id) + ",0)")
      .call(yAxis);
  }

  private scaleHistory() {
    let historyArray = this.nodeHistory.map(hist => hist.id);
    this.scaleByHistory = d3.scaleBand().domain(historyArray).range([35, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]).padding(0.05);
        // this.scaleByHistory = d3.scaleBand().domain(historyFlow.map(historyEntry => historyEntry.pastEntry.id)).range([35, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]); //.padding(0.05)
  }
}
