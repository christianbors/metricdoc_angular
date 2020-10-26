import { Component, OnInit, OnChanges, Input, SimpleChanges, ElementRef } from '@angular/core';

import { OpenRefineService } from '../../shared/open-refine/open-refine.service';
import { OpenRefineProject } from '../../shared/open-refine/model/open-refine-project';

import * as d3 from 'd3';

@Component({
  selector: 'metric-preview',
  templateUrl: './metric-preview.component.html',
  styleUrls: ['./metric-preview.component.sass']
})
export class MetricPreviewComponent implements OnInit, OnChanges {

  @Input() private projectId: string;
  @Input() private project: OpenRefineProject;
  
  @Input() private svgHeight:number;

  private htmlElement: HTMLElement;
  
  private columnMetricColors: any;
  private spanMetricColors: any;

  constructor(private element: ElementRef, private openRefineService: OpenRefineService) {
    this.htmlElement = this.element.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["projectId"] && !this.project) {
      this.openRefineService.getRefineProject(this.projectId).subscribe(
        (project:any) => {
          // console.log(project.overlayModels["metricsOverlayModel"]);
          this.project = project;
          this.drawMetricOverview();
        },
        error => {
          console.log(error);
        }
      );
    } else if (changes["project"]) {
      this.drawMetricOverview();
    }
  }

  private drawMetricOverview() {
    let svg = d3.select(this.htmlElement).select("svg");

    if(this.project.overlayModels["metricsOverlayModel"]) {
      let overlayModel = this.project.overlayModels["metricsOverlayModel"];

      let colorbrewer = require('colorbrewer');
      let colColors = colorbrewer.Reds[overlayModel.availableMetrics.length];
      let spanColors = colorbrewer.Oranges[overlayModel.availableMetrics.length];
      this.columnMetricColors = {};
      this.spanMetricColors = {};
      for(let m in overlayModel.availableMetrics) {
        this.columnMetricColors[overlayModel.availableMetrics[m]] = colColors[m];
      }
      for (let m in overlayModel.availableSpanningMetrics) {
        this.spanMetricColors[overlayModel.availableSpanningMetrics[m]] = spanColors[m];
      }

      let stack = d3.stack().keys(overlayModel.availableMetrics) //.concat(this.metricsOverlayModel.availableSpanningMetrics)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)
        .value(function(d, key) {
          if(d) {
            if (d.metrics && d.metrics[key])
              return d.metrics[key].measure;
          }
        });

      let metrics = stack(<any[]>overlayModel.metricColumnNames);
      var bandScale = d3.scaleBand()
        .domain(this.project.columnModel.columns.map(function(d) { return d.name }))
        .range([0, 500])
        .padding(0);
      var y = d3.scaleLinear().domain([0,overlayModel.availableMetrics.length]).range([this.svgHeight, 0])
      
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
          .attr("y", (d:any) => { 
            if(!isNaN(d[1]))
              return y(d[1]);
            else return (y(0));
          })
          .attr("height", (d:any) => {
            if(!isNaN(d[1]))
              return y(d[0]) - y(d[1]);
            else return 0;
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
  }
}
