import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OpenRefineService }                from './../shared/open-refine/open-refine.service';
import { OpenRefineProject }                from './../shared/open-refine/model/open-refine-project';
import { ProjectMetadata }                  from './../shared/open-refine/model/project-metadata';
import { ProvenanceOverlayModel }           from './../refine-provenance/model/provenance-overlay-model';

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
  provenance: ProvenanceOverlayModel;

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService) { }

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
          this.provenance = openRefineProject.overlayModels['qualityProvenance'];
          // this.updateProjectData(openRefineProject);
          // this.openRefineService.getProvenanceJSON(this.provenance.provFilePath);
        },
        error => this.errorMessage = <any>error
      );
  }
}
