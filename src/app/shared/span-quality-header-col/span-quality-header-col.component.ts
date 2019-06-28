import { Component, OnChanges, SimpleChanges, Input, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: '[span-metric-col]',
  template: '<svg width="0"></svg>',
  styleUrls: ['./span-quality-header-col.component.css']
})
export class SpanQualityHeaderColComponent implements OnChanges {

  @Input() private metricCol
  @Input() private metric;
  @Input() private tooltip;
  @Input() private spanMetricColors;
  @Input() private metricsOverlayModel;
  @Input() private colWidths;
  
  private host;
  private htmlElement: HTMLElement;

  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.colWidths && this.colWidths.length > 0) {
      let cellWidth = this.htmlElement.parentElement.offsetWidth - (this.colWidths[0]) - 1;
      let svg = d3.select(this.htmlElement).select("svg");

      let div = d3.select("body").append("div")
        .attr("class", "d3tooltip")
        .style("opacity", 0);
      svg.data(this.metric);
      svg.attr("width", cellWidth)
        .attr("height", 26)
        .on("mouseover", d => {
          if(this.metric) {
            let currentMetric = this.metric;
            let evalTuplesCount = currentMetric.evalTuples.length;
            if(currentMetric.spanningEvaluable) 
              evalTuplesCount++;
            
            div.transition()
              .duration(100)
              .style("opacity", .9);
            div.html(function(d) {
                var text = "<span style='color:steelblue'>" + currentMetric.name + "</span><br>" +
                  "Metric Value: <span style='color:steelblue'>" + currentMetric.measure + "</span><br>" + 
                  "Number of Checks: <span style='color:steelblue'>" + evalTuplesCount + "</span><br>";
                if(currentMetric.dirtyIndices != null) {
                  text += "Erroneous Entries: <span style='color:steelblue'>" + currentMetric.dirtyIndices.length + "</span><br>";
                }
                text += "Data Type: <span style='color:steelblue'>" + currentMetric.datatype + "</span>";
                return text;
              });
          }
        })
        .on("mouseout", () => {
          div.transition()
            .duration(100)
            .style("opacity", 0);
        })
        .on("mouseleave", () => {
          div.transition()
            .duration(100)
            .style("opacity", 0);
        });

      svg.call(this.tooltip);

      if(this.metric) {
        svg.selectAll("rect").remove();
        let rect = svg.append("rect")
          .classed("metric", true)
          .attr("height", 26)
          .attr("width", this.metric.measure * cellWidth)
          .style("fill", (d, i, siblings) => {
            if(this.spanMetricColors[this.metric.name])
              return this.spanMetricColors[this.metric.name];
            return "#ce6dbd";
          });
      }
    }
  }

}
