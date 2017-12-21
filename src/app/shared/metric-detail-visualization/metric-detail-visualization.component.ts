import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EvalTuple } from '../open-refine/model/eval-tuple';

import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';

@Component({
  selector: 'metric-detail-view',
  templateUrl: './metric-detail-visualization.component.html',
  styleUrls: ['./metric-detail-visualization.component.scss']
})
export class MetricDetailVisualizationComponent implements OnInit, OnChanges {

  @Input() viewOffsetTop;
  @Input() metricsOverlayModel;
  @Input() rowModel;
  @Input() metricSelection;
  @Input() selectedColumns;
  @Input() columnMetricColors;
  @Input() spanMetricColors;
  @Input() rowsFrom;
  @Input() rowsTo;

  @ViewChild('visParent') svg;

  @Output() onDataRowsSelected = new EventEmitter();

  private detailViewHeight: number;
  private detailViewWidth: number;
  private visOffset: number = 50;
  private axisOffset: number = 90;
  private columnOffset: number = 40;
  private axisWidths: number[];
  private evalTupleColors: any[];

  private dirtyArray: any[];
  private htmlElement: HTMLElement;
  private maxErrorCount: number[];
  private detailViewY: any;
  private x: any;
  private xAxis: any;
  private yScale: any;
  private tooltip;
  private activeEvalTuples: EvalTuple[];
  
  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;

    let tip = require('d3-tip');
    this.tooltip = tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0]);
  }

  ngOnInit() {
    let boundingRect = this.svg.nativeElement.getBoundingClientRect();
    this.detailViewHeight = boundingRect.height;
    this.detailViewWidth = boundingRect.width - this.columnOffset;
    d3.select(this.svg.nativeElement).select('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('class', 'rect-disabled')
      .attr('fill', 'transparent');
    this.drawDetailView();
  }

  ngOnChanges(changes: SimpleChanges) {
    let boundingRect = this.svg.nativeElement.getBoundingClientRect();
    this.detailViewHeight = boundingRect.height;
    this.detailViewWidth = boundingRect.width - this.columnOffset;
    d3.select(this.svg.nativeElement).select('rect')
      .attr('x', 0)
      .attr('y', this.visOffset)
      // .attr('class', 'rect-disabled')
      .attr('fill', 'transparent');

    if ('metricsOverlayModel' in changes) {
      this.redrawDetailView();
    } else if ('rowModel' in changes || 'metricSelection' in changes) {
      this.updateDirtyArray();
      this.drawDetailView();
    }
    if ('viewOffsetTop' in changes && this.rowModel) {
      this.detailViewY = d3.scaleLinear()
          .domain([this.rowModel.filtered, 0])
          .rangeRound([this.detailViewHeight-this.axisOffset, this.visOffset]);
    }

    if ('rowsFrom' in changes && this.x) {
      d3.select('rect.pos-overlay')
        .attr('y', (d, i) => {
          let y = this.detailViewY(this.rowsFrom);
          return this.detailViewY(this.rowsFrom);
        });
    }
  }

  private redrawDetailView() {
    this.updateDirtyArray();
  }

  private updateDirtyArray() {
    this.maxErrorCount = [];
    this.dirtyArray = [];
    if (this.rowModel && this.metricSelection) {

      this.activeEvalTuples = [];
      this.evalTupleColors = [];
      for (let m of this.metricSelection) {
        if (m.spanningEvaluable && !m.spanningEvaluable.disabled) {
          this.evalTupleColors.push(this.getColor(m));
          this.activeEvalTuples.push(m.spanningEvaluable);
        }
        for (let et of m.evalTuples) {
          this.evalTupleColors.push(this.getColor(m));
          if(!et.disabled) this.activeEvalTuples.push(et);
        }
      }
      let ordinalScale = [];
      for (let i = 0; i <= this.activeEvalTuples.length; ++i) ordinalScale.push(i);
      let tupleAxis = [];
      for (let tuple of this.activeEvalTuples) tupleAxis.push(tuple.evaluable);

      let detailWidths = [];

      for (let i in this.activeEvalTuples) {
        detailWidths.push(this.detailViewWidth/this.activeEvalTuples.length);
      }
      this.axisWidths = [40];
      for (let i = 1; i <= this.activeEvalTuples.length; ++i) {
        this.axisWidths.push(detailWidths[i-1] + this.axisWidths[i-1]);
      }

      this.detailViewY = d3.scaleLinear()
        .domain([this.rowModel.filtered, 0])
        .rangeRound([this.detailViewHeight-this.axisOffset, this.visOffset]);
      
      this.x = d3.scaleOrdinal()
        .domain(ordinalScale)
        .range(this.axisWidths);

      this.xAxis = d3.scaleOrdinal()
        .domain(tupleAxis)
        .range(this.axisWidths);

      for (let dirtyIdx = 0; dirtyIdx < this.rowModel.filtered; dirtyIdx++) {
        let dirtyEntry = { index: dirtyIdx, dirty: [] };
        for(let metricIdx = 0; metricIdx < this.metricSelection.length; metricIdx++) {
          let dirtyEvals = []
          if(this.metricSelection[metricIdx] && this.metricSelection[metricIdx].dirtyIndices) {
            let dirtyRow = this.metricSelection[metricIdx].dirtyIndices.filter(function(d) {
              return d.index == dirtyIdx;
            })[0];
            if (dirtyRow) {
              dirtyEntry.dirty = dirtyEntry.dirty.concat(dirtyRow.dirty);
            } else {
              let cleanEval: boolean[] = [];
              if(this.metricSelection[metricIdx].spanningEvaluable) 
                dirtyEntry.dirty.push(true);
              for(let bool in this.metricSelection[metricIdx].evalTuples) dirtyEntry.dirty.push(true);
            }
          }
        }
        if (dirtyEntry.dirty.length > 0 && dirtyEntry.dirty.indexOf(false) != -1) {
          let viewY = this.detailViewY(dirtyIdx);
          if(this.dirtyArray[viewY] == null) {
            this.dirtyArray[viewY] = {};
            this.dirtyArray[viewY].dirty = [];
            this.dirtyArray[viewY].index = [];
          }
          this.dirtyArray[viewY].index.push(dirtyEntry.index);
          for(let i = 0; i < dirtyEntry.dirty.length; ++i) {
            if(!this.maxErrorCount[i]) this.maxErrorCount[i] = 0;
            if(this.dirtyArray[viewY].dirty[i] == null) {
              this.dirtyArray[viewY].dirty[i] = [];
            }
            this.dirtyArray[viewY].dirty[i].push(dirtyEntry.dirty[i]);
            if(this.dirtyArray[viewY].dirty[i].length >= this.maxErrorCount[i]) {
              let errorCount = this.dirtyArray[viewY].dirty[i].reduce((total, x) => { return !x ? total + 1 : total }, 0);
              if (errorCount > this.maxErrorCount[i])
                this.maxErrorCount[i] = errorCount;
            }
          }
        }
      }
    }
  }

  private drawDetailView() {
    let container = d3.select(this.svg.nativeElement);
    container.selectAll('g.metric-detail-row')
      .remove();
    container.select('g.x.axis').remove();
    container.select('g.y.axis').remove();
    if (this.dirtyArray.length > 0) {
      let rows = container.selectAll('g.metric-detail-row')
        .data(this.dirtyArray)
        .enter().append('g')
        .attr('class', 'metric-detail-row')
        .attr('transform', (d, i) => {
          if(d) return 'translate(0,' + i + ')';
        })
        .style('fill', 'white')
        .on('click', (d, i, el) => {
          this.onDataRowsSelected.emit(d.index);
        })
        .on('mouseover', (d, i, el) => {
          let rec = d3.select(el[i]).append('rect')
          .attr('class', 'mouseover')
          .style('fill', 'steelblue')
          .style('width', (d, i, el) => {
            let parent:any = (<any>el[i]).parentElement;
            let parentSelection:any = d3.select(parent).node();
            let bb = parentSelection.getBoundingClientRect();
            return bb.width;
          })
          .attr('x', this.x(0))
          .style('height', '1');
          this.tooltip.html( d => {
            let text;
            if (d[0].index.length > 1) {
              text = '<span style="color:steelblue">Rows: </span><span>'+ (d[0].index[0] + 1) + ' - ' + (d[0].index[d[0].index.length-1] + 1) + ' </span>' ;
            } else {
              text = '<span style="color:steelblue">Row: </span><span>'+ (d[0].index[0] + 1) + ' </span>' ;
            }
              return text;
            })
            //offset is strangely dependent on elements in svg, hence we need to offset it so the proper position
            .offset([-7, 0])
            .show(rec.data(), rec.node());
        })
        .on('mouseleave', (d, i, el) => {
          this.tooltip.hide();
          d3.select(el[i]).selectAll('rect.mouseover').remove();
        })
        .call(this.tooltip);
      let bins = rows.selectAll('.bin')
        .data((d) => {
          if(d != null) {
            return d.dirty;
          } else {
            return [];
          }
        })
        .enter( ).append('rect')
        .attr('class', 'bin')
        .attr('x', (d, i) => {
          return this.x(i);
        }).attr('width', (d, i) => {
          return this.x(i + 1) - this.x(i);
        }).style('fill', (d:any[], i) => {
          if (d.indexOf(false) == -1) {
            return 'white';
          } else {
            return this.evalTupleColors[i];
          }
        }).style('opacity', (d:any[], i) => {
          var count = d.reduce(function(n, val) {
            return n + (val === false);
          }, 0);
          return count/this.maxErrorCount[i];
        })
        .attr('height', 1);

      container.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (this.detailViewHeight-this.axisOffset) + ')')
        .attr('x', this.detailViewHeight-this.axisOffset)
        .attr('y', 0)
        .call(d3.axisBottom(this.x))
        .style('font-size', 12)
        .style('text-anchor', 'start')
        .selectAll('.tick text')
        .each((d, i, g) => {
          if(this.activeEvalTuples[(<any>d)]) {
            d3.select(g[i]).text(this.activeEvalTuples[(<any>d)].evaluable);
          } else {
            d3.select(g[i]).text('');
          }
        })
        .attr('x', -8)
        .attr('y', (d, i, g) => {
          return 6 + 12*(i%2);
        });
      container.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate('+ this.columnOffset + ',' + 0 + ')')
        .call(d3.axisLeft(this.detailViewY));

      // position overlay
      container.selectAll('rect.pos-overlay').remove();
      container.insert('rect', 'g')
        .attr('class', 'pos-overlay')
        .attr('x', this.x(0))
        .attr('y', this.detailViewY(this.rowsFrom))
        .attr('height', (d, i) => {
          let h = this.detailViewY(this.rowsTo - this.rowsFrom);
          return h - this.visOffset;
        })
        .attr('width', (d, i) => {
          return this.x(this.metricSelection.length) - this.x(0);
        })
        .attr('fill', 'lightgrey')
        .attr('opacity', 0.7);
    }
  }

  private getColor(metric: any): string {
    if (metric.spanningColumns) {
      if (this.spanMetricColors[metric.name])
        return this.spanMetricColors[metric.name];
    } else {
      if (this.columnMetricColors[metric.name])
        return this.columnMetricColors[metric.name];
    }
    return "#ce6dbd";
  }
}
