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
    let cellWidth = this.htmlElement.offsetWidth - 1;
    let svg = d3.select(this.htmlElement).select("svg");

    svg.data(this.metric);
    svg.attr("width", cellWidth)
      .attr("height", 26)
      .on("mouseover", d => {
        if(this.metric) {
          let currentMetric = this.metric;
          let evalTuplesCount = currentMetric.evalTuples.length;
          if(currentMetric.spanningEvaluable) 
            evalTuplesCount++;
          
          this.tooltip.html(function(d) {
              var text = "<span style='color:steelblue'>" + currentMetric.name + "</span><br>" +
                "Metric Value: <span style='color:steelblue'>" + currentMetric.measure + "</span><br>" + 
                "Number of Checks: <span style='color:steelblue'>" + evalTuplesCount + "</span><br>";
              if(currentMetric.dirtyIndices != null) {
                text += "Erroneous Entries: <span style='color:steelblue'>" + currentMetric.dirtyIndices.length + "</span><br>";
              }
              text += "Data Type: <span style='color:steelblue'>" + currentMetric.datatype + "</span>";
              return text;
            })
            //offset is strangely dependent on elements in svg, hence we need to offset it so the proper position
            .offset([-10, (this.htmlElement.offsetWidth/2) - ((this.metric.measure*cellWidth)/2)])
            .show(svg.data(), svg.node());
        }
      })
      .on("mouseout", this.tooltip.hide)
      .on("mouseleave", this.tooltip.hide);

    svg.call(this.tooltip);

    if(this.metric) {
      svg.selectAll("rect").remove();
      let rect = svg.append("rect")
        .classed("metric", true)
        .attr("height", 26)
        .attr("width", this.metric.measure * cellWidth)
        .style("fill", (d, i, siblings) => {
          // let metric = siblings[i].parentNode.__data__;
          return this.spanMetricColors[this.metric.name];
        });
    }
  }

}
