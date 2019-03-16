import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap }     from '@angular/router';
import { DomSanitizer }                         from '@angular/platform-browser';
import { OpenRefineService }                    from './../shared/open-refine/open-refine.service';
import { OpenRefineProject }                    from './../shared/open-refine/model/open-refine-project';
import { ProjectMetadata }                      from './../shared/open-refine/model/project-metadata';
import { ProvenanceOverlayModel }               from './../refine-provenance/model/provenance-overlay-model';

import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';

import * as d3         from 'd3';
import * as d3Sankey   from './d3-sankey.js';
import * as iconCodes  from './icon-codes.json';

@Component({
  selector: 'app-refine-provenance-explorer',
  templateUrl: './refine-provenance-explorer.component.html',
  styleUrls: ['./refine-provenance-explorer.component.scss'],
  providers: [ OpenRefineService ],
  encapsulation: ViewEncapsulation.None
})
export class RefineProvenanceExplorerComponent implements OnInit {

  errorMessage: string;
  projectId: string;
  refineProjectUrl;
  histId: any;
  nodeHistory: any[];
  shiftNodeHistory: any[];
  projectMetadata: ProjectMetadata;
  openRefineProject: OpenRefineProject;
  provenanceOverlayModel: any;
  loadFinished: boolean = false;
  scaleHistory: any;
  scaleFuture:any;

  // percentage widths
  pageWidth: number = 100;
  detailHeight: number = 40;
  sankeyHeight: number = 25;
  refineHeight: number = 35;
  // absolute widths
  qualityViewWidth: number = 0;
  detailViewWidth: number = 0;
  nodeWidth:number = 36;
  iconWidth:number = 16;
  elementPadding: number = 35;

  @ViewChild('qualityMetric') public metricMenu: ContextMenuComponent;
  @ViewChild('issue') public issueMenu: ContextMenuComponent;

  @ViewChild('provGraph') provGraph:ElementRef;

  // d3 sankey library
  d3Sankey;
  // this is the graph
  sankeyDiag;
  // these are the d3 elements of the graph
  sankeyNodes;
  sankeyLinks;
  // d3 transition
  transition;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService,
    protected contextMenuService: ContextMenuService,
    private domSanitizer : DomSanitizer) {
  }

  ngOnInit() {
    this.transition = d3.transition()
      .duration(1000)
      .ease(d3.easeLinear);
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.getOpenRefineProject();

    this.refineProjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:3333/project?project=" + this.projectId);
    this.openRefineService.getProjectMetadata(this.projectId)
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

  getOpenRefineProject() {
    let iconPadding:number = 8;
    let nodePadding:number = iconPadding*2 + this.iconWidth;

    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];

          if(this.provenanceOverlayModel) {
            let graph = this.buildGraph(this.provenanceOverlayModel);
            this.histId = this.provenanceOverlayModel.currentHistoryEntry.localPart;

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
              // this.scaleHistory = d3.scaleBand().domain(this.nodeHistory).range([35, parseFloat(this.provGraph.nativeElement.scrollWidth) - 15]).padding(0.8);
            
              // first lets create the sankey
              this.sankeyDiag = d3Sankey.sankey()
                .nodeWidth(this.nodeWidth)
                .nodePadding(nodePadding)
                .extent([[0, 0], [this.provGraph.nativeElement.scrollWidth, this.provGraph.nativeElement.scrollHeight - (this.iconWidth + nodePadding)]])
                .nodeAlign(d3Sankey.sankeyLeft);

              this.sankeyDiag.nodes(graph.nodes)
                .links(graph.links)
                .nodeId((node:any) => node.key);

              this.setSankeyScale();

              this.sankeyLinks = d3.select("svg.provGraph").append("g")
                // .attr("fill", "none")
                .attr("stroke-opacity", 0.25)
              .selectAll("g")
                .classed("links", true)
              .data(this.sankeyDiag().links)
              .enter().append("g");

              // Define the div for the tooltip
              var div = d3.select("body").append("div")
                .attr("class", "d3tooltip")
                // .attr("[ngStyle]", "tooltip")
                .style("opacity", 0);

              this.sankeyLinks.append("path")
                  .attr("d", (d:any) => this.linkSkewed(d))
                  .attr("id", (d:any) => { 
                    return "activity" + d.activity.replace("change:","");
                  })
                  // .attr("stroke", d => "grey")
                  .attr("fill", d => "grey")
                  .attr("fill-opacity", (d:any) => {
                    if(this.scaleHistory(d.source.depth))
                      return 0.35;
                    return 0.2;
                  })
                  // .attr("stroke-width", (d:any) => Math.max(1, d.width))
                // .append("title")
              this.sankeyLinks.append("svg:foreignObject")
                  // .attr("x", 10)
                  // .attr("y", 10)
                  // .attr('x', (d:any) => d.target.x0 - (d.target.x0 - d.source.x1)/2)
                  .attr('x', (d:any) => {
                    if (this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
                      return this.scaleHistory(d.target.depth) - (this.scaleHistory(d.target.depth) - this.scaleHistory(d.source.depth) - this.scaleHistory.bandwidth())/2;
                    else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
                      return this.scaleFuture(d.target.depth) - (this.scaleFuture(d.target.depth) - this.scaleHistory(d.source.depth) - this.scaleHistory.bandwidth())/2;
                    return this.scaleFuture(d.target.depth) - (this.scaleFuture(d.target.depth) - this.scaleFuture(d.source.depth) - this.scaleFuture.bandwidth())/2;
                  })
                  .attr('y', (d:any) => {
                    //return d.y1 - (d.y1-d.y0)/2; // - (d.source.y1 - (d.source.height/2)/2)
                    let inter = d3.interpolateNumber(d.source.y1, d.target.y1);
                    console.log(d.source.y1 + " " + d.target.y1 + " " + inter(0.5));
                    return d3.interpolateNumber(d.source.y1, d.target.y1)(0.5);
                  })
                  .attr('text-anchor', 'middle')
                  .attr('dominant-baseline', 'central')
                  .attr('font-family', 'Font Awesome 5 Free')
                  .attr('fill', 'black')
                  .attr('font-weight', 900)
                  .attr('font-size', '1em')
                  .attr('overflow', 'visible')
                .html((d:any) => {
                  if(this.provenanceOverlayModel.provenance.activity["facet:" + d.activity.replace("change:", "")]) {
                    return '<i class="fa fa-1x fa-chart-bar"></i>';
                  }
                });
              this.sankeyLinks.on("mouseover", (data:any) => {
                if(this.provenanceOverlayModel.provenance.activity["facet:" + data.activity.replace("change:", "")]) {
                  let text = Object.entries(this.provenanceOverlayModel.provenance.activity["facet:" + data.activity.replace("change:", "")])
                    .map((f:any) => { 
                      return f[0].replace("facet:", "") + ": " + f[1].$;
                    });
                div.transition()
                  .duration(100)
                  .style("opacity", .9);
                div.html("<span>" + text.join("<br>") + "</span>")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
                  return text;
                }
              })
              .on("mouseout", (d:any) => {
                div.transition()
                  .duration(100)
                  .style("opacity", 0);
              });
                

              let ops = [];
              Object.values(graph.nodes).forEach((n:any) => {
                if (!ops.includes(n.entity["prov:label"]))
                  ops.push(n.entity["prov:label"]);
              });
              // -1 prevents drawing of color white
              let sankeyColorScale = d3.scaleSequential(d3.interpolateBlues).domain([-1, ops.length]);
              // let scale = d3.scaleOrdinal(d3.schemeCategory10).domain(ops);

              let cols:any = {};
              for(let k of Object.keys(this.provenanceOverlayModel.provenance.entity)) {
                if(k.includes("column:"))
                  cols[k] = this.provenanceOverlayModel.provenance.entity[k];
              }

              this.sankeyNodes = d3.select("svg.provGraph").append("g")
                .classed("nodes", true)
                // .attr("stroke", "#000")
              .selectAll(".history_nodes")
              .data(this.sankeyDiag().nodes)
              .enter().append("g")
                .attr("class", "history_nodes")
                .attr("height", (d:any) => d.y1 - d.y0)
                .attr("width", (d:any) => d.x1 - d.x0);

              this.sankeyNodes.append("rect")
                  .attr("id", (data:any) => "activity" + data.key.replace("history_entry:", ""))
                  .attr("x", (d:any) => {
                    if(this.scaleHistory(d.depth))
                      return this.scaleHistory(d.depth);
                    else
                      return this.scaleFuture(d.depth);
                  })
                  .attr("y", (data:any) => data.y0)
                  .attr("height", (data:any) => data.y1 - data.y0)
                  .attr("width", (d:any) => {
                    if(this.scaleHistory(d.depth)) 
                      return this.scaleHistory.bandwidth();
                    return this.scaleFuture.bandwidth();
                  })
                  .attr("stroke", "none")
                  .attr("fill", (d:any) => {
                    let col = d.entity["prov:label"];
                    return sankeyColorScale(ops.indexOf(col));
                  });
              this.sankeyNodes.append("svg:foreignObject")
                  .attr("x", (d:any) => {
                    if(this.scaleHistory(d.depth))
                      return this.scaleHistory(d.depth);
                    else
                      return this.scaleFuture(d.depth);
                  })
                  .attr('y', (d:any) => d.y1)
                  .attr('text-anchor', 'middle')
                  .attr('dominant-baseline', 'central')
                  .attr('font-family', 'Font Awesome 5 Free')
                  .attr('fill', 'black')
                  .attr('font-weight', 900)
                  .attr('overflow', 'visible')
                  .style('padding-left', (d:any) => {
                    let w;
                    if (this.scaleHistory(d.depth))
                      w = this.scaleHistory.bandwidth();
                    else
                      w = this.scaleFuture.bandwidth();
                    return (w - this.iconWidth)/2 + 'px';
                  })
                  .html((data:any) => '<i class="fa fa-1x ' + iconCodes.default[data.entity["prov:label"]] + '"></i>');

              this.sankeyNodes.on("mouseover", (data:any) => {
                  div.transition()
                    .duration(100)
                    .style("opacity", .9);
                  div.html("<span>" + data.entity["prov:value"]["$"] + "</span>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                  })
                .on("mouseout", (d:any) => {
                  div.transition()
                    .duration(100)
                    .style("opacity", 0);
                })
                .on("click", (data:any, index:number, entries:any[]) => {
                  this.histId = data.key.replace("history_entry:", "");
                  if (d3.event.shiftKey) {
                    this.shiftNodeHistory = this.determineNodeHistory(this.histId);
                    this.highlightProvGraph(this.shiftNodeHistory, "shiftSelected");
                  } else {
                    this.clearProvGraphHighlights();
                    this.shiftNodeHistory = []
                    this.nodeHistory = this.determineNodeHistory(this.histId);
                    this.highlightProvGraph(this.nodeHistory, "selected");
                    this.setSankeyScale();
                  }
                });
            });
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  buildGraph(provenanceOverlayModel: any):any {
    let links:any[] = [];

    // let historyEntries = Object.keys(provenanceOverlayModel.provenance.entity).filter((key: string) => {
    //   if (key.includes('history_entry')) {
    //     provenanceOverlayModel.provenance.entity[key].depth = 0;
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // for (let key of Object.keys(provenanceOverlayModel.provenance.wasDerivedFrom)) {
    //   if (provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:usedEntity"]) {
    //     let used = provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:usedEntity"];
    //     let gen = provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:generatedEntity"];
    //     provenanceOverlayModel.provenance.entity[gen].depth = provenanceOverlayModel.provenance.entity[used].depth + 1;
    //   }
    // }

    // nodes are the history entries, stored as entities
    let nodeEntries:any[] = Object.entries(provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('history_entry'));

    let maxVal = 0;
    for (let wdf of Object.values(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      let value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:usedEntity"]).length;
      let endValue = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:generatedEntity"]).length;
      if (endValue == 0)
        value = 1;

      if(maxVal < value)
        maxVal = value;

      let metrics: any[];
      if(wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality")) {
        links.push(
          {
            source: wdf["prov:usedEntity"],
            target: wdf["prov:generatedEntity"],
            generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
            out: null,
            in: null,
            value: 1,
            // depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
            activity: wdf["prov:activity"]
          });
      }
    }

    let cols:any = {};
    for(let k of Object.keys(this.provenanceOverlayModel.provenance.entity)) {
      if(k.includes("column:"))
        cols[k] = this.provenanceOverlayModel.provenance.entity[k];
    }

    let nodes:any[] = [];
    for (let entry of nodeEntries) {
      let activityId = entry[0].replace("history_entry:", "");
      let colMetrics:any = {};
      let colNames:any[] = [];
      let mNames:string[] = [];
      Object.keys(cols).forEach((k:any) => {
        let qEntry = cols[k]["quality:"+activityId];
        if(qEntry) {
          colMetrics[k] = qEntry;
          for(let m of qEntry) {
            colNames.push({col:k, metric: m.type});
            if(!mNames.includes(m.type))
              mNames.push(m.type);
          }
        }
      })
      let value = 0;
      Object.values(colMetrics).forEach((colMetric:any) => {
        colMetric.sum = 0;
        Object.values(colMetric).forEach((val:any) => {
          if(val.$)
            colMetric.sum += parseFloat(val.$);
        });
        value += colMetric.sum;
      })
      let rowSize = 0;
      let histInfo = this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + entry[0].replace("history_entry:","")];
      if(histInfo)
        rowSize = parseInt(histInfo.$);
      nodes.push({key: entry[0], value: rowSize, entity: entry[1]});
    }

    let graph = {
      nodes: nodes,
      links: links
    };
    return graph;
  }

  linkSkewed(d: any): any {
    var curvature = .6;
    // var x0 = d.source.x1,
    //     x1 = d.target.x0;
    let x0 = this.scaleHistory(d.source.depth) + this.scaleHistory.bandwidth(),
        x1 = this.scaleHistory(d.target.depth);
    if (!x0)
      x0 = this.scaleFuture(d.source.depth) + this.scaleFuture.bandwidth();
    if (!x1)
      x1 = this.scaleFuture(d.target.depth);

    let xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y0,
        y1 = d.target.y0;
    return "M" + x0 + "," + y0
         + "C" + x2 + "," + y0
         + " " + x3 + "," + y1
         + " " + x1 + "," + y1
         + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
         + "C" + x3 + "," + (y1+ (d.target.y1 - d.target.y0))
         + " " + x2 + "," + (y0+ (d.source.y1 - d.source.y0))
         + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
         + "L" + x0 + "," + y0;
  }

  determineNodeHistory(historyId: any):any[] {
    // let histories = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => { if (entity[0].includes("history_entry:")) return entity; });
    let nodeHistory = [];
    let parent = "history_entry:" + this.histId;
    while (parent) {
      nodeHistory.splice(0, 0, { id: parseInt(parent.replace("history_entry:", "")), value: this.provenanceOverlayModel.provenance.entity[parent] });
      let wdfParent = Object.values(this.provenanceOverlayModel.provenance.wasDerivedFrom).find((wdf: any) => {
        return wdf["prov:generatedEntity"] == parent;
      });
      if (!wdfParent["prov:usedEntity"])
        parent = null;
      parent = wdfParent["prov:usedEntity"];
      // nodeHistory.push(this.provenanceOverlayModel.provenance.entity[parent["prov:generatedEntity"]]);
    }
    let depths:any[] = this.sankeyDiag().nodes.filter(node => {
      let mapNode = this.nodeHistory.find((mapNode:any) => {
        return mapNode.id === parseInt(node.key.replace("history_entry:", ""));
      });
      if (mapNode) {
        mapNode.depth = node.depth;
        return true;
      }
        // return .includes(parseInt(node.key.replace("history_entry:","")));
      })
    return nodeHistory;
  }

  setSankeyScale() {
    // create scales based on node depths
    let depths:any[] = this.sankeyDiag().nodes.filter(node => {
      let mapNode = this.nodeHistory.find((mapNode:any) => {
        return mapNode.id === parseInt(node.key.replace("history_entry:", ""));
      });
      if (mapNode) {
        mapNode.depth = node.depth;
        return true;
      }
        // return .includes(parseInt(node.key.replace("history_entry:","")));
      })
      .map(node => node.depth).sort();
    depths.push(-1);
    this.scaleHistory = d3.scaleBand().domain(depths).range([this.elementPadding, parseFloat(this.provGraph.nativeElement.scrollWidth)]).paddingInner(.9);
    
    console.log(this.scaleHistory.bandwidth());

    let depthsFuture = [];
    depthsFuture.push(-1);
    this.sankeyDiag().nodes.forEach(node => {
      if (!depths.includes(node.depth) && !depthsFuture.includes(node.depth))
        depthsFuture.push(node.depth);
    });
    depthsFuture.sort();
    this.scaleFuture = d3.scaleBand().domain(depthsFuture).range([this.scaleHistory(depths[depths.length-2]), this.scaleHistory(depths[depths.length-1])]).paddingInner(.9);
    // let nodes = d3.select("svg.provGraph").selectAll("g.nodes").selectAll("g.history_nodes");

    this.qualityViewWidth = this.scaleHistory(depths[depths.length-2]) + this.scaleHistory.bandwidth();
    this.detailViewWidth = this.scaleHistory(depths[depths.length-1]) - this.scaleHistory(depths[depths.length-2]) - this.scaleHistory.bandwidth();
    if (this.sankeyNodes) {
      this.sankeyNodes.selectAll("rect")
        .attr("x", (d:any) => {
          if(this.scaleHistory(d.depth))
            return this.scaleHistory(d.depth);
          else
            return this.scaleFuture(d.depth);
        })
        .attr("width", (d:any) => {
          if(this.scaleHistory(d.depth)) 
            return this.scaleHistory.bandwidth();
          return this.scaleFuture.bandwidth();
        })
        .transition(this.transition);

      this.sankeyNodes.selectAll("foreignObject")
        .attr("x", (d:any) => {
          if(this.scaleHistory(d.depth))
            return this.scaleHistory(d.depth);
          else
            return this.scaleFuture(d.depth);
        })
        .style('padding-left', (d:any) => {
          let w;
          if (this.scaleHistory(d.depth))
            w = this.scaleHistory.bandwidth();
          else
            w = this.scaleFuture.bandwidth();
          return (w - this.iconWidth)/2 + 'px';
        })

    }
    if (this.sankeyLinks) {
      this.sankeyLinks.selectAll("path")
        .attr("d", (d:any) => this.linkSkewed(d))
        .transition(this.transition);

      let fo = this.sankeyLinks.selectAll("foreignObject");
      fo
        .attr('x', (d:any) => {
          if (this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
            return this.scaleHistory(d.target.depth) - (this.scaleHistory(d.target.depth) - this.scaleHistory(d.source.depth) - this.scaleHistory.bandwidth())/2;
          else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
            return this.scaleFuture(d.target.depth) - (this.scaleFuture(d.target.depth) - this.scaleHistory(d.source.depth) - this.scaleHistory.bandwidth())/2;
          return this.scaleFuture(d.target.depth) - (this.scaleFuture(d.target.depth) - this.scaleFuture(d.source.depth) - this.scaleFuture.bandwidth())/2;
        })
        .transition(this.transition);
    }
  }

  clearProvGraphHighlights() {
    d3.select("svg.provGraph").selectAll("rect").attr("class", "");
      // .classed("selected", false)
      // .classed("shiftSelected", false);
    d3.select("svg.provGraph").selectAll("path").attr("class", "");
      // .classed("selected", false)
      // .classed("shiftSelected", false);
  }

  highlightProvGraph(hist: any[], classString: string):void {
    for (let node of hist) {
      let idString = node.id;
      d3.select("svg.provGraph").select("rect#activity" + idString)
        .classed(classString, true);
        // .attr('stroke', 'gray')
        // .attr('stroke-width', '2px');

      let path = d3.select("svg.provGraph").select("path#activity" + idString)
      if(!path.empty() && !path.classed("selected"))
        path.classed(classString, true);
        // .attr("fill", "#a2b9bc")
        // .attr('stroke', 'gray')
        // .attr("fill-opacity", 0.85)
        // .attr('stroke-width', '2px');
    }
  }

  private onContextMenu($event: MouseEvent, item: any, metric: any): void {
    let metricContext = item.metrics[metric];
    if (metricContext) {
      this.contextMenuService.show.next({
        // Optional - if unspecified, all context menu components will open
        contextMenu: this.metricMenu,
        event: $event,
        item: metricContext
      });
    } else {
      this.contextMenuService.show.next({
        contextMenu: this.issueMenu,
        event: $event,
        item: metric
      })
    }
    $event.preventDefault();
    $event.stopPropagation();
    // this.contextMenuService.show.next({
    //   actions: this.menuOptions,
    //   event: $event,
    //   item: item
    // });
  }
}
