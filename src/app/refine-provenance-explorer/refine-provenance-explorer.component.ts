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
              .extent([[1, 1], [500, 300]])
              .nodeAlign(this.d3Sankey.sankeyCenter);
            sankeyDiag.nodes(graph.nodes)
              .links(graph.links)
              .nodeId((node:any) => node.key);

            // sankeyDiag.nodes((node) => {
            //   return node["prov:value"];
            // }).links((link) => {
            //   return link;
            // });

            d3.select("svg.sankey").append("g")
              .attr("stroke", "#000")
            .selectAll("rect")
            .data(sankeyDiag().nodes)
            .enter().append("rect")
              .attr("x", (d:any) => d.x0)
              .attr("y", (d:any) => d.y0)
              .attr("height", (d:any) => d.y1 - d.y0)
              .attr("width", (d:any) => d.x1 - d.x0)
              // .attr("fill", (d:any) => color(d.key.contains("column")))
            .append("title")
              .text((d:any) => {
                return `${d.key}`;
            });
  //             format = {
  //   const f = d3.format(",.0f");
  //   return d => `${f(d)} TWh`;
  // }

              const link = d3.select("svg.sankey").append("g")
                .attr("fill", "none")
                .attr("stroke-opacity", 0.5)
              .selectAll("g")
              .data(sankeyDiag().links)
              .enter().append("g")
                // .style("fill", "grey")
                .attr("stroke-width", (d:any) => Math.max(1, d.width));
                // .style("mix-blend-mode", "multiply");

              const gradient = link.append("linearGradient")
                // .attr("id", d => (d.uid = DOM.uid("link")).id)
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", (d:any) => d.source.x1)
                .attr("x2", (d:any) => d.target.x0);
              link.append("path")
                .attr("d", this.d3Sankey.sankeyLinkHorizontal())
                .attr("stroke", d => "grey")
                .attr("stroke-width", (d:any) => Math.max(1, d.width));
              // link.append("path")
              //   .attr("d", this.d3Sankey.sankeyCenter())
              //   .attr("stroke", (d:any) => { 
              //     return d.uid;
              //   })
              //   .attr("stroke-width", (d:any) => Math.max(1, d.width));
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  buildGraph(provenanceOverlayModel: any):any {
    let links:any[] = [];
    // for (var i = provenanceOverlayModel.provenance.length - 1; i >= 0; i--) {
    //   provenanceOverlayModel.provenance[i]
    // }

    for (let key of Object.keys(provenanceOverlayModel.provenance.wasGeneratedBy)) {
      let rev = provenanceOverlayModel.provenance.wasGeneratedBy[key]["prov:activity"];
      let derived = provenanceOverlayModel.provenance.wasDerivedFrom[rev];
      links.push(
        {
          source: derived["prov:usedEntity"],
          target: provenanceOverlayModel.provenance.wasGeneratedBy[key]["prov:entity"],
          generated: provenanceOverlayModel.provenance.wasGeneratedBy[key],
          derived: derived,
          value: 5,
          depth: Object.keys(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(rev)
        });
    }

    let nodes = [];
    for (let wgb of Object.keys(provenanceOverlayModel.provenance.wasGeneratedBy)) {
      // nodes.push({key: key, value: provenanceOverlayModel.provenance.entity[key]});
      let entity = provenanceOverlayModel.provenance.entity[provenanceOverlayModel.provenance.wasGeneratedBy[wgb]['prov:entity']];
      if (entity.depth)
        ++entity.depth;
      else
        entity.depth = 1;
    }
    for (let key of Object.keys(provenanceOverlayModel.provenance.entity)) {
      nodes.push({key: key, value: provenanceOverlayModel.provenance.entity[key], depth: provenanceOverlayModel.provenance.entity[key].depth});
    }

    let graph = {
      nodes: nodes,
      links: links
    };
    return graph;
  }
}
