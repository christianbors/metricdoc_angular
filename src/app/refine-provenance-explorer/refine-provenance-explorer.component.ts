import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer }                     from '@angular/platform-browser';
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
  refineProjectUrl;
  projectMetadata: ProjectMetadata;
  openRefineProject: OpenRefineProject;
  provenanceOverlayModel: any;

  d3Sankey;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService,
    private domSanitizer : DomSanitizer) {
    this.d3Sankey = require("d3-sankey");
  }

  ngOnInit() { 
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.refineProjectUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("http://localhost:3333/project?project=" + this.projectId);

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
              .extent([[1, 1], [1000, 150]])
              .nodeAlign(this.d3Sankey.sankeyLeft);

            sankeyDiag.nodes(graph.nodes)
              .links(graph.links)
              .nodeId((node:any) => node.key);

            // sankeyDiag().nodes.forEach((node: any) => {
            //   node.value = 1;
            // });

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
              // .keys((d:any) => { return Object.keys(d.metrics) })
              .value((d:any, key:any) => {
                let val:number = 0;
                for(let m of d[key.col])
                  if(m.type == key.metric)
                    return m.$;
                // let val:any[] = Object.values(d.metrics).filter((m: any) => {
                //   return m.type === key;
                // });
                return null;
              });

            let cols:any = {};
            for(let k of Object.keys(this.provenanceOverlayModel.provenance.entity)) {
              if(k.includes("column:"))
                cols[k] = this.provenanceOverlayModel.provenance.entity[k];
            }

            d3.select("svg.sankey").append("g")
              .attr("stroke", "#000")
            .selectAll(".history_nodes")
            .data(sankeyDiag().nodes)
            .enter().append("g")
              .attr("class", "history_nodes")
              // .attr("x", (d:any) => d.x0)
              // .attr("y", (d:any) => d.y0)
              .attr("height", (d:any) => d.y1 - d.y0)
              .attr("width", (d:any) => d.x1 - d.x0)
              .attr("fill", (d:any) => 
                d3.schemeCategory10[1]
              )
              // .each((data: any, idx: number, node:any) => {  
              //   let activityId = data.key.substring(14);
              //   let nodeHeight:number = data.y1 - data.y0;
              //   let nodeWidth:number = data.x1 - data.x0;

                
              //   // Object.entries(this.provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('column:'));
              //   let colMetrics:any = {};
              //   let colNames:any[] = [];
              //   let mNames:string[] = [];
              //   Object.keys(cols).forEach((k:any) => {
              //     let qEntry = cols[k]["quality:"+activityId];
              //     if(qEntry) {
              //       colMetrics[k] = qEntry;
              //       // colNames.push({col: k);
              //       for(let m of qEntry) {
              //         colNames.push({col:k, metric: m.type});
              //         if(!mNames.includes(m.type))
              //           mNames.push(m.type);
              //       }
              //     }
              //   })

              //   let stack = stackMetric.keys(colNames)([colMetrics]);
              //   let maxVal:any = d3.max(stack, (d:any) => { return d3.max(d, (row:any) => { return row[1] }) });
              //   let scaleY = d3.scaleLinear().rangeRound([nodeHeight, 0]).domain([0, maxVal]);
              //   let z = d3.scaleOrdinal(d3.schemeCategory10).domain(mNames);
                
              //   d3.select(node[idx])
              //     .selectAll(".metric")
              //     .data(stack)
              //   .enter().append("rect")
              //     .attr("class", "metric")
              //     .attr("stroke", "none")
              //     // .attr("transform", (d:any, i:any) => {return "translate(" + nodeWidth*i + "," + data.y0 + ")"})
              //     .attr("transform", "translate(0," + data.y0 + ")")
              //     .attr("fill", (d:any) => { return z(d.key.metric) })
              //   // .selectAll("rect")
              //   // .data((d:any) => {return d})
              //   // .enter().append("rect")
              //     .attr("x", data.x0)
              //     .attr("y", (d:any) => { 
              //       return scaleY(d[0][1]); 
              //     })
              //     .attr("height", (d:any) => { return scaleY(d[0][0]) - scaleY(d[0][1]); })
              //     .attr("width", nodeWidth);

              //   // d3.select(node[idx])
              //   //   .selectAll("g")
              //   //   .data(cols)
              //   // .enter().append("g")
              //   //   .attr("class", (d:any) => d[0])
              //   //   .each((d:any, idx:any, grp:any[]) => {
                    
              //   //     d3.select(grp[idx])
              //   //       .selectAll("rect")
              //   //       .data(st)
              //   //       .enter().append("rect")
              //   //       .attr("height", nodeHeight/grp.length)
              //   //       .attr("width", nodeWidth-2)
              //   //       .attr("stroke", "black")
              //   //       .attr("stroke-width", 1);
              //   //   });
              //   let a = node.activity;
              // })
            .append("title")
              .text((d:any) => `${d.key}`);
            d3.select("svg.sankey").append("g")
              .attr("class", "nodesText")
              .style("font", "10px sans-serif")
            .selectAll("text")
            .data(sankeyDiag().nodes)
            .enter().append("text")
              .attr("x", (d:any) => d.x0)
              .attr("y", (d:any) => d.y1 + 4)
              .attr("dy", "0.35em")
              .attr("text-anchor", (d:any) => "start")
              .text((d:any) => d.entity["prov:label"]);
            
            // d3.select("svg.sankey").append("g")
            //   .attr("class", "linksText")
            //   .style("font", "10px sans-serif")
            // .selectAll("text")
            // .data(sankeyDiag().links)
            // .enter().append("text")
            //   .attr("x", (d:any) => 
            //     (d.source.x1 + d.target.x1)/2)
            //   .attr("y", (d:any) => (d.y0 + d.y1)/2)
            //   .attr("dy", "0.35em")
            //   .attr("text-anchor", (d:any) => "start")
            //   .text((d:any) => d.value);
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

    let maxVal = 0;
    for (let wdf of Object.values(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      let value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:usedEntity"]).length;
      let endValue = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:generatedEntity"]).length;
      if (endValue == 0)
        value = 1;
      // else if (value.length > 1)
      //   value = [0];
      if(maxVal < value)
        maxVal = value;

      // console.log(wdf["prov:generatedEntity"] + ": " + value + ", " + value2);
      let metrics: any[];
      if(wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality")) {
        links.push(
          {
            source: wdf["prov:usedEntity"],
            target: wdf["prov:generatedEntity"],
            generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
            out: null,
            in: null,
            value: 1/value,
            depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
            activity: wdf["prov:activity"]
          });
        console.log(1/value);
      }
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
      nodes.push({key: entry[0], value: 10, entity: entry[1], depth: entry[1].depth});
    }
    for (let link of links) {
      link.value = link.value*maxVal;
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
