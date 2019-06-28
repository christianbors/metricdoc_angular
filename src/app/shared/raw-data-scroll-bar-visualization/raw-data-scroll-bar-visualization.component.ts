import { Component, Input, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Metric } from '../open-refine/model/metric'

import * as d3 from 'd3';

@Component({
  selector: '[scroll-bar-vis]',
  template: '',
  styleUrls: ['./raw-data-scroll-bar-visualization.component.css']
})
export class RawDataScrollBarVisualizationComponent implements OnInit, OnChanges {

  @Input() private metricsOverlayModel;
  @Input() private colWidths: number[];
  @Input() private bodyHeight;
  @Input() private rowsFrom: number;
  @Input() private itemsPerPage: number;
  @Input() columnMetricColors;
  @Input() spanMetricColors;
  private htmlElement: HTMLElement;
  private host;

  private overlayScaleY;

  private overlay;
  private columns;
  private frameContainer;
  private metricElements;

  private colOffset: number[] = [];

  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if('metricsOverlayModel' in changes) {
      this.fillCols();
    }
    if('rowsFrom' in changes) {
      this.fillScrollVis();
      this.updateOverlayPositions();
    }
    if ('colWidths' in changes && 'bodyHeight' in changes) {
      this.updateOverlayPositions();
    }
  }

  public fillCols() {
    d3.select(this.htmlElement)
      .selectAll('g.metrics-overlay')
      .remove();
    this.overlay = d3.select(this.htmlElement)
      .selectAll('g.metrics-overlay')
      .data(d => {
        return this.metricsOverlayModel.metricColumns;
      })
      .enter().append('g')
      .attr('class', 'metrics-overlay');
      // .attr('transform', (d, i) => { return 'translate(' + d.offset + ',0)' })
    
    this.columns = this.overlay.selectAll('.metrics-overlay-col')
      .data((d:any) => {
        if(d) {
          let metrics = [];
          for (let key in d.metrics) {
            if (d.metrics[key].dirtyIndices) {
              metrics.push(d.metrics[key]);
            }
          }
          if(this.metricsOverlayModel.spanningMetrics) {
            for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
              if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                metrics.push(spanMetric);
              }
            }
          }
          return metrics;
        }
        return [];
      })
      .enter().append('g')
      .attr('class', 'metrics-overlay-col')
      .attr('class', (d, i) => { return d.name })
      .attr('transform', (d, i) => {
        let colOffset = 0;
        if (d.dirtyIndices != null) {
          colOffset = colOffset + (12*(i+1));
        }
        return 'translate(-' + colOffset + ',0)';
      })
      .attr('display', (d, i) => {
        if (!d.dirtyIndices) return 'none';
      });

    // set background
    this.columns.append('rect')
      .attr('height', this.bodyHeight)
      .attr('width', 12)
      .attr('fill', (d:any) => {
        let from = this.rowsFrom;
        let to = this.rowsFrom + this.itemsPerPage;
        if (d.dirtyIndices) {
          let inRange = d.dirtyIndices.filter(function(d, i) {
            return d.index >= from && d.index <= to;
          });
          if (inRange.length > 0) {
            return 'white';
          }
        }
        return 'transparent';
      });

    // left line
    this.frameContainer = this.overlay.filter((d:any, i) => {
      let from = this.rowsFrom;
      let to = this.rowsFrom + this.itemsPerPage;
      for (let key in d.metrics) {
        if (d.metrics[key].dirtyIndices) {
          let inRange = d.metrics[key].dirtyIndices.filter(function(d, i) {
            return d.index >= from && d.index <= to;
          });
          if (inRange.length > 0)
            return d;
        }
      }
      if (this.metricsOverlayModel.spanningMetrics) {
        for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
          if (spanMetric.spanningColumns.indexOf(d.columnName) > -1 && spanMetric.dirtyIndices) {
            let inRange = spanMetric.dirtyIndices.filter(function(d, i) {
              return d.index >= from && d.index <= to;
            });
            if (inRange.length > 0)
              return d;
          }
        }
      }
    });
  }

  public updateOverlayPositions() {    
    let from = this.rowsFrom;
    let to = this.rowsFrom + this.itemsPerPage;
    this.overlayScaleY = d3.scaleLinear()
      .domain([to, from])
      .rangeRound([(this.bodyHeight), 0]);
    if (this.frameContainer)
      this.frameContainer.selectAll('line').remove();

    this.frameContainer = this.overlay.filter((d:any, i) => {
      let from = this.rowsFrom;
      let to = this.rowsFrom + this.itemsPerPage;
      for (let key in d.metrics) {
        if (d.metrics[key].dirtyIndices) {
          let inRange = d.metrics[key].dirtyIndices.filter(function(d, i) {
            return d.index >= from && d.index <= to;
          });
          if (inRange.length > 0)
            return d;
        }
      }
      if (this.metricsOverlayModel.spanningMetrics) {
        for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
          if (spanMetric.spanningColumns.indexOf(d.columnName) > -1 && spanMetric.dirtyIndices) {
            if (spanMetric.dirtyIndices.length > 0) {
              let inRange = spanMetric.dirtyIndices.filter(function(d, i) {
                return d.index >= from && d.index <= to;
              });
              if (inRange.length > 0)
                return d;
            }
          }
        }
      }
    });

    this.overlay.attr('transform', (d, i, elements) => {
      if(this.colWidths.length > 0) {
          let width = 0;
          for (let colIt = 0; colIt <= i+1; colIt++) {
            width += this.colWidths[colIt];
          }
          return 'translate(' + (width - 4) + ',0)'; 
      }
    });

    this.columns.selectAll('rect')
      .attr('height', this.bodyHeight);

    this.metricElements.attr('height', this.bodyHeight/this.itemsPerPage)
      .attr('y', d => { 
        return this.overlayScaleY(d.index)
      });

    if (this.colWidths.length > 0) {
      this.frameContainer.append('line')
        .attr('x1', (d:any) => {
          let colWidth = 1;
          for (let key in d.metrics) {
            if (d.metrics[key].dirtyIndices) {
              colWidth += 12;
            }
          }
          if (this.metricsOverlayModel.spanningMetrics) {
            for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
              if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                if (spanMetric.dirtyIndices)
                  colWidth += 12;
              }
            }
          }
          return - colWidth;
        })
        .attr('x2', (d:any) => {
          let colWidth = 1;
          for (let key in d.metrics) {
            if (d.metrics[key].dirtyIndices) {
              colWidth += 12;
            }
          }
          if (this.metricsOverlayModel.spanningMetrics) {
            for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
              if (spanMetric.spanningColumns.indexOf(d.columnName) > -1) {
                if (spanMetric.dirtyIndices)
                  colWidth += 12;
              }
            }
          }
          return - colWidth;
        })
        .attr('y1', 0)
        .attr('y2', this.bodyHeight)
        .attr('stroke', '#ddd')
        .attr('stroke-width', '2');

      // right line line
      this.frameContainer.append('line')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', this.bodyHeight)
        .attr('stroke', '#ddd')
        .attr('stroke-width', '2');
    }
  }

  private fillScrollVis(): void {
    let from = this.rowsFrom;
    let to = this.rowsFrom + this.itemsPerPage;

    let cols = d3.select(this.htmlElement)
      .selectAll('g.metrics-overlay')
      .selectAll('g')
      .selectAll('g');
    d3.selectAll('rect.metrics-bin').remove();

    // Define the div for the tooltip
    this.metricElements = cols.data((d:Metric) => {
        if (d.dirtyIndices) {
          if (d.concat === 'AND' && d.dirtyIndices.length > 1) {
            return d.dirtyIndices.filter(function(d, i) {
              return (d.index >= from && d.index <= to) && d.dirty.indexOf(true) == -1;
            });
          } else {
            return d.dirtyIndices.filter(function(d, i) {
              return d.index >= from && d.index <= to;
            });
          }
        } else {
          return [];
        }
      })
      .enter()
      .append('rect')
      .attr('class', 'metrics-bin')
      .attr('width', 12)
      .attr('pointer-events', 'all')
      .style('fill', (d, i, siblings:any[]) => {
        return this.fillRect(siblings[i].parentNode.__data__);
      })
      .on('mouseover', (d, i, siblings) => {
        let rec = d3.select(siblings[i]).style('fill', 'steelblue');
        // this.tooltip.html( d => {
        //     var text = '<span style="color:steelblue">Row: </span><span>'+ (d[0].index + 1) + ' </span>' ;
        //     return text;
        //   })
        //   //offset is strangely dependent on elements in svg, hence we need to offset it to the proper position
        //   .offset([-10, 0])
        //   .show(rec.data(), rec.node());
        let tooltipNode:any = d3.select("body").select("div.d3tooltip").node();
        d3.select("body").select("div.d3tooltip")
          .html('<span style="color:steelblue">Row: </span><span>'+ (d.index + 1) + ' </span>')
          .transition()
          .duration(100)
          .style("opacity", .9)
          .style("left", (d3.event.pageX - tooltipNode.scrollWidth) + "px")
          .style("top", d3.event.clientY + "px");
      })
      .on('mouseout', (d, i, siblings) => {
        let rec = d3.select(siblings[i]).style('fill', (d, i, siblings:any[]) => {
          return this.fillRect(siblings[i].parentNode.__data__);
        });
        // this.tooltip.hide();
        d3.select("body").select("div.d3tooltip").transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on('mouseleave', (data:any) => {
        d3.select("body").select("div.d3tooltip").transition()
          .duration(100)
          .style("opacity", 0);
        });
  }
  
  fillRect(metric: any): string {
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
