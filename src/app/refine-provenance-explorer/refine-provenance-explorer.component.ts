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
  shiftHistId: any;
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
  provWidth: number = 100;
  detailWidth: number = 25;
  detailHeight: number = 45;
  sankeyHeight: number = 55;
  refineHeight: number = 35;
  // absolute widths
  qualityViewWidth: number = 0;
  detailViewWidth: number = 0;
  nodeWidth:number = 36;
  iconWidth:number = 16;
  elementPadding: number = 35;
  innerPadding: number = .8;

  sankeyColorScale: any;

  showDetail: boolean = true;

  @ViewChild('qualityMetric', {static: false}) public metricMenu: ContextMenuComponent;
  @ViewChild('issue', {static: false}) public issueMenu: ContextMenuComponent;

  //@ViewChild('provGraph') 
  provGraph:ElementRef;

  // d3 sankey library
  d3Sankey;
  // this is the graph
  sankeyDiag;
  // these are the d3 elements of the graph
  sankeyNodes;
  sankeyLinks;
  // d3 transition
  transition;

  metricColorScale: string[] = ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081'];

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

          if(this.provenanceOverlayModel && this.provGraph) {
            let graph = this.buildGraph(this.provenanceOverlayModel);
            this.histId = this.provenanceOverlayModel.currentHistoryEntry.localPart;

            this.openRefineService.getHistory(this.projectId)
            .subscribe((history: any) => {
              this.nodeHistory = [];
              this.nodeHistory.push({ id: 0, value: this.provenanceOverlayModel.provenance.entity["history_entry:0"] });
              for (let pastEntry of history.past) {
                this.nodeHistory.push({ id: pastEntry.id, value: this.provenanceOverlayModel.provenance.entity["history_entry:" + pastEntry.id] });
              }
              this.highlightProvGraph(this.nodeHistory, "selectedPath");

              // this.scaleHistory = d3.scaleBand().domain(this.nodeHistory).range([35, parseFloat(this.provGraph.nativeElement.scrollWidth) - 15]).padding(0.8);        

              let ops = [];
              Object.entries(this.provenanceOverlayModel.provenance.activity).forEach((act:any) => {
                if (act[0].includes("change:") && !ops.includes(act[1]["prov:label"]))
                  ops.push(act[1]["prov:label"]);
              });

              // first lets create the sankey
              this.sankeyDiag = d3Sankey.sankey()
                // .nodeWidth(this.nodeWidth)
                .nodePadding(nodePadding)
                .extent([[0, 5], [this.provGraph.nativeElement.scrollWidth - 5, this.provGraph.nativeElement.scrollHeight - (this.iconWidth + nodePadding)]])
                .nodeAlign(d3Sankey.sankeyLeft);

              this.sankeyDiag.nodes(graph.nodes)
                .links(graph.links)
                .nodeId((node:any) => node.key);

              this.setSankeyScale();

              this.sankeyLinks = d3.select("svg.provGraph").append("g")
                // .attr("fill", "none")
                .attr("stroke-opacity", 0.25)
                .classed("links", true)
              .selectAll("g")
              .data(this.sankeyDiag().links)
              .enter().append("g");

              // Define the div for the tooltip
              var div = d3.select("body").append("div")
                .attr("class", "d3tooltip")
                .style("opacity", 0);
              var divChange = d3.select("body").append("div")
                .classed("d3tooltip", true)
                .style("opacity", 0);

              this.sankeyLinks.append("path")
                  .attr("d", (d:any) => this.linkSkewed(d))
                  .attr("class", (d:any) => { 
                    return "activity" + d.target.key.replace("history_entry:","");
                  })
                  .attr("fill", "lightgray")
                  // .attr("stroke", d => "grey")
                  // .attr("fill", d => {
                  //   if (d.wdf) {
                  //     let change = this.provenanceOverlayModel.provenance.activity[d.wdf["prov:activity"]];
                  //     return d3.schemeSet2[ops.indexOf(change["prov:label"])];//this.sankeyColorScale(ops.indexOf(col));
                  //   } 
                  //   return d3.schemePastel2[0];
                  // })
                  .attr("fill-opacity", (d:any) => {
                    // if(this.scaleHistory(d.source.depth))
                      return 0.35;
                    // return 0.2;
                  })
                  .attr("stroke", (d:any) => {
                    if(this.nodeHistory.map(node => node.id).includes(parseInt(d.target.key.replace("history_entry:",""))) ||
                      (this.shiftNodeHistory && this.shiftNodeHistory.map(node => node.id).includes(parseInt(d.target.key.replace("history_entry:","")))))
                      return "gray";
                    else
                      return null;
                  })
                  .attr("stroke-width", 2);
                  
              this.sankeyLinks.append("svg:foreignObject")
                .classed("change", true)
                .html((d:any) => {
                  let change = this.provenanceOverlayModel.provenance.activity[d.wdf["prov:activity"]];
                  let htmlText = "<span>";
                  // if (d.source.sourceLinks && d.source.sourceLinks.length === 1) {
                    htmlText += '<i class="fa fa-1x ' + iconCodes.default[change["prov:label"]] + '"></i></span>'; //iconCodes.default[d.entity["prov:label"]]
                    return htmlText;
                  // } else {
                  //   // remove all other 
                  //   return '<i class="fa fa-1x fa-ellipsis-v"></i>';
                  // }
                })
                .attr('x', (d:any) => {
                  if(this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
                    return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleHistory(d.target.depth))(.85) - this.nodeWidth/4;
                  else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
                    return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleFuture(d.target.depth))(.85) - this.nodeWidth/4;
                  else if (this.scaleFuture(d.source.depth))
                    return d3.interpolate(this.scaleFuture(d.source.depth)+this.scaleFuture.bandwidth(), this.scaleFuture(d.target.depth))(.85) - this.nodeWidth/4;
                })
                .attr('y', (d:any) => {
                  // if (d3.interpolate(d.target.y1, d.target.y0)(.5) > d.target.y1)
                    return d3.interpolate(d.target.y1, d.target.y0)(.5) - this.nodeWidth/4;
                  // return 0;
                })
                .on("mouseover", (data:any) => {
                  let ent = this.provenanceOverlayModel.provenance.entity[data.wdf["prov:generatedEntity"]];
                  let text = "<span><b>Operation:</b> "+ ent["prov:value"].$ +"</span>";
                  divChange.html(text)
                    .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                  divChange.transition()
                    .duration(100)
                    .style("opacity", .9);
                  div.style("opacity", 0);
                })
                .on("mousemove", (data:any) => {
                  divChange
                    .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", (data:any) => {
                  divChange.transition()
                    .duration(100)
                    .style("opacity", 0);
                  div.style("opacity", 0);
                });
              // these are the facets
              this.sankeyLinks.filter((link: any) => this.provenanceOverlayModel.provenance.activity["facet:" + link.target.key.replace("history_entry:","")]).append("svg:foreignObject")
                .classed("facet", true)
                .attr('x', (d:any) => {
                    if(this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
                      return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleHistory(d.target.depth))(.5) - this.nodeWidth/4;
                    else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
                      return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleFuture(d.target.depth))(.5) - this.nodeWidth/4;
                    else if (this.scaleFuture(d.source.depth))
                      return d3.interpolate(this.scaleFuture(d.source.depth)+this.scaleFuture.bandwidth(), this.scaleFuture(d.target.depth))(.5) - this.nodeWidth/4;
                  })
                .attr('y', (d:any) => {
                  return d.source.y1;
                })
                .html((d:any) => '<i class="fa fa-1x fa-filter"></i> ')
                .on("mouseover", (data:any) => {
                  let id = data.target.key.replace("history_entry:","");
                  let facet:any[] = [].concat(this.provenanceOverlayModel.provenance.activity["facet:" + id]);
                  if(facet) {}
                  let text: string[] = [];
                  let htmlText = "";
                  for (let f of facet) {
                    text = text.concat(Object.entries(f)
                      .map((d:any) => { 
                        if (d[0].includes("facet:_")) {
                          if(d[1].$ == "true") {
                            return d[0].replace("facet:_","");
                          } else if (d[1].$ == "false")
                          {
                            // do nothing
                          }
                          else {
                            return d[0].replace("facet:_", "") + ": " + d[1].$;
                          }
                        }
                        if (d[0].includes("facet:")) {
                          if(d[1].$ == "true") {
                            return d[0].replace("facet:","");
                          } else if (d[1].$ == "false")
                          {
                            // do nothing
                          }
                          else {
                            return d[0].replace("facet:", "") + ": " + d[1].$;
                          }
                          // return d[0].replace("facet:", "") + ": " + d[1].$
                        }
                      }).filter(d => d != null));
                      div.transition()
                        .duration(100)
                        .style("opacity", .9);
                    htmlText += "<span><b>Filter " + f["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>";
                  }
                  // if(facet["other:" + id]) {
                  div.html(htmlText)//"<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                      .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");

                  // }
                  divChange.style("opacity", 0);
                  return text;
                })
                .on("mousemove", (data:any) => {
                  div
                    .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", (d:any, i, el:any[]) => {
                  div.transition()
                    // .duration(100)
                    .style("opacity", 0);
                });

              this.sankeyLinks.selectAll("path").on("mouseover", (data:any, i, el:any[]) => {
                let id = data.target.key.replace("history_entry:","");
                d3.select(el[i].parentNode).raise();

                let change = this.provenanceOverlayModel.provenance.entity[data.wdf["prov:generatedEntity"]];
                let text = "<span><b>Operation:</b> "+ change["prov:value"].$ +"</span>";
                divChange.html(text)
                  .style("top", (d3.event.pageY - 28) + "px")
                  .style("left", (d3.event.pageX - div.node().scrollWidth) + "px");
                divChange.transition()
                  .duration(100)
                  .style("opacity", .9);

                if(this.provenanceOverlayModel.provenance.activity["facet:" + id]) {
                  // let facet = this.provenanceOverlayModel.provenance.activity["facet:" + id];
                  let htmlText = "";
                  let textFacet: string[] = [];
                  let facet:any[] = [].concat(this.provenanceOverlayModel.provenance.activity["facet:" + id]);
                  for (let f of facet) {
                    textFacet = textFacet.concat(Object.entries(f)
                      .map((d:any) => { 
                        if (d[0].includes("facet:_")) {
                          if(d[1].$ == "true") {
                            return d[0].replace("facet:_","");
                          } else if (d[1].$ == "false")
                          {
                            // do nothing
                          }
                          else {
                            return d[0].replace("facet:_", "") + ": " + d[1].$;
                          }
                        }
                        if (d[0].includes("facet:")) {
                          if(d[1].$ == "true") {
                            return d[0].replace("facet:","");
                          } else if (d[1].$ == "false")
                          {
                            // do nothing
                          }
                          else {
                            return d[0].replace("facet:", "") + ": " + d[1].$;
                          }
                          // return d[0].replace("facet:", "") + ": " + d[1].$
                        }
                      }).filter(d => d != null));
                      div.transition()
                        .duration(100)
                        .style("opacity", .9);
                    htmlText += "<span><b>Filter " + f["other:" + id].$ + " rows</b></span><br><span>" + textFacet.join("<br>") + "</span>";
                  }
                  div.html(htmlText)//"<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                      .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  // let text = Object.entries(facet)
                  //   .map((d:any) => { 
                  //     if (d[0].includes("facet:_"))
                  //       return d[0].replace("facet:_", "") + ": <i>" + d[1].$.split(",").join("<br>") + "</i>";
                  //     if (d[0].includes("facet:"))
                  //       return d[0].replace("facet:", "") + ": " + d[1].$.split(",").join("<br>") + "</i>";
                  //   }).filter(d => d != null);
                  
                  // // "test test test".split(",").join()
                  // if(facet["other:" + id]) {
                  //   div.html("<span><b>Filter " + facet["other:" + id].$ + " rows</b></span><br><span>" + text.join("<br>") + "</span>")
                  //     .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                  //     .style("top", (d3.event.pageY - 28 - div.node().scrollHeight) + "px");
                  // }
                  div.transition()
                    .duration(100)
                    .style("opacity", .9);
                  return text;
                }
              })
              .on("mousemove", (data:any) => {
                div
                  .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                  .style("top", (d3.event.pageY - 28 - div.node().scrollHeight) + "px");
                divChange
                  .style("left", (d3.event.pageX - div.node().scrollWidth) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
                })
              .on("mouseout", (d:any, i, el:any[]) => {
                div.transition()
                  // .duration(100)
                  .style("opacity", 0);
                divChange.transition()
                  // .duration(100)
                  .style("opacity", 0);
              });

              // -1 prevents drawing of color white
              this.sankeyColorScale = d3.scaleSequential(d3.interpolateBlues).domain([-1, ops.length]);
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
                .attr("class", "history_nodes");

              this.sankeyNodes.append("rect")
                  .attr("id", (data:any) => {
                    return data.key.replace(":","");
                  })
                  .attr("x", (d:any) => {
                    if(this.scaleHistory(d.depth))
                      return this.scaleHistory(d.depth);
                    else
                      return this.scaleFuture(d.depth);
                  })
                  .attr("y", (data:any) => data.y0)
                  .attr("height", (data:any) => {
                    return data.y1 - data.y0
                  })
                  .attr("width", (d:any) => {
                    if(this.scaleHistory(d.depth)) {
                      if (d.activity)
                        return this.scaleHistory.bandwidth()/2;
                      return this.scaleHistory.bandwidth();
                    }
                    return this.scaleFuture.bandwidth();
                  })
                  .attr("stroke", "none")
                  .attr("fill", (d:any) => {
                    return "lightgray";
                  });

              this.sankeyNodes.on("mouseover", (data:any) => {
                  div.transition()
                    .duration(100)
                    .style("opacity", .9);
                  // let id = data.key.replace("history_entry:","")

                  let datasetRows = this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + data.key.replace("history_entry:","")]
                  // if (data.entity) {
                    div.html("<span>Rows: "+ datasetRows.$ +"</span>")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mousemove", (data:any) => {
                  div
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", (d:any) => {
                  div.transition()
                    .duration(100)
                    .style("opacity", 0);
                })
                .on("click", (data:any, index:number, entries:any[]) => {
                  if (data.entity) {
                    let histIdClicked = data.key.replace("history_entry:", "");
                    if (d3.event.shiftKey) {
                      this.shiftHistId = histIdClicked;
                      // we need to remove the previously shift selected path
                      this.clearProvGraphHighlights();

                      this.shiftNodeHistory = this.determineNodeHistory(histIdClicked);
                      this.setSankeyScale();
                      this.highlightProvGraph(this.nodeHistory, "selectedPath")
                      this.highlightProvGraph(this.shiftNodeHistory, "shiftSelectedPath");
                      d3.select("svg.provGraph g.nodes").select("rect#history_entry" + histIdClicked)
                        .classed("shiftSelectedNode", true);
                    } else {
                      this.shiftHistId = null;
                      this.histId = histIdClicked;
                      this.clearProvGraphHighlights();
                      this.shiftNodeHistory = []
                      this.nodeHistory = this.determineNodeHistory(histIdClicked);
                      this.setSankeyScale();
                      this.highlightProvGraph(this.nodeHistory, "selected");
                      d3.select("svg.provGraph g.nodes").select("rect#history_entry" + histIdClicked)
                        .classed("selectedNode", true);
                    }
                  }
                });

              this.highlightProvGraph(this.nodeHistory, "selected");
              this.loadFinished = true;
            });
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  buildGraph(provenanceOverlayModel: any):any {
    let links:any[] = [];

    // nodes are the history entries, stored as entities
    let nodeEntries:any[] = Object.entries(provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('history_entry'));

    for (let wdf of Object.values(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      let value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:usedEntity"]).length;
      let endValue = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:generatedEntity"]).length;
      if (endValue == 0)
        value = 1;

      if (wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality")) {
        links.push({
          source: wdf["prov:usedEntity"],
          target: wdf["prov:generatedEntity"],
          // generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
          out: null,
          in: null,
          value: 1,
          // depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
          wdf: wdf
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
      });
      
      let rowSize = 0;
      let histInfo = this.provenanceOverlayModel.provenance.entity["project_info:dataset"]["other:" + entry[0].replace("history_entry:","")];
      if(histInfo)
        rowSize = parseInt(histInfo.$);
      nodes.push({key: entry[0], value: rowSize, entity: entry[1], depth: 2});
    }

    // for (let activity of Object.entries(this.provenanceOverlayModel.provenance.activity).filter((a: any) => a[0].includes("facet:"))) {
    //   let id = activity[0].replace("facet:", "");
    //   let rowSize = 0;
    //   if (activity[1]["other:"+id])
    //     rowSize = parseInt(activity[1]["other:"+id].$);

    //   nodes.push({
    //     key: activity[0],
    //     value: rowSize,
    //     activity: activity[1]
    //   })
    // }

    let graph = {
      nodes: nodes,
      links: links
    };
    return graph;
  }

  linkSkewed(d: any): any {
    var curvature = .6;
    let id = parseInt(d.target.key.replace("history_entry:",""));
    let facet = [].concat(this.provenanceOverlayModel.provenance.activity["facet:" + id]);
    // var x0 = d.source.x1,
    //     x1 = d.target.x0;
    let x0 = this.scaleHistory(d.source.depth) + this.scaleHistory.bandwidth(),
        x1 = this.scaleHistory(d.target.depth);
    if (this.scaleHistory(d.source.depth) && d.source.activity) {
      x0 -= (this.scaleHistory.bandwidth()/2);
    } else if (this.scaleFuture(d.source.depth) && d.source.activity) {
      x0 -= (this.scaleFuture.bandwidth()/2);
    }
    if (!x0)
      x0 = this.scaleFuture(d.source.depth) + this.scaleFuture.bandwidth();
    if (!x1)
      x1 = this.scaleFuture(d.target.depth);
    
    let xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y0,
        y1 = d.target.y0;

    let path =  "M" + x0 + "," + y0
    
    if (facet[0] && facet[0]["other:"+id]) {
      let heightRatio = parseInt(facet[0]["other:"+id].$)/d.source.value;
      path += "C" + xi(.2) + "," + y0
        + " " + xi(.3) + "," + (y0+ (d.source.y1 - d.source.y0)*(1-heightRatio))
        + " " + xi(.5) + "," + (y0+ (d.source.y1 - d.source.y0)*(1-heightRatio))
        + "L" + xi(.5) + "," + (y0+ (d.source.y1 - d.source.y0)*(1-heightRatio))
        + "C" + xi(.7) + "," + (y0+ (d.source.y1 - d.source.y0)*(1-heightRatio))
        + " " + xi(.8) + "," + y1
        + " " + x1 + "," + y1
        + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
        + "C" + xi(.8) + "," + (y1+ (d.target.y1 - d.target.y0))
        + " " + xi(.7) + "," + (y0+ (d.source.y1 - d.source.y0))
        + " " + xi(.5) + "," + (y0+ (d.source.y1 - d.source.y0))
        + "L" + xi(.5) + "," + (y0+ (d.source.y1 - d.source.y0));
    }
    // if (facet) {
    //   // facet calculations
    //   let xMiddle = xi(.5);
    //   x2 = xi(curvature*.5),
    //   x3 = xi(1 - curvature*.5),
    //   // console.log((y1-y0)*(parseInt(facet["other:"+id].$)/d.source.value));
    //   // console.log((y1+(y1-y0)*(parseInt(facet["other:"+id].$)/d.source.value)));
    //   path += "C" + x2 + "," + y0
    //     + " " + xMiddle + "," + (y0+(d.source.y1-d.source.y0)*(parseInt(facet["other:"+id].$)/d.source.value)) //(x2 + this.scaleHistory.bandwidth()/2)
    //     + " " + x1 + "," + y1;
    // } else {
    else{
      path += "C" + x2 + "," + y0
        + " " + x3 + "," + y1
        + " " + x1 + "," + y1
        + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
        + "C" + x3 + "," + (y1+ (d.target.y1 - d.target.y0))
        + " " + x2 + "," + (y0+ (d.source.y1 - d.source.y0))
        + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
        + "L" + x0 + "," + y0;
    }
    // }
    return path
        + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
        + "L" + x0 + "," + y0;
    // return "M" + x0 + "," + y0
    //      + "C" + x2 + "," + y0
    //      + " " + x3 + "," + y1
    //      + " " + x1 + "," + y1
    //      + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
    //      + "C" + x3 + "," + (y1+ (d.target.y1 - d.target.y0))
    //      + " " + x2 + "," + (y0+ (d.source.y1 - d.source.y0))
    //      + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
    //      + "L" + x0 + "," + y0;
  }

  determineNodeHistory(historyId: any):any[] {
    // let histories = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => { if (entity[0].includes("history_entry:")) return entity; });
    let nodeHistory = [];
    let parent = "history_entry:" + historyId;
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
    let maxDepth = 0;
    this.sankeyDiag().nodes.forEach((node: any) => {
      if (node.depth > maxDepth)
        maxDepth = node.depth;
    });
    let depths:any[] = this.sankeyDiag().nodes.filter((node: any, i: number, nodesArray: any[]) => {
      let mapNode = this.nodeHistory.find((mapNode:any) => {
        return mapNode.id === parseInt(node.key.replace("history_entry:", "")) || mapNode.id === parseInt(node.key.replace("facet:", ""));
      });
      if (mapNode) {
        mapNode.depth = node.depth;
        return true;
      }
        // return .includes(parseInt(node.key.replace("history_entry:","")));
      })
      .map(node => node.depth).sort(this.numericSort);
    if (depths[depths.length-1] < maxDepth)
      depths.push(-1);
    if(this.showDetail)
      this.scaleHistory = d3.scaleBand().domain(depths).range([this.elementPadding, parseFloat(this.provGraph.nativeElement.scrollWidth)*((this.provWidth-this.detailWidth)/100) - this.elementPadding]).paddingInner(this.innerPadding);
    else
      this.scaleHistory = d3.scaleBand().domain(depths).range([this.elementPadding, parseFloat(this.provGraph.nativeElement.scrollWidth)*.8 - this.elementPadding]).paddingInner(this.innerPadding);

    let depthsFuture = [];
    depthsFuture.push(-1);
    this.sankeyDiag().nodes.forEach(node => {
      if (!depths.includes(node.depth) && !depthsFuture.includes(node.depth))
        depthsFuture.push(node.depth);
    });
    depthsFuture.sort(this.numericSort);
    
    let futureWidth
    if (this.showDetail && depthsFuture.length < depths.length-1)
      futureWidth = this.scaleHistory(depths[depths.length-2]) + this.scaleHistory.step()*(depthsFuture.length-1);//this.provGraph.nativeElement.scrollWidth - (this.scaleHistory(depths[depths.length-2]) + this.scaleHistory(depths[depths.length-(depthsFuture.length)]) - this.scaleHistory(depths[depths.length-(depthsFuture.length+1)]) - this.elementPadding);
    else
      futureWidth = this.provGraph.nativeElement.scrollWidth;
    this.scaleFuture = d3.scaleBand().domain(depthsFuture).range([this.scaleHistory(depths[depths.length-2]) + this.scaleHistory.bandwidth(), futureWidth]).paddingInner(this.innerPadding);
    // let nodes = d3.select("svg.provGraph").selectAll("g.nodes").selectAll("g.history_nodes");

    if(depths[depths.length-1] === -1) {
      this.qualityViewWidth = this.scaleHistory(depths[depths.length-2]) + this.scaleHistory.bandwidth();
      this.detailViewWidth = parseFloat(this.provGraph.nativeElement.scrollWidth) - this.scaleHistory(depths[depths.length-2]) - 2*this.scaleHistory.bandwidth();
    } else {
      this.qualityViewWidth = this.scaleHistory(depths[depths.length-1]) + this.scaleHistory.bandwidth();
      this.detailViewWidth = parseFloat(this.provGraph.nativeElement.scrollWidth)*(this.detailWidth/100) - this.scaleHistory.bandwidth();
    }
    // we don't want the detail view to be to wide
    // if (this.detailViewWidth > this.provGraph.nativeElement.scrollWidth * 0.35) {
    //   this.detailViewWidth = this.provGraph.nativeElement.scrollWidth * 0.35;
    // }

    if (this.sankeyNodes) {
      this.sankeyNodes.selectAll("rect")
        .attr("x", (d:any) => {
          if(this.scaleHistory(d.depth))
            return this.scaleHistory(d.depth);
          else
            return this.scaleFuture(d.depth);
        })
        .attr("width", (d:any) => {
          if(this.scaleHistory(d.depth)) {
            if (d.activity)
              return this.scaleHistory.bandwidth()/2;
            return this.scaleHistory.bandwidth();
          }
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
          
          if (w > this.iconWidth)
            return (w - this.iconWidth)/2 + 'px';

          return '0px';
        })

    }
    if (this.sankeyLinks) {
      this.sankeyLinks.selectAll("path")
        .attr("d", (d:any) => this.linkSkewed(d))
        // .attr("class", (d:any) => { 
        //   return "activity" + d.activity.replace("change:","");
        // })
        .attr("stroke", (d:any) => {
          if(this.nodeHistory.map(node => node.id).includes(parseInt(d.target.key.replace("history_entry:",""))) ||
            (this.shiftNodeHistory && this.shiftNodeHistory.map(node => node.id).includes(parseInt(d.target.key.replace("history_entry:","")))))
            return "gray";
          else
            return null;
        })
        .transition(this.transition);

      this.sankeyLinks.selectAll("foreignObject.change")
        .attr('x', (d:any) => {
          if(this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
            return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleHistory(d.target.depth))(.85) - this.nodeWidth/4;
          else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
            return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleFuture(d.target.depth))(.85) - this.nodeWidth/4;
          else if (this.scaleFuture(d.source.depth))
            return d3.interpolate(this.scaleFuture(d.source.depth)+this.scaleFuture.bandwidth(), this.scaleFuture(d.target.depth))(.85) - this.nodeWidth/4;
        });

      this.sankeyLinks.selectAll("foreignObject.facet")
        .attr('x', (d:any) => {
            if(this.scaleHistory(d.source.depth) && this.scaleHistory(d.target.depth))
              return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleHistory(d.target.depth))(.5) - this.nodeWidth/4;
            else if (this.scaleHistory(d.source.depth) && this.scaleFuture(d.target.depth))
              return d3.interpolate(this.scaleHistory(d.source.depth)+this.scaleHistory.bandwidth(), this.scaleFuture(d.target.depth))(.5) - this.nodeWidth/4;
            else if (this.scaleFuture(d.source.depth))
              return d3.interpolate(this.scaleFuture(d.source.depth)+this.scaleFuture.bandwidth(), this.scaleFuture(d.target.depth))(.5) - this.nodeWidth/4;
          })
    }
  }

  clearProvGraphHighlights() {
    // d3.select("svg.provGraph").selectAll("nodes").classed("selected", false).classed("shiftSelected", false);
      // .classed("selected", false)
      // .classed("shiftSelected", false);
    d3.selectAll("svg.provGraph g.nodes g.history_nodes rect")
      .classed("selected", false)
      .classed("shiftSelected", false)
      .classed("selectedNode", false)
      .classed("shiftSelectedNode", false)
      .classed("selectedPath", false)
      .classed("shiftSelectedPath", false);
      // .classed("selected", false)
      // .classed("shiftSelected", false);
  }

  highlightProvGraph(hist: any[], classString: string):void {
    for (let node of hist) {
      let idString = node.id;
      d3.select("svg.provGraph g.nodes").select("rect#history_entry" + idString)
        .classed(classString, true);
        // .attr('stroke', 'gray')
        // .attr('stroke-width', '2px');

      // let path = d3.selectAll("path.activity" + idString)
      // if(!path.empty())// && !path.classed("selected"))
      //   path.classed(classString, true);
        // .attr("fill", "#a2b9bc")
        // .attr('stroke', 'gray')
        // .attr("fill-opacity", 0.85)
        // .attr('stroke-width', '2px');
    }
    d3.select("svg.provGraph g.nodes").select("rect#history_entry" + this.histId)
      .classed("selectedNode", true);
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
  
  @ViewChild('provGraph', {static: false}) set content(content: ElementRef) {
    this.provGraph = content;
    console.log("set graph");
    if(this.provGraph && this.provenanceOverlayModel) {
      this.setSankeyScale();
    }
  }

  toggleShowDetail() {
    this.showDetail = !this.showDetail;
    // if (this.showDetail)
    //   this.provWidth = this.pageWidth - this.detailWidth;
    // else 
    //   this.provWidth = this.pageWidth;
    // this.nodeHistory = this.determineNodeHistory(this.histId);
    this.setSankeyScale();
  }

  private numericSort(a: number, b: number): number {
      if (a > b)
        return 1;
      if (a < b)
        return -1;
      return 0;
  }
}
