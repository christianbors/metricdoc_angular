import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OpenRefineService }                from './../shared/open-refine/open-refine.service';
import { OpenRefineProject }                from './../shared/open-refine/model/open-refine-project';
import { ProjectMetadata }                  from './../shared/open-refine/model/project-metadata';
import { ProvenanceOverlayModel }           from './../refine-provenance/model/provenance-overlay-model';

import * as d3 from 'd3';

@Component({
  selector: 'app-refine-provenance-explorer',
  templateUrl: './refine-provenance-explorer.component.html',
  styleUrls: ['./refine-provenance-explorer.component.sass'],
  providers: [ OpenRefineService ]
})
export class RefineProvenanceExplorerComponent implements OnInit {

  errorMessage: string;
  projectId: string;
  projectMetadata: ProjectMetadata;
  openRefineProject: OpenRefineProject;
  provenanceOverlayModel: any;

  d3Sankey;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService) {
    this.d3Sankey = require("d3-sankey");
  }

  ngOnInit() { 
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.getOpenRefineProject();
    this.openRefineService.getProjectMetadata(this.projectId)
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

  getOpenRefineProject() {
    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];

          if(this.provenanceOverlayModel) {
            let graph = this.buildGraph(this.provenanceOverlayModel);
            // let entities = Object.values(this.provenanceOverlayModel.provenance.entity);
            // let data = {
            //   nodes: entities,
            //   links: this.provenanceOverlayModel.provenance
            // }

            let sankeyDiag = this.d3Sankey.sankey()
              .nodeWidth(15)
              .nodePadding(10)
              .extent([[1, 1], [1000, 600]])
              .nodeAlign(this.d3Sankey.sankeyLeft);

            sankeyDiag.nodes(graph.nodes)
              .links(graph.links)
              .nodeId((node:any) => node.key);

            sankeyDiag().nodes.forEach((node: any) => {
              node.value = 1;
            });

            const link = d3.select("svg.sankey").append("g")
              .attr("fill", "none")
              .attr("stroke-opacity", 0.35)
            .selectAll("g")
            .data(sankeyDiag().links)
            .enter().append("g");

            link.append("path")
                // .attr("d", this.d3Sankey.sankeyLinkHorizontal())
                .attr("d", this.linkSkewed)
                // .attr("stroke", d => "grey")
                .attr("fill", d => "grey")
                .attr("fill-opacity", 0.35)
                // .attr("stroke-width", (d:any) => Math.max(1, d.width))
                .append("title")
              .text((d:any) => {
                return `${d.key}`;
              });
            // link.append("path")
            //   .attr("d", this.d3Sankey.sankeyLinkHorizontal())
            //   .attr("stroke", d => "grey")
            //   .attr("stroke-opacity", 0.35)
            //   .attr("stroke-width", (d:any) => Math.max(1, d.width));

            // nest columns so stacking works properly
            // let nested = d3.nest()
            //   .key((d:any) => { return d[0]})
            //   .key((d:any) => { return d[1]});
            
            let stackMetric = d3.stack()
              .keys((d:any) => { return Object.entries(d.metrics) })
              .value((d:any, key:any) => {
                let val:any[] = Object.values(d.metrics).filter((m: any) => {
                  return m.type === key;
                });
                return val[0].$;
              });

            d3.select("svg.sankey").append("g")
              .attr("stroke", "#000")
            .selectAll(".history_nodes")
            .data(sankeyDiag().nodes)
            .enter().append("g")
              .attr("class", "history_nodes")
              // .attr("x", (d:any) => d.x0)
              // .attr("y", (d:any) => d.y0)
              // .attr("height", (d:any) => d.y1 - d.y0)
              // .attr("width", (d:any) => d.x1 - d.x0)
              // .attr("fill", "none") //d3.schemeCategory10[0]
              .each((data: any, idx: number, node:any) => {  
                let activityId = data.key.substring(14);
                let nodeHeight:number = data.y1 - data.y0;
                let nodeWidth:number = data.x1 - data.x0;

                let cols:any[] = Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('column:'));
                let colMetrics:any[] = [];
                let mNames:string[] = [];
                cols.forEach((v:any) => {
                  let qEntry = v[1]["quality:"+activityId];
                  if(qEntry) {
                    colMetrics.push({column: v[0], metrics: qEntry});
                    for(let m of qEntry) {
                      if(!mNames.includes(m.type))
                        mNames.push(m.type);
                    }
                  }
                })

                let stack = stackMetric.keys(mNames)(colMetrics); //.keys(colNames)
                let maxVal:any = d3.max(stack, (d:any) => { return d3.max(d, (row:any) => { return row[1] }) });
                let scaleY = d3.scaleLinear().rangeRound([nodeHeight, 0]).domain([0, maxVal]);
                
                d3.select(node[idx])
                  .selectAll(".metric")
                  .data(stack)
                .enter().append("g")
                  .attr("class", "metric")
                  .attr("fill", "none")
                  .attr("transform", "translate(0," + data.y0 + ")")
                  // .attr("fill", (d:any) => { return z(d.type)})
                .selectAll("rect")
                .data((d:any) => {return d})
                .enter().append("rect")
                  .attr("x", data.x0)
                  .attr("y", (d:any) => { return scaleY(d[1]); })
                  .attr("height", (d:any) => { return scaleY(d[0]) - scaleY(d[1]); })
                  .attr("width", nodeWidth);

                // d3.select(node[idx])
                //   .selectAll("g")
                //   .data(cols)
                // .enter().append("g")
                //   .attr("class", (d:any) => d[0])
                //   .each((d:any, idx:any, grp:any[]) => {
                    
                //     d3.select(grp[idx])
                //       .selectAll("rect")
                //       .data(st)
                //       .enter().append("rect")
                //       .attr("height", nodeHeight/grp.length)
                //       .attr("width", nodeWidth-2)
                //       .attr("stroke", "black")
                //       .attr("stroke-width", 1);
                //   });
                let a = node.activity;

              })
            .append("title")
              .text((d:any) => `${d.key}`);
            d3.select("svg.sankey").append("g")
              .attr("class", "nodesText")
              .style("font", "10px sans-serif")
            .selectAll("text")
            .data(sankeyDiag().nodes)
            .enter().append("text")
              .attr("x", (d:any) => d.x0)
              .attr("y", (d:any) => d.y1 + 8)
              .attr("dy", "0.35em")
              .attr("text-anchor", (d:any) => "start")
              .text((d:any) => d.entity["prov:label"]);
            
            d3.select("svg.sankey").append("g")
              .attr("class", "linksText")
              .style("font", "10px sans-serif")
            .selectAll("text")
            .data(sankeyDiag().links)
            .enter().append("text")
              .attr("x", (d:any) => 
                (d.source.x1 + d.target.x1)/2)
              .attr("y", (d:any) => (d.y0 + d.y1)/2)
              .attr("dy", "0.35em")
              .attr("text-anchor", (d:any) => "start")
              .text((d:any) => d.value);
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
      
      /*
      if (provenanceOverlayModel.provenance.activity[rev].depth) {
        ++provenanceOverlayModel.provenance.activity[rev].depth;
      }
      else {
        provenanceOverlayModel.provenance.activity[rev].depth = 0;
      }*/
    }

    // nodes are the history entries, stored as entities
    let nodeEntries:any[] = Object.entries(provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('history_entry'));

    // let columns:any[] = Object.entries(provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('column:'));

    for (let wdf of Object.values(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      let value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"]===wdf["prov:usedEntity"]).length;
      let metrics: any[];
      if(wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality"))
        links.push(
          {
            source: wdf["prov:usedEntity"],
            target: wdf["prov:generatedEntity"],
            generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
            value: 1/value,
            depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
            activity: wdf["prov:activity"]
          });
    }

    // for (let wgb of Object.keys(provenanceOverlayModel.provenance.wasGeneratedBy)) {
    //   let entity = provenanceOverlayModel.provenance.entity[provenanceOverlayModel.provenance.wasGeneratedBy[wgb]['prov:entity']];
    //   if (entity.depth)
    //     ++entity.depth;
    //   else
    //     entity.depth = 1;
    // }
    let nodes:any[] = [];
    for (let entry of nodeEntries) {
      nodes.push({key: entry[0], value: 1, entity: entry[1], depth: entry[1].depth});
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
         + "L" + x1 + "," + (y1+d.target.y1 - d.target.y0)
         + "C" + x3 + "," + (y1+d.target.y1 - d.target.y0)
         + " " + x2 + "," + (y0+d.source.y1 - d.source.y0)
         + " " + x0 + "," + (y0+d.source.y1 - d.source.y0)
         + "L" + x0 + "," + y0;
  }

}
