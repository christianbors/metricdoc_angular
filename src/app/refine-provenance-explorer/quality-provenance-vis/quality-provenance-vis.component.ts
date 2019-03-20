import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild, SimpleChange, SimpleChanges, ViewEncapsulation }  from '@angular/core';

import { OpenRefineService }         from './../../shared/open-refine/open-refine.service';

import * as d3 from 'd3';
import * as d3Transform from 'd3-transform';

import * as iconCodes  from '../icon-codes.json';

@Component({
  selector: 'app-quality-provenance-vis',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './quality-provenance-vis.component.html',
  styleUrls: ['../refine-provenance-explorer.component.scss', './quality-provenance-vis.component.scss']
})
export class QualityProvenanceVisComponent implements OnInit, OnChanges {

  @Input() pageWidth: number;
  @Input() componentHeight: number;
  @Input() openRefineService: OpenRefineService;
  @Input() projectId: number;
  @Input() histId: string;
  @Input() shiftHistId: string;
  @Input() nodeHistory: any[];
  @Input() shiftNodeHistory: any[];
  @Input() scaleHistory: any;
  @Input() nodeWidth: number;
  @Input() sankeyDiag: any;
  @Input() qualityViewWidth: number;
  @Input() detailViewWidth: number;
  @Input() showDetail: number;
  @Input() loadFinished: boolean;

  qualityCompareViewWidth: number = 0;
  elementPadding: number = 35;
  innerPadding: number = .8;
  maxRowNumber: number;
  transition;

  iconWidth:number = 16;

  // @ViewChild('qualityView')
  // svgQualityView:ElementRef;
  detailIssueView:ElementRef;
  issueViewOffset:number;
  @ViewChild('qualityComparison')
  compareView:ElementRef;
  div;

  errorMessage;
  uniqueMetrics: string[] = [];
  metricsColorScale;

  columnModel: any;
  provenanceOverlayModel: any;

  @ViewChild('issueView') set content(content: ElementRef) {
    this.detailIssueView = content;
    if (this.detailIssueView && this.provenanceOverlayModel) {
      // this.issueViewOffset = this.elementPadding + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
      this.scaleComparison();
      this.renderIssueSelectionView();
    }
 }

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
    // if (this.provenanceOverlayModel && (changes.nodeHistory || changes.shiftNodeHistory)) {
    //   if (this.loadFinished) {
    //     // this.scaleByHistory = d3.scaleBand().domain(historyArray).range([20, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]);//.padding(0.05);
        
    //     this.renderIssueSelectionView();
    //     if(this.nodeHistory && this.nodeHistory.length > 0) {
    //       this.scaleComparison()
    //       // this.renderQualityView(this.nodeHistory, this.scaleByHistory, d3.select('svg.barchart'), true);
    //     }
    //   }
    // }
    //changes.nodeHistory.currentValue != null
    if ((changes.nodeHistory || changes.shiftNodeHistory) && this.provenanceOverlayModel && this.nodeWidth && this.sankeyDiag && this.metricsColorScale) {
      if (changes.nodeHistory)
        this.nodeHistory = changes.nodeHistory.currentValue;
      if (changes.shiftNodeHistory)
        this.shiftNodeHistory = changes.shiftNodeHistory.currentValue;

      this.scaleComparison();
    }
    if (changes.histId) {
      this.histId = changes.histId.currentValue;
      if (this.provenanceOverlayModel && this.detailIssueView && this.metricsColorScale)
        this.renderIssueSelectionView();
    }
    if ((changes.detailViewWidth || changes.showDetail || changes.detailIssueView) && this.provenanceOverlayModel) {
      this.scaleComparison();
      this.renderIssueSelectionView();
    }
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
              for (let historyEntry of history.past) {
                this.nodeHistory.push({ id: historyEntry.id, value: this.provenanceOverlayModel.provenance.entity["history_entry:" + historyEntry.id] });
                d3.select("svg.provGraph").select("rect#activity" + historyEntry.id)
                  .classed("selected", true);
                d3.select("svg.provGraph").select("path#activity" + historyEntry.id)
                  .classed("selected", true);
              }

              if(this.nodeHistory && this.nodeHistory.length > 0 && this.nodeWidth && this.sankeyDiag) {
                this.scaleComparison();
                this.renderIssueSelectionView();
              }
            });
        },
        error => this.errorMessage = <any>error
    );
  }

  private renderQualityView(nodeHistory: any[], scale: any, rootElement: any, inverted: boolean) {

    let historyFlow = [];
    let metricColPair = [];

    this.div = d3.select("body").append("div")
      .attr("class", "d3tooltip")
      .style("opacity", 0);

    for (let historyEntry of nodeHistory) {
      let quality = [];
      historyEntry.id = historyEntry.id;
      for (let ent in this.provenanceOverlayModel.provenance.entity) {
        // let histId = entity[0].replace("history_entry:", "");
        if (this.provenanceOverlayModel.provenance.entity[ent]["quality:"+historyEntry.id])
          quality.push({col: ent, metrics: this.provenanceOverlayModel.provenance.entity[ent]["quality:"+historyEntry.id]});
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
        historyFlow.push({historyEntry: historyEntry, metrics: metrics});
    }

    metricColPair.sort((a: any, b:any) => {
      let fullColA = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === a.column.replace("column:",""));
      let fullColB = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === b.column.replace("column:",""));

      fullColA = this.columnModel.columns.find((d:any) => d.name === fullColA.columnName);
      if (!fullColA)
        return -1;
      fullColB = this.columnModel.columns.find((d:any) => d.name === fullColB.columnName);
      if (!fullColB)
        return 1;
      return fullColA.cellIndex - fullColB.cellIndex;
    });
    metricColPair.sort((a: any, b:any) => {
      if (a.metric < b.metric) { return -1; }
      if (a.metric > b.metric) { return 1; }
      return 0;
    });

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
    // max scale needs to be determined // we also leave space for multiple selection guiding icons
    let y = d3.scaleLinear().rangeRound([this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding, 0]).domain([0, maxVal]).nice();

    // let metricColorScale = d3.scaleSequential(d3.interpolateViridis);
    if(this.uniqueMetrics.length == 0) {
      metricColPair.forEach(val => {
        if (!this.uniqueMetrics.includes(val.metric.replace("quality:", "")))
          this.uniqueMetrics.push(val.metric.replace("quality:", "")); 
      })
      this.uniqueMetrics.sort();
      // this.metricsColorScale = d3.interpolatePuOr(this.uniqueMetrics.length);
      this.initializeColorScale();
    }

    rootElement.selectAll("g").remove();

    rootElement.selectAll("g")
      .data(stack).enter()
      .append("g")
        .attr("class", (stack:any) => stack.key.column.replace("column:","") + " " + stack.key.metric.replace("quality:",""))
        // .attr("transform", d3Transform.transform().translate(20,15))
        .attr("fill", (d:any) =>  this.determineColor(d.key.metric.replace("quality:", "")))//d3.schemePastel2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
        .attr("stroke", (d:any) =>  this.determineStrokeColor(d.key.metric.replace("quality:", "")))//d3.schemeDark2[this.uniqueMetrics.indexOf(d.key.metric.replace("quality:", ""))])
        .attr("stroke-width", .85)
        .attr("stroke-opacity", .6)
      .selectAll("rect")
      .data((stack:any) => {
        for (let entry of stack) {
          let metricForColumns = entry.data.metrics.find((obj:any) => { return obj.name === stack.key.metric });
          let metric = metricForColumns.values.find((obj => obj.column === stack.key.column));
          let metricValue;
          if (metric)
            metricValue = metric.value;
          else
            metricValue = 0;
          entry.data = {metric: stack.key.metric, 
            historyEntry: entry.data.historyEntry,
            column: stack.key.column, 
            value: metricValue};
        }
        return stack;
      }).enter()
      .append("rect")
        .each((d: any, i: number, arr: any[]) => {
          d3.select(arr[i]).classed("hist" + d.data.historyEntry.id, true);
        })
        .attr("x", (d:any) => {
          // we don't use the regular bandwidth, so we need to do some calculations
          // if (nodeHistory.indexOf(d.data.historyEntry) == 0)
          //   return scale(d.data.historyEntry.id)
          // else if (nodeHistory.indexOf(d.data.historyEntry) == nodeHistory.length-1)
          //   return scale(d.data.historyEntry.id) + scale.bandwidth() - this.nodeWidth; 
          // else
          //   return scale(d.data.historyEntry.id) + (scale.bandwidth()/2);

          return scale(d.data.historyEntry.depth)
        })
        .attr("y", (d) => { 
          return y(d[1]); 
        })
        .attr("height", (d) => {
          return y(d[0]) - y(d[1]); 
        })
        .attr("width", scale.bandwidth())
        .on("mouseover", (quality:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1);
          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html(quality.data.column + " " + quality.data.metric + " measure: " + quality.data.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
            
          d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1)
            .attr("fill", this.determineStrokeColor(quality.data.metric.replace("quality:", "")));
          let gr = rootElement.select("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 1)
          gr.selectAll("path")
            .classed("metric-link", true)
            .attr("fill", this.determineStrokeColor(quality.data.metric.replace("quality:", "")));
          
          if (parseInt(quality.data.historyEntry.id) === parseInt(this.histId) ||
            parseInt(quality.data.historyEntry.id) === parseInt(this.shiftHistId)) {
            d3.select("#issueView")
              // .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
              // .select("g." + quality.data.metric.replace("quality:",""))
              .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
              .select("g." + quality.data.metric.replace("quality:",""))
                .attr("stroke-width", 2)
                .raise();
                // .attr("fill", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
          }
        })
        .on("mouseout", (quality:any, i:number, el:any) => {
          d3.select(el[i])
            .attr("stroke-width", null)
            .attr("stroke-opacity", null);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
          d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-width", .85)
            .attr("stroke-opacity", .6)
            .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));

          let gr = rootElement.select("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-opacity", 0);
          gr.selectAll("path")
            .classed("metric-link", (quality:any) => quality.from.data.value != quality.to.data.value)
            .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));
          
          if (parseInt(quality.data.historyEntry.id) === parseInt(this.histId) ||
            parseInt(quality.data.historyEntry.id) === parseInt(this.shiftHistId)) {
            d3.select("#issueView")
              .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
              .select("g." + quality.data.metric.replace("quality:",""))
                .attr("stroke-width", "0px");
                // .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
          }
        });

    const link = rootElement.append("g")
        .classed("issueLinks", true)
        .attr("fill", "none")
        .attr("stroke-opacity", 0.25);

    let paths = link.selectAll("g")
      .data(stack)
      .enter().append("g")
        .attr("class", (stack:any) => stack.key.column.replace("column:", "") + " " + stack.key.metric.replace("quality:", ""))
        .attr("fill", (stack:any) =>  this.determineColor(stack.key.metric.replace("quality:", "")))
        .attr("stroke", (stack:any) =>  this.determineStrokeColor(stack.key.metric.replace("quality:", "")))
        .attr("stroke-opacity", 0)
        .attr("stroke-width", 0)
        .attr("fill-opacity", 0.4)
      .selectAll("path")
      .data(d => {
        // build connections
        let links = [];
        for (let i = 1; i < d.length; i++) {
          links.push({from: d[i-1], to: d[i], key: d.key, index: d.index});
        }
        return links;
      })
      .enter().append("path")
        .classed("metric-link", (quality:any) => quality.from.data.value != quality.to.data.value)
        .attr("d", (d:any) => {
          let x0;
          let x1;
          if (!inverted) {
            x0 = scale(d.from.data.historyEntry.depth) + scale.bandwidth(),
            x1 = scale(d.to.data.historyEntry.depth);
          } else {
            x0 = scale(d.from.data.historyEntry.depth);
            x1 = scale(d.to.data.historyEntry.depth) + scale.bandwidth();
          }
          // x0 = scale(d.from.data.historyEntry.depth) + scale.bandwidth(),
          // x1 = scale(d.to.data.historyEntry.depth);

          return this.linkSkewed(d, y, x0, x1);
        })
        .on("mouseover", (quality:any, i:number, el:any) => {
          d3.select(el[i]).classed("metric-link", true)
            .attr("stroke-width", 1);
            // .attr("stroke-opacity", 1);
          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html(quality.key.column + 
            " " + quality.key.metric + 
            " <b>Change</b> from " + quality.from.data.value + 
            " to " + quality.to.data.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (d:any, i:number, el:any) => {
          d3.select(el[i]).classed("metric-link",  (quality:any) => quality.from.data.value != quality.to.data.value)
            .attr("stroke-width", null);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
        });
  }

  private renderIssueViewForHistId(histId: any, selectElement: any, translate: number, rows: number, elementWidth: number):any {
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
    this.initializeColorScale();

    issues.sort((colA: any, colB:any) => {
      let fullColA = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === colA.col.replace("column:",""));
      let fullColB = this.provenanceOverlayModel.columnIds.find((d:any) => d.localPart === colB.col.replace("column:",""));

      fullColA = this.columnModel.columns.find((d:any) => d.name === fullColA.columnName);
      if (!fullColA)
        return -1;
      fullColB = this.columnModel.columns.find((d:any) => d.name === fullColB.columnName);
      if (!fullColB)
        return 1;
      return fullColA.cellIndex - fullColB.cellIndex;
    })

    selectElement.attr("transform", "translate(" + translate + ",15)");
  
    let scaleXColumn = d3.scaleBand()
      .domain(issues.map(issuesEntry => issuesEntry.col))
      .range([translate, translate + elementWidth]); //.padding(0.05)
    // let maxRows:number[] = Object.entries(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]).map((el: any) => {
    //   // let histIds = this.nodeHistory.map(d => d.id);
    //   if (this.nodeHistory && this.nodeHistory.map(d => parseInt(d.id)).includes(parseInt(el[0].replace("other:", ""))) && el[1].type === "project_info:rowSize")
    //     return parseInt(el[1].$);
    // }).filter(el => el);
    // this.maxRowNumber = Math.max.apply(Math, maxRows);
    
    let scaleYRows = d3.scaleLinear()
      .domain([0, rows])
      .range([15, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);

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
          d3.selectAll("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + this.histId)
            .classed("metric-link", true)
            .attr("fill", (data: any) => {
              return this.determineStrokeColor(data.data.metric.replace("quality:", ""));
            });
          d3.selectAll("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + this.shiftHistId)
            .classed("metric-link", true)
            .attr("fill", (data: any) => {
              return this.determineStrokeColor(data.data.metric.replace("quality:", ""));
            });
        })
        .on("mouseout", (data:any, i:number, el:any) => {
          d3.selectAll("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + this.histId)
            .classed("metric-link", false)
            .attr("fill", (data: any) => this.determineColor(data.data.metric.replace("quality:", "")))
          d3.selectAll("g." + data.col.replace("column:", "").replace(/[^a-zA-Z ]/g, "") + " rect.hist" + this.shiftHistId)
            .classed("metric-link", false)
            .attr("fill", (data: any) => this.determineColor(data.data.metric.replace("quality:", "")))
        });
    
    let gIssues = selectElement.selectAll("g.column").selectAll("g").data((d:any) => d.issues);
    // EXIT old elements not present in new data.
    gIssues.exit()
      // .transition(this.transition)
        .attr("fill", "none")
      .remove();
    // UPDATE old elements present in new data.
    // ENTER new elements present in new data.
    gIssues.enter().append("g")
      .attr("class", (d:any) => d.metric.replace("error:", "") )
      .attr("fill", (d:any) =>  this.determineColor(d.metric.replace("error:", "")))
      .attr("stroke", (d:any) =>  this.determineStrokeColor(d.metric.replace("error:", "")));

    let rectIssues = selectElement.selectAll("g.column").selectAll("g").selectAll("rect")
      .data((d:any) => d.indices);
    // UPDATE old elements present in new data.
    rectIssues
      // .transition(this.transition)
        .attr("width", scaleXColumn.bandwidth())
        .attr("height", (d:any) => scaleYRows(d) - scaleYRows(d-1))
        .attr("y", (d:any) => scaleYRows(d));
        // .attr("transform", (d:any) => "translate(0, "+scaleYRows(d) + ")");
    rectIssues.enter()
      .append("rect")
        .on("mouseover", (data:any, i:number, el:any) => {
          let col = d3.select(el[i].parentNode.parentNode).node();
          let gs = d3.select(el[i].parentNode.parentNode).selectAll("g rect")
            .attr("stroke-width", "2px")
            // .attr("fill", (d:any) => {
            //   if(d.metric)
            //     return d3.schemeDark2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))];
            //   return null;
            //   });

          this.div.transition()
            .duration(100)
            .style("opacity", 1);
          if (col.__data__.col) {
            let text = "<span>Column: " + col.__data__.col.replace("column:","") + "</span> <span>Row: " + data + "</span>";
            for (let issue of col.__data__.issues) {
              if (issue.indices.includes(data))
                text += "<br><span>Metric: " + issue.metric.replace("error:", "") + "</span>";
            }
            
            this.div.html(text)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
          }
        })
        .on("mouseout", (data:any, i:number, el:any) => {
          d3.select(el[i].parentNode.parentNode).selectAll("g rect")
            .attr("stroke-width", "0px");
            // .attr("stroke", "none")
            // .attr("fill", (d:any) => {
            //   if(d.metric)
            //     return d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))];
            //   return null;
            //   });
              // d3.schemePastel2[this.uniqueMetrics.indexOf(d.metric.replace("error:", ""))]);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
        })
      // .transition(this.transition)
        .attr("height", (d:any) => scaleYRows(d) - scaleYRows(d-1))
        .attr("y", (d:any) => scaleYRows(d))
        .attr("width", scaleXColumn.bandwidth())
    rectIssues.exit()
      // .transition(this.transition)
        .attr("y", scaleYRows(rows))
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
    // let translX = 25 + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
    let detailViewSvg = d3.select("#qualityComparison svg");
    d3.select('#issueView g.axis').remove();
    let rows:number = this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.histId].$;
    this.renderIssueViewForHistId(this.histId, d3.select("#issueView"), this.issueViewOffset, rows, this.detailViewWidth - 25);
    d3.select("#issueView").attr("transform", "translate(" + this.issueViewOffset + ",0)");
    let scaleYRows = d3.scaleLinear()
      .domain([0, rows])
      .range([15, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);
    let yAxis = d3.axisLeft(scaleYRows);
    d3.select('#issueView g.axis').append("g")
      .classed("y-axis", true)
      .attr("transform", "translate(" + this.issueViewOffset + ",0)")
      .call(yAxis);
  }

  private renderHistoryLinks(element: any, history: any[], scale: any, classed: string, inverted: boolean) {
    // element.append("rect")
    //     .attr('x', (d:any) => scale(history[0].depth))
    //     .attr('y', (d:any) => this.compareView.nativeElement.scrollHeight - 20 - (this.elementPadding - this.iconWidth))
    //     .attr('height', this.elementPadding)
    //     .attr('width', scale(history[history.length-1].depth) - scale(history[0].depth) + scale.bandwidth())
    //     // .attr('fill', color);
    //     .classed(classed, true);

    element.selectAll('rect')
      .data(history).enter()
      .append('rect')
      .attr('x', (d:any) => scale(d.depth))
      .attr('y', (d:any) => this.compareView.nativeElement.scrollHeight - 20 - (this.elementPadding - this.iconWidth))
      .attr('width', scale.bandwidth())
      .attr('height', this.elementPadding)
      .classed(classed, true)
      .classed('jointSelected', (d:any) => {
        return this.shiftNodeHistory.map(node => node.id).includes(d.id) &&
          this.nodeHistory.map(node => node.id).includes(d.id);
      });

    element.selectAll("foreignObject")
      .data(history).enter()
      .append("svg:foreignObject")
        .attr('x', (d:any) => {
          if (d.depth > 0) {
            if (inverted)
              return d3.interpolate(scale(d.depth), scale(d.depth) + scale.step())(.5);
            
            return d3.interpolate(scale(d.depth), scale(d.depth) - scale.step())(.5);
          } 
          if (inverted)
            return scale(0) + this.iconWidth/4 + scale.bandwidth();
        })
        .attr('y', (d:any) => this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding/2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-family', 'Font Awesome 5 Free')
        .attr('fill', 'black')
        .attr('font-weight', 900)
        .attr('overflow', 'visible')
        .attr('height', this.iconWidth)
        .attr('width', this.iconWidth)
        .style('padding-left', '0px')
        .html((data:any) => {
          if (data.value)
            return '<i class="fa fa-1x ' + iconCodes.default[data.value["prov:label"]] + '"></i>';
          return '<i class="fa fa-1x fa-chart-bar"></i>';
        });
  }

  // private renderIssueHistoryView() {
  //   // let histIdList = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes("history_entry:"));
  //   d3.select('#issueHistory').selectAll("g").remove();
  //   let qualityIssueHistoryView = d3.select('#issueHistory').selectAll("g.histEntry").data(this.nodeHistory.map((d:any) => d.id));
  //   qualityIssueHistoryView.enter().append("g")
  //     .each((d:any, i: number, data:any[]) => {
  //       let el = d3.select(data[i]).classed("historyEntry" + d, true);
  //       this.renderIssueViewForHistId(d, el, 0, this.scaleByHistory.bandwidth());
  //     })
  //     .attr("transform", (d:any) => {
  //       let id = d;
  //       if(this.scaleByHistory(id))
  //         return "translate(" + this.scaleByHistory(id) + ",0)";
  //       else
  //         return "translate(-" + this.scaleByHistory.bandwidth() + ",0)";
  //     })
  //     .classed("histEntry", true);
  //   let scaleYRows = d3.scaleLinear()
  //     .domain([0, this.maxRowNumber])
  //     .range([15, this.compareView.nativeElement.scrollHeight - 20]);
  //   let yAxis = d3.axisLeft(scaleYRows);
  //   d3.select('#issueHistory').append("g")
  //     .classed("y-axis", true)
  //     .attr("transform", "translate(" + this.scaleByHistory(this.nodeHistory[0].id) + ",0)")
  //     .call(yAxis);
  // }

  // private scaleHistory(history: any[]): any {
  //   let historyArray = this.nodeHistory.map(hist => hist.id);
  //   return d3.scaleLinear().domain(historyArray).range([35, parseFloat(this.compareView.nativeElement.scrollWidth) - this.nodeWidth - 15]);
  //       // this.scaleByHistory = d3.scaleBand().domain(historyFlow.map(historyEntry => historyEntry.historyEntry.id)).range([35, parseFloat(this.svgQualityView.nativeElement.scrollWidth) - 15]); //.padding(0.05)
  // }

  private scaleComparison() {
    let histories = this.nodeHistory.map(hist => hist.depth);
    let rate = 1;
    d3.select("#comparisonView").selectAll("g").remove();
    this.sankeyDiag().nodes.forEach((node:any) => {
      let hist = this.nodeHistory.find((hist:any) => hist.id === parseInt(node.key.replace("history_entry:", "")));
      if (hist)
        hist.depth = node.depth;
      if(this.shiftNodeHistory && this.shiftNodeHistory.length > 0) {
        hist = this.shiftNodeHistory.find((hist:any) => hist.id === parseInt(node.key.replace("history_entry:", "")));
        if (hist)
          hist.depth = node.depth;
      }
    })
    // let ratioScale = d3.scaleLinear().domain([0, 1]).range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()]);
    if(this.shiftNodeHistory && this.shiftNodeHistory.length > 0) {
      let shiftNodeHistoryReversed = [];
      shiftNodeHistoryReversed = shiftNodeHistoryReversed.concat(this.shiftNodeHistory);
      shiftNodeHistoryReversed.reverse();
      let shiftHistories = shiftNodeHistoryReversed.map(hist => hist.depth);
      
      // this scale determines how much space is available for both quality views
      rate = histories.length/(histories.length + shiftHistories.length);

      // d3.scaleLinear().domain(historyArray).range([35, parseFloat(this.compareView.nativeElement.scrollWidth) - this.nodeWidth - 15]);
      let compareWidth = this.compareView.nativeElement.scrollWidth;
      let detailWidth = 0;
      if (this.showDetail)
        detailWidth =  this.detailViewWidth/2;

      let compareA = d3.select("#comparisonView").append("g").classed("compareA", true);
      let scaleA = d3.scaleBand().domain(histories)
        .range([this.elementPadding, compareWidth/2 - detailWidth])
        .paddingInner(this.innerPadding);
      this.renderQualityView(this.nodeHistory, scaleA, compareA, false);
      
      let inverted = true;
      let compareB = d3.select("#comparisonView").append("g").classed("compareB", true);
      // let compareShiftHistoryScale = d3.scaleBand().domain(shiftHistories)
      // .range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()])
      // .paddingInner(this.innerPadding)
      let scaleB = d3.scaleBand().domain(shiftHistories)
        .range([this.elementPadding + compareWidth/2 + detailWidth, compareWidth - this.elementPadding])
        .paddingInner(this.innerPadding);
      this.renderQualityView(this.shiftNodeHistory, scaleB, compareB, inverted);

      this.issueViewOffset = this.elementPadding + compareWidth/2 - detailWidth;
      this.renderIssueSelectionView();

      this.renderHistoryLinks(d3.select("#comparisonView").append("g").classed("iconsA", true).classed("icons", true), this.nodeHistory, scaleA, 'selected', false);
      this.renderHistoryLinks(d3.select("#comparisonView").append("g").classed("iconsB", true).classed("icons", true), shiftNodeHistoryReversed, scaleB, 'shiftSelected', inverted);

      if (!this.showDetail) {
        let lineGenerator = d3.line();
        let path = lineGenerator([[this.elementPadding/2 + compareWidth/2 + detailWidth, 0], [this.elementPadding/2 + compareWidth/2 + detailWidth, this.compareView.nativeElement.scrollHeight]]);
        // lineGenerator.context(d3.select("#comparisonView"));
        d3.select("#comparisonView").append("path")
          .classed("separator", true)
          .attr("d", path)
          .attr("stroke", "gray")
          .attr("stroke-width", 2);
      } else {
        d3.select("#comparisonView").selectAll("path.separator").remove();
      }
    } else {
      d3.select("#comparisonView").selectAll("path").remove();
      let compareA = d3.select("#comparisonView").append("g").classed("compareA", true);
      // let compareHistoryScale = d3.scaleBand().domain(histories)
      //   .range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()])
      //   .paddingInner(this.innerPadding);
      this.renderQualityView(this.nodeHistory, this.scaleHistory, compareA, false);
      this.issueViewOffset = this.elementPadding + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
      this.renderIssueSelectionView();
    }
  }

  private linkIssues(historyNodes: any[]): any[] {
    if (historyNodes.length > 1) {
      for(let i = 1; i < historyNodes.length; ++i) {
        let hist0 = historyNodes[i-1];
        let hist1 = historyNodes[i];

      }
    } else {
      return [];
    }
  }

  private linkSkewed(d: any, yFunction: any, x0: any, x1:any): any {
      var curvature = .6;

      let xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = yFunction(d.from[0]),
          y1 = yFunction(d.to[0]);
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + x1 + "," + (y1+ yFunction(d.to[1]) - yFunction(d.to[0]))
           + "C" + x3 + "," + (y1+ yFunction(d.to[1]) - yFunction(d.to[0]))
           + " " + x2 + "," + (y0+ yFunction(d.from[1]) - yFunction(d.from[0]))
           + " " + x0 + "," + (y0+ yFunction(d.from[1]) - yFunction(d.from[0]))
           + "L" + x0 + "," + y0;
    // }
    // return null;
  }

  private initializeColorScale() {
    this.metricsColorScale = d3.scaleSequential(d3.interpolateViridis).domain([-1, this.uniqueMetrics.length+1]);
  }

  private determineColor(metric: any): any {
    return d3.color(this.metricsColorScale(this.uniqueMetrics.indexOf(metric))); //d.key.metric.replace("quality:", "")
  }

  private determineStrokeColor(metric: any): any {
    return d3.color(this.metricsColorScale(this.uniqueMetrics.indexOf(metric))).brighter(.75); //d.key.metric.replace("quality:", "")
  }
}
