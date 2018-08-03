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
            let entities = Object.values(this.provenanceOverlayModel.provenance.entity);
            let data = {
              nodes: entities,
              links: this.provenanceOverlayModel.provenance
            }
            let sankeyDiag = this.d3Sankey.sankey(data)
              .nodeWidth(35)
              .nodePadding(10)
              .size([300, 500]);
            sankeyDiag.nodes((graph) => {
              return graph["prov:value"];
            }).links((link) => {
              return link;
            });

            // this.d3Sankey.sankeyLinkHorizontal()

            d3.select("svg.sankey").append("g")
              .attr("fill", "none")
              .attr("stroke", "#000")
              .attr("stroke-opacity", 0.2)
            .selectAll("path")
            .data(sankeyDiag.graph.links)
            .enter().append("path")
              .attr("d", sankeyDiag)
              .attr("stroke-width", function(d) { return 40; });
            // sankeyDiag.nodes((graph) => {
            //   graph.nodes = this.provenanceOverlayModel.provenance.entity;
            //   return graph.nodes;
            // })
            
            // sankeyDiag({nodes: this.provenanceOverlayModel., links: })

            

            // this.updateProjectData(openRefineProject);
            // this.openRefineService.getProvenanceJSON(this.provenance.provFilePath);
          }
        },
        error => this.errorMessage = <any>error
      );
  }
}
