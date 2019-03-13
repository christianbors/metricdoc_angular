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

  pageWidth: number = 100;
  detailHeight: number = 40;
  sankeyHeight: number = 25;
  refineHeight: number = 35;

  @ViewChild('provGraph')
  elHeight:ElementRef;

  d3Sankey;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService,
    private domSanitizer : DomSanitizer) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.getOpenRefineProject();

    this.refineProjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:3333/project?project=" + this.projectId);
    this.openRefineService.getProjectMetadata(this.projectId)
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

  getOpenRefineProject() {
    let nodeWidth:number = 15;
    let iconPadding:number = 4;
    let iconHeight:number = 12;
    let nodePadding:number = iconPadding*2 + iconHeight;

    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];

          if(this.provenanceOverlayModel) {
            let graph = this.buildGraph(this.provenanceOverlayModel);
            this.histId = this.provenanceOverlayModel.currentHistoryEntry.localPart;

            // let sankeyDiag = this.d3Sankey.computeNodeValues();
            let sankeyDiag = d3Sankey.sankey()
              .nodeWidth(nodeWidth)
              .nodePadding(nodePadding)
              .extent([[1, 1], [this.elHeight.nativeElement.scrollWidth, this.elHeight.nativeElement.scrollHeight - (iconHeight + nodePadding)]])
              .nodeAlign(d3Sankey.sankeyLeft);

            sankeyDiag.nodes(graph.nodes)
              .links(graph.links)
              .nodeId((node:any) => node.key);

            const link = d3.select("svg.provGraph").append("g")
              .attr("fill", "none")
              .attr("stroke-opacity", 0.25)
            .selectAll("g")
            .data(sankeyDiag().links)
            .enter().append("g");

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
              .attr("class", "d3tooltip")
              // .attr("[ngStyle]", "tooltip")
              .style("opacity", 0);

            link.append("path")
                .attr("d", (d:any) => this.linkSkewed(d))
                .attr("id", (d:any) => { 
                  return "activity" + d.activity.replace("change:","");
                })
                // .attr("stroke", d => "grey")
                .attr("fill", d => "grey")
                .attr("fill-opacity", 0.25)
                // .attr("stroke-width", (d:any) => Math.max(1, d.width))
              // .append("title")
            link.append("svg:foreignObject")
                // .attr("x", 10)
                // .attr("y", 10)
                .attr('x', (d:any) => d.target.x0 - (d.target.x0 - d.source.x1)/2)
                .attr('y', (d:any) => {
                  return d.y1 - (d.y1-d.y0)/2; // - (d.source.y1 - (d.source.height/2)/2)
                })
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                .attr('font-family', 'Font Awesome 5 Free')
                .attr('fill', 'black')
                .attr('font-weight', 900)
                .attr('font-size', iconHeight + 'px')
                .attr('overflow', 'visible')
              .html((d:any) => {
                if(this.provenanceOverlayModel.provenance.activity["facet:" + d.activity.replace("change:", "")]) {
                  return '<i class="fa fa-1x fa-chart-bar"></i>';
                }
              });
            link.on("mouseover", (data:any) => {
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
            let sankeyColorScale = d3.scaleSequential(d3.interpolateViridis);
            let scale = d3.scaleOrdinal(d3.schemeCategory10).domain(ops);

            let cols:any = {};
            for(let k of Object.keys(this.provenanceOverlayModel.provenance.entity)) {
              if(k.includes("column:"))
                cols[k] = this.provenanceOverlayModel.provenance.entity[k];
            }

            d3.select("svg.provGraph").append("g")
              .attr("stroke", "#000")
            .selectAll(".history_nodes")
            .data(sankeyDiag().nodes)
            .enter().append("g")
              .attr("class", "history_nodes")
              .attr("height", (d:any) => d.y1 - d.y0)
              .attr("width", (d:any) => d.x1 - d.x0)
              .each((data: any, idx: number, node:any) => {
                let activityId = data.key.replace("history_entry:", "");
                let nodeHeight:number = data.y1 - data.y0;
                // if(data.x1)
                  // let nodeWidth:number = data.x1 - data.x0;
                // nodeWidth;

                d3.select(node[idx])
                  .append("rect")
                    .attr("id", "activity" + activityId)
                    .attr("x", (d:any) => { 
                      if(d.x0) 
                        return d.x0 
                      else 
                        return 0 
                    })
                    .attr("y", data.y0)
                    .attr("height", data.y1 - data.y0)
                    .attr("width", nodeWidth)
                    .attr("stroke", "none")
                    .attr("fill", (d:any) => {
                      let col = d.entity["prov:label"];
                      return scale(col);
                    });
                d3.select(node[idx])
                  .append('svg:foreignObject')
                    .attr("x", (d:any) => { 
                      if(d.x0) 
                        return d.x0 
                      else 
                        return 0 
                    })
                    .attr('y', (d:any) => d.y1)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'central')
                    .attr('font-family', 'Font Awesome 5 Free')
                    .attr('fill', 'black')
                    .attr('font-weight', 900)
                    .attr('font-size', iconHeight + 'px')
                    .attr('overflow', 'visible')
                    // .attr('height', '100%')
                    // .attr('width', '100%')
                  // .attr('fill', 'black')
                  // .attr('stroke', 'none')
                  .html('<i class="fa fa-1x ' + iconCodes.default[data.entity["prov:label"]] + '"></i>');
                  //<title>' + data.entity["prov:label"] + '</title></i>'); //fa-money-bill

                let a = node.activity;
              })
              .on("mouseover", (data:any) => {
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
                }
              });

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
                this.loadFinished = true;
              });
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  buildGraph(provenanceOverlayModel: any):any {
    let links:any[] = [];

    let historyEntries = Object.keys(provenanceOverlayModel.provenance.entity).filter((key: string) => {
      if (key.includes('history_entry')) {
        provenanceOverlayModel.provenance.entity[key].depth = 0;
        return true;
      } else {
        return false;
      }
    });

    for (let key of Object.keys(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      if (provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:usedEntity"]) {
        let used = provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:usedEntity"];
        let gen = provenanceOverlayModel.provenance.wasDerivedFrom[key]["prov:generatedEntity"];
        provenanceOverlayModel.provenance.entity[gen].depth = provenanceOverlayModel.provenance.entity[used].depth + 1;
      }
    }

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
            depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
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

      nodes.push({key: entry[0], value: value, entity: entry[1], depth: entry[1].depth});
    }

    let graph = {
      nodes: nodes,
      links: links
    };
    return graph;
  }

  linkSkewed(d: any): any {
    var curvature = .6;
    var x0 = d.source.x1,
        x1 = d.target.x0,
        xi = d3.interpolateNumber(x0, x1),
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
      nodeHistory.splice(0, 0, { id: parent.replace("history_entry:", ""), value: this.provenanceOverlayModel.provenance.entity[parent] });
      let wdfParent = Object.values(this.provenanceOverlayModel.provenance.wasDerivedFrom).find((wdf: any) => {
        return wdf["prov:generatedEntity"] == parent;
      });
      if (!wdfParent["prov:usedEntity"])
        parent = null;
      parent = wdfParent["prov:usedEntity"];
      // nodeHistory.push(this.provenanceOverlayModel.provenance.entity[parent["prov:generatedEntity"]]);
    }    
    return nodeHistory;
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
      let idString = node.id.replace("history_entry:", "");
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
        contextMenu: this.existingMenu,
        event: $event,
        item: metricContext
      });
    } else {
      this.contextMenuService.show.next({
        contextMenu: this.newMenu,
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
