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
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["projectId"]) {
      this.openRefineService.getRefineProject(this.projectId).subscribe(
        (project:any) => {
          // console.log(project.overlayModels["metricsOverlayModel"]);
          this.metricsOverlayModel = project.overlayModels["metricsOverlayModel"];
          let svg = d3.select(this.htmlElement).select("svg");
          if(this.metricsOverlayModel) {
            
            let colorbrewer = require('colorbrewer');
            let colColors = colorbrewer.Reds[this.metricsOverlayModel.availableMetrics.length];
            let spanColors = colorbrewer.Oranges[this.metricsOverlayModel.availableMetrics.length];
            this.columnMetricColors = {};
            this.spanMetricColors = {};
            for(let m in this.metricsOverlayModel.availableMetrics) {
              this.columnMetricColors[this.metricsOverlayModel.availableMetrics[m]] = colColors[m];
            }
            for (let m in this.metricsOverlayModel.availableSpanningMetrics) {
              this.spanMetricColors[this.metricsOverlayModel.availableSpanningMetrics[m]] = spanColors[m];
            }

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

            // let area = d3.area()
            //   .x(function(d:any) {
            //     console.log(bandScale(d.data.columnName));
            //     return bandScale(d.data.columnName); 
            //   })
            //   .y0(function(d:any) {
            //     // console.log(y(d[0]));
            //     return y(d[1]); 
            //   })
            //   .y1(function(d:any) {
            //     // console.log(y(d[1]));
            //     return y(d[0]); 
            //   });

            svg.selectAll("g.metric")
              .data(metrics)
              .enter().append("g")
                .attr("class", "metric")
              .selectAll("area")
              .data((d:any) => {
                return d.map((obj:any, idx: any, data:any) => {
                  return {
                    0: obj[0],
                    1: obj[1],
                    columnName: obj.data.columnName,
                    metric: obj.data.metrics[data.key]
                  }
                });
              })
              .enter()
              .append("rect")
                .attr("x", (d:any, i:number, any:any) => {
                  // console.log(bandScale(d.columnName));
                  return bandScale(d.columnName);
                })
                .attr("y", (d:any) => { return y(d[1]) })
                .attr("height", (d:any) => {
                  // if(d[1] > 0)
                  //   console.log(d[1]);
                  return y(d[0]) - y(d[1]);
                })
                .attr("width", bandScale.bandwidth())
                .attr("fill", (d:any) => {
                  if(d && d.metric) {
                    if(this.columnMetricColors[d.metric.name])
                      return this.columnMetricColors[d.metric.name];
                    if(this.spanMetricColors[d.metric.name])
                      return this.spanMetricColors[d.metric.name];
                  }
                  return 0;
                });
              // .append("path")
              //   .data(metrics)
              //   .attr("class", "area")
              //   .attr("d", area);

          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
