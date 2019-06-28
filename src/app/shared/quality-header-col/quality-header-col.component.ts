import { Component, Directive, OnChanges, AfterContentChecked, SimpleChanges, Input, HostListener, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: '[metric-col]',
  templateUrl: './quality-header-col.component.html',
  styleUrls: ['./quality-header-col.component.css']
})
export class QualityHeaderColComponent implements OnChanges, AfterContentChecked {

  @Input() metricCol;
  @Input() metric;
  @Input() metricsOverlayModel;
  @Input() columnMetricColors;
  @Input() svgWidth;

  host;
  htmlElement: HTMLElement;

  constructor(protected element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    let cellWidth = this.htmlElement.offsetWidth - 1;
    let svg = d3.select(this.htmlElement).select("svg");

    svg.data(this.metricCol.metrics[this.metric]);
    svg.attr("height", 26)
      .on("mouseover", d => {
        if(this.metricCol.metrics[this.metric]) {
          let currentMetric = this.metricCol.metrics[this.metric];
          
          let tooltipNode:any = d3.select("body").select("div.d3tooltip").node();
          d3.select("body").select("div.d3tooltip").html(function(d) {
              var text = "<span style='color:steelblue'>" + currentMetric.name + "</span><br>" +
                "Metric Value: <span style='color:steelblue'>" + currentMetric.measure + "</span><br>" + 
                "Number of Checks: <span style='color:steelblue'>" + currentMetric.evalTuples.length + "</span><br>";
              if(currentMetric.dirtyIndices != null) {
                text += "Erroneous Entries: <span style='color:steelblue'>" + currentMetric.dirtyIndices.length + "</span><br>";
              }
              text += "Data Type: <span style='color:steelblue'>" + currentMetric.datatype + "</span>";
              return text;
            })
            // .transition()
            //   .duration(100)
              .style("left", (d3.event.pageX - tooltipNode.scrollWidth) + "px")
              .style("top", (d3.event.pageY) + "px")
              .style("opacity", .9);
            // //offset is strangely dependent on elements in svg, hence we need to offset it so the proper position
            // .offset([-10, (this.htmlElement.offsetWidth/2) - ((this.metricCol.metrics[this.metric].measure*cellWidth)/2)])
            // .show(svg.data(), svg.node());
        }
      })
      .on("mouseout", () => {
        d3.select("body").select("div.d3tooltip").transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on("mouseleave", () => {
        d3.select("body").select("div.d3tooltip").transition()
          .duration(100)
          .style("opacity", 0);
      });

    if(this.metricCol.metrics[this.metric]) {
      svg.selectAll("rect").remove();
      let rect = svg.append("rect")
        .classed("metric", true)
        .attr("height", 26)
        .attr("width", this.metricCol.metrics[this.metric].measure * cellWidth)
        .style("fill", (d, i, siblings) => {
          // let metric = siblings[i].parentNode.__data__;
          return this.columnMetricColors[this.metric];
        });
    }
  }
  ngAfterContentChecked() {
    let cellWidth = this.htmlElement.offsetWidth - 1;
    let svg = d3.select(this.htmlElement).select("svg");
    if(this.metricCol.metrics[this.metric]) {
      svg.selectAll("rect").attr("width", this.metricCol.metrics[this.metric].measure * cellWidth);
    }
  }
}


