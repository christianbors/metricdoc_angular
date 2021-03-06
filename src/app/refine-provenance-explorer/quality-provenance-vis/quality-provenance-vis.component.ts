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

  issueViewHistId: any;

  // @ViewChild('qualityView')
  // svgQualityView:ElementRef;
  detailIssueView:ElementRef;
  issueViewOffset:number;
  @ViewChild('qualityComparison', {static: false})
  compareView:ElementRef;
  div;

  errorMessage;
  uniqueMetrics: string[] = [];
  metricsColorScale;
  greyMetricsColorScale;

  columnModel: any;
  provenanceOverlayModel: any;

  @ViewChild('issueView', {static: false}) set content(content: ElementRef) {
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
    let shiftHistoryFlow = [];
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

    if (this.shiftNodeHistory && this.shiftNodeHistory.length > 0) {
      for (let historyEntry of this.shiftNodeHistory) {
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
          shiftHistoryFlow.push({historyEntry: historyEntry, metrics: metrics});
      }
      for (let historyEntry of this.nodeHistory) {
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
          shiftHistoryFlow.push({historyEntry: historyEntry, metrics: metrics});
      }
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
    
    let arr: any[] = Array.prototype.concat.apply([], stack[stack.length-1]);
    
    // get heights of shift stack
    if (shiftHistoryFlow.length > 0) {
      let shiftStack = d3.stack()
        .keys(metricColPair)
        .value((d: any, key: any, j, data) => {
          let metricStack = d.metrics.find((d:any) => { return d.name === key.metric });
          let metric = metricStack.values.find((obj => obj.column === key.column));
          if (metric)
            return parseFloat(metric.value);
          else return 0;
        })(shiftHistoryFlow);
      arr = arr.concat(Array.prototype.concat.apply([], shiftStack[shiftStack.length-1]));
    }

    let maxVal = Math.max.apply(Math, arr);
    // max scale needs to be determined // we also leave space for multiple selection guiding icons
    let y = d3.scaleLinear().rangeRound([this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding, this.elementPadding]).domain([0, maxVal]).nice();

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
          if (quality.data.historyEntry.id != this.issueViewHistId) {
            let rows:number = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + quality.data.historyEntry.id].$);
            let shiftRows:number = 0;
            if (this.shiftHistId)
              shiftRows = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.shiftHistId].$);

            // this.renderIssueViewForHistId(quality.data.historyEntry.id, d3.select("#issueView"), this.issueViewOffset, rows > shiftRows ? rows : shiftRows, this.detailViewWidth - 25);
          }
          
          d3.select(el[i])
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1);
          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html(quality.data.column + " " + quality.data.metric + "<br>measure: " + quality.data.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
            
          d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1)
            .attr("fill", this.determineStrokeColor(quality.data.metric.replace("quality:", "")));
          let gr = d3.select("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", "") + " rect")
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
              .selectAll("rect")
                .attr("stroke-width", "2px")
                .raise();
                // .attr("fill", (d:any) =>  d3.schemeDark2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
          }
        })
        .on("mousemove", (data:any) => {
          this.div
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (quality:any, i:number, el:any) => {
          d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
            .attr("stroke-width", null)
            .attr("stroke-opacity", null)
            .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));
          // d3.select(el[i])
          //   .attr("stroke-width", null)
          //   .attr("stroke-opacity", null);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
          // d3.select("#comparisonView").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", ""))
          //   .attr("stroke-width", .85)
          //   .attr("stroke-opacity", .6)
          //   .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));

          // let gr = d3.select("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.data.column.replace("column:", "") + "." + quality.data.metric.replace("quality:", "") + " rect")
          //   .attr("stroke-opacity", 0);
          // gr.selectAll("path")
          //   .classed("metric-link", (quality:any) => quality.from.data.value != quality.to.data.value)
          //   .attr("fill", this.determineColor(quality.data.metric.replace("quality:", "")));
          
          if (parseInt(quality.data.historyEntry.id) === parseInt(this.histId) ||
            parseInt(quality.data.historyEntry.id) === parseInt(this.shiftHistId)) {
            d3.select("#issueView")
              .select("g." + quality.data.column.replace("column:", "").replace(/[^a-zA-Z ]/g, ""))
              .select("g." + quality.data.metric.replace("quality:",""))
              .selectAll("rect")
                .attr("stroke-width", "0px");
                // .attr("fill", (d:any) =>  d3.schemePastel2[this.uniqueMetrics.indexOf(quality.data.metric.replace("quality:", ""))])
          }
        });

    let qualityYAxis = d3.axisLeft(y);
    rootElement.append("g")
      .classed("y-axis", true)
      .attr("transform", "translate(" + this.elementPadding + ",0)")
      .call((g:any) => {
        g.call(qualityYAxis);
      });
    rootElement.append("text")
      .attr("text-anchor", "left")
      .attr("transform", "translate(0,15)")
      .text("Quality Issues Rate");
    // //** this is the right hand side axis for the quality flow
    // let qualityYAxisRight = d3.axisRight(y);
    // rootElement.append("g")
    //   .classed("y-axis", true)
    //   .attr("transform", "translate(" + (scale.range()[1]) + ",0)")
    //   .call((g:any) => {
    //     g.call(qualityYAxisRight);
    //   });

      // g.selectAll(".tick line").attr("transform", "translate(-" + (scaleXColumn.bandwidth()/2) + ",0)");
      //   g.selectAll(".tick text")
      //     .text((d:any) => {
      //       return d.replace("column:","");
      //     })
      //     .attr("text-anchor", "start")
      //     .attr("transform", "translate(-"+ scaleXColumn.bandwidth()/2 +",0)rotate(-90)");


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
        .attr("stroke-opacity", .4)
        .attr("stroke-width", .85)
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
          d3.select("#comparisonView").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", ""))
            .attr("stroke-width", 1.5)
            .attr("stroke-opacity", 1)
            .attr("fill", this.determineStrokeColor(quality.key.metric.replace("quality:", "")));
          let gr = d3.select("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", "") + " rect")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 1)
          gr.selectAll("path")
            .classed("metric-link", true)
            .attr("fill", this.determineStrokeColor(quality.key.metric.replace("quality:", "")));
          // d3.select(el[i]).classed("metric-link", true)
          //   .attr("stroke-width", 1);
            // .attr("stroke-opacity", 1);
          this.div.transition()
            .duration(100)
            .style("opacity", .9);
          this.div.html(quality.key.column + 
            " " + quality.key.metric + 
            " <br><b>Change</b> from " + quality.from.data.value + 
            " to " + quality.to.data.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mousemove", (data:any) => {
          this.div.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", (quality:any, i:number, el:any) => {
          d3.select("#comparisonView").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", ""))
            .attr("stroke-width", .85)
            .attr("stroke-opacity", .6)
            .attr("fill", this.determineColor(quality.key.metric.replace("quality:", "")));
          let gr = d3.select("#comparisonView").selectAll("g.issueLinks").selectAll("g." + quality.key.column.replace("column:", "") + "." + quality.key.metric.replace("quality:", "") + " rect")
            .attr("stroke-opacity", 0);
          gr.selectAll("path")
            .classed("metric-link", (quality:any) => quality.from.data.value != quality.to.data.value)
            .attr("fill", this.determineColor(quality.key.metric.replace("quality:", "")));

          // d3.select(el[i]).classed("metric-link",  (quality:any) => quality.from.data.value != quality.to.data.value)
          //   .attr("stroke-width", null);
          this.div.transition()
            .duration(100)
            .style("opacity", 0);
        });
  }

  private renderIssueViewForHistId(histId: any, selectElement: any, translate: number, rows: number, elementWidth: number):any {
    let issues = [];
    let issuesB = [];
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
      let errorIndicesB = [];
      if (this.shiftHistId && this.provenanceOverlayModel.provenance.entity[ent]["error:"+this.shiftHistId]) {
        for (let errorArray of this.provenanceOverlayModel.provenance.entity[ent]["error:"+this.shiftHistId]) {
          errorIndicesB.push({metric: errorArray.type, indices: JSON.parse(errorArray.$)});
          if (!this.uniqueMetrics.includes(errorArray.type.replace("error:",""))) {
            this.uniqueMetrics.push(errorArray.type.replace("error:",""));
          }
        }
        issuesB.push({col: ent, issues: errorIndicesB});
      }
    };

    if (issuesB.length > 0) {
      let issuesLarger,
          issuesSmaller;
      if (issues.length > issuesB.length) {
        issuesLarger = [].concat(issues);
        issuesSmaller = [].concat(issuesB);
      }
      else {
        issuesLarger = [].concat(issuesB);
        issuesSmaller = [].concat(issues);
      }

      for (let arrIdx = 0; arrIdx < issuesLarger.length; arrIdx++) {
        let issueSmArr = issuesSmaller.find((d:any) => issuesLarger[arrIdx].col === d.col);
        if (issueSmArr) {
          for (let m = 0; m < issuesLarger[arrIdx].issues.length; ++m) {
            let smMetric = issueSmArr.issues.find((mVal:any) => issuesLarger[arrIdx].issues[m].metric === mVal.metric);
            if (smMetric) {
              for (let i = 0; i < issuesLarger[arrIdx].issues[m].indices.length;) {
                let smMetricIndex = smMetric.indices.indexOf(issuesLarger[arrIdx].issues[m].indices[i]);
                if (smMetricIndex >= 0) {
                  issuesLarger[arrIdx].issues[m].indices.splice(i, 1);
                  smMetric.indices.splice(smMetricIndex, 1);
                }
                else
                  ++i;
              }
              for (let i = 0; i < smMetric.indices.length; i++) {
                if (!issuesLarger[arrIdx].issues[m].indices.includes(smMetric.indices[i])) {
                  issuesLarger[arrIdx].issues[m].indices.push(smMetric.indices[i]);
                }
              }
              issuesLarger[arrIdx].issues[m].indices.sort(this.numericSort);
            }
          }
        }
      }
      issues = issuesLarger;
    }

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

    let scaleXColumn = d3.scaleBand()
      .domain(issues.map(issuesEntry => issuesEntry.col))
      .range([translate, translate + elementWidth - 35]);

    let xAxis = d3.axisBottom(scaleXColumn);
    d3.selectAll("#issueView g.axis g").remove();
    
    selectElement.select("g.axis").append("g")
      .classed("x-axis", true)
      // .attr("transform", "translate(0, 35)")
      .call((g:any) => {
        g.call(xAxis);
        // g.select(".domain").remove();
        g.selectAll(".tick line").attr("transform", "translate(-" + (scaleXColumn.bandwidth()/2) + ",0)");
        g.selectAll(".tick text")
          .text((d:any) => {
            return d.replace("column:","");
          })
          .attr("text-anchor", "start")
          .attr("transform", "translate(-"+ scaleXColumn.bandwidth()/2 +",0)rotate(-90)");
      });
    let axisOffset;
    selectElement.select("g.axis g.x-axis")
      .attr("transform", (g:any) => {
        let nodeEl: any = selectElement.select("g.axis g.x-axis").node();
        axisOffset = nodeEl.getBBox().height;
        return "translate(0, " + nodeEl.getBBox().height + ")";
      })

    let scaleYRows = d3.scaleLinear()
      .domain([0, rows])
      .range([axisOffset, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);

    let yAxis = d3.axisLeft(scaleYRows);
    d3.select("#issueView g.axis").append("g")
      .classed("y-axis", true)
      .attr("transform", "translate(" + this.issueViewOffset + ",0)")
      .call(yAxis);
    let xAxisNode:any = d3.select("#issueView g.axis g.x-axis").node();
    let yAxisNode:any = d3.select("#issueView g.axis g.y-axis").node();
    if (xAxisNode && yAxisNode) {
      d3.select('#issueView g.axis').append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        // this.compareView.nativeElement.scrollHeight
        .attr("transform", "translate("+ (this.issueViewOffset - yAxisNode.getBBox().width) + "," + (axisOffset - 5) +")")  // (yAxisNode.getBBox().height/2 + axisOffset)
        .text("Rows");
      d3.select('#issueView g.axis').append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (this.issueViewOffset + xAxisNode.getBBox().width/2 - this.elementPadding) + "," + 20 + ")")
      .text("Columns");
    }
  
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
            let text = "<b>Detected Issue </b><br><span>Column: " + col.__data__.col.replace("column:","") + "</span> <span>Row: " + data + "</span>";
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

    // let colGroups = issueView;
    // colGroups.exit()
    //   .transition(this.transition)
    //     .style("fill-opacity", 1e-6)
    //   .remove();
    this.issueViewHistId = histId;
  }


  private renderIssueSelectionView() {
    // let translX = 25 + this.compareView.nativeElement.scrollWidth - this.detailViewWidth;
    let detailViewSvg = d3.select("#qualityComparison svg");
    d3.select("#issueView g.axis").remove();
    d3.select("#issueView").append("g").classed("axis", true);
    let rows:number = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.histId].$);
    let shiftRows:number = 0;
    if (this.shiftHistId)
      shiftRows = parseInt(this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + this.shiftHistId].$);

    this.renderIssueViewForHistId(this.histId, d3.select("#issueView"), this.issueViewOffset, rows > shiftRows ? rows : shiftRows, this.detailViewWidth - 25);
    // d3.select("#issueView").attr("transform", "translate(" + this.issueViewOffset + ",35)");
    // let scaleYRows = d3.scaleLinear()
    //   .domain([0, rows > shiftRows ? rows : shiftRows])
    //   .range([35, this.compareView.nativeElement.scrollHeight - 20 - this.elementPadding]);
    

    // d3.select('#issueView g.axis text')  // select all the text elements for the xaxis
    //       .attr('transform', function(d) {
    //          return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
    //      });
  }

  private renderHistoryLinks(element: any, history: any[], scale: any, classed: string, inverted: boolean) {

    element.selectAll('rect')
      .data(history).enter()
      .append('rect')
      .attr('x', (d:any) => scale(d.depth))
      .attr('y', (d:any) => this.compareView.nativeElement.scrollHeight - 20 - (this.elementPadding - this.iconWidth))
      .attr('width', scale.bandwidth())
      .attr('height', this.elementPadding)
      .classed(classed, true)
      .classed('jointSelected', (d:any) => {
        if(this.shiftNodeHistory && this.shiftNodeHistory.length > 0)
          return this.shiftNodeHistory.map(node => node.id).includes(d.id) &&
            this.nodeHistory.map(node => node.id).includes(d.id);
        else
          return this.nodeHistory.map(node => node.id).includes(d.id);
      });

      //TODO: links with mouseover
    // this.sankeyDiag().links.forEach((link: any) => {

    // })
    if (scale.step() > this.iconWidth) {
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
  }

  private linkShiftViews() {
    let linkGroup = d3.select("#comparisonView")
      .append("g").classed("selectionLinks", true);
    d3.selectAll("#comparisonView")
        .selectAll("g.compareA rect.hist" + this.histId)
      .each((d:any, i:number, arr:any[]) => {
        // d3.select(arr[i]).classed();
        let rect0 = d3.select(arr[i]);
        let rect1 = d3.select("#comparisonView g.compareB g." + 
          d.data.metric.replace("quality:", "") + "." + 
          d.data.column.replace("column:", "") + 
          " rect.hist" + this.shiftHistId);
        let x0 = parseInt(rect0.attr("x")) + parseInt(rect0.attr("width"));
        let x1 = parseInt(rect1.attr("x"));
        let y0 = parseInt(rect0.attr("y"));
        let y1 = parseInt(rect1.attr("y"));
        let h0 = parseInt(rect0.attr("height"));
        let h1 = parseInt(rect1.attr("height"));
        linkGroup.append("g")
          .classed(d.data.metric.replace("quality:", ""), true)
          .classed(d.data.column.replace("column:", ""), true)
          .attr("fill", this.determineColor(d.data.metric.replace("quality:", "")))
          .attr("stroke", this.determineStrokeColor(d.data.metric.replace("quality:", "")))
          .attr("fill-opacity", .4)
          .classed("metric-link", true)
        .append("path")
          .attr("d", this.linkRect(x0, x1, y0, y1, h0, h1))
          .attr("stroke-width", "2px");
      })
    d3.selectAll("#comparisonView")
      .selectAll("g.compareA rect.hist" + this.histId)
      .on("mouseover", (d:any) => {

      });
  }

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
        this.linkShiftViews();
        let lineGenerator = d3.line();
        let path = lineGenerator([[this.elementPadding/2 + compareWidth/2 + detailWidth, 0], [this.elementPadding/2 + compareWidth/2 + detailWidth, this.compareView.nativeElement.scrollHeight]]);
        // lineGenerator.context(d3.select("#comparisonView"));
        d3.select("#comparisonView").append("path")
          .classed("separator", true)
          .attr("d", path)
          .attr("stroke", "gray")
          .attr("stroke-width", "2px");
      } else {
        d3.select("#comparisonView g.selectionLinks").remove();
        d3.select("#comparisonView").selectAll("path.separator").remove();
      }

    } else {
      d3.select("#comparisonView").selectAll("path").remove();
      let compareA = d3.select("#comparisonView").append("g").classed("compareA", true);
      // let compareHistoryScale = d3.scaleBand().domain(histories)
      //   .range([this.elementPadding, this.scaleHistory(this.nodeHistory[this.nodeHistory.length-1].depth) + this.scaleHistory.bandwidth()])
      //   .paddingInner(this.innerPadding);
      this.renderQualityView(this.nodeHistory, this.scaleHistory, compareA, false);
      this.renderHistoryLinks(d3.select("#comparisonView").append("g").classed("icons", true), this.nodeHistory, this.scaleHistory, 'selected', false);
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

  private linkRect(x0: any, x1:any, y0: any, y1: any, height0: any, height1: any): any {
      var curvature = .6;

      let xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature);
          // y0 = yFunction(d.from[0]),
          // y1 = yFunction(d.to[0]);
      return "M" + x0 + "," + y0
           // + "C" + x2 + "," + y0
           // + " " + x3 + "," + y1
           + " " + x1 + "," + y1
           + "L" + x1 + "," + (y1+ height1)
           // + "C" + x3 + "," + (y1+ height1)
           // + " " + x2 + "," + (y0+ height0)
           + " " + x0 + "," + (y0+ height0)
           + "L" + x0 + "," + y0;
    // }
    // return null;
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
    this.greyMetricsColorScale = d3.scaleSequential(d3.interpolateGreys).domain([-1, this.uniqueMetrics.length+1]);
  }

  private determineColor(metric: any): any {
    return d3.color(this.metricsColorScale(this.uniqueMetrics.indexOf(metric))); //d.key.metric.replace("quality:", "")
  }

  private determineGreyColor(metric: any): any {
    return d3.color(this.greyMetricsColorScale(this.uniqueMetrics.indexOf(metric))); //d.key.metric.replace("quality:", "")
  }

  private determineStrokeColor(metric: any): any {
    return d3.color(this.metricsColorScale(this.uniqueMetrics.indexOf(metric))).brighter(.75); //d.key.metric.replace("quality:", "")
  }

  private numericSort(a: number, b: number): number {
      if (a > b)
        return 1;
      if (a < b)
        return -1;
      return 0;
  }
}
