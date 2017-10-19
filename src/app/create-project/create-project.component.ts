import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OpenRefineService }  from '../shared/open-refine/open-refine.service';
import { ProjectMetadata }    from '../shared/open-refine/model/project-metadata';
import { OpenRefineProject } from '../shared/open-refine/model/open-refine-project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass'],
  providers: [ OpenRefineService ]
})
export class CreateProjectComponent implements OnInit {

  private projectId;
  private projectMetadata: ProjectMetadata;
  private refineProject: OpenRefineProject;
  private rowModel: any;

  private importSuccess: boolean = false;

  private errorMessage:string;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private openRefineService: OpenRefineService) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    if (this.projectId) {
      this.openRefineService.getProjectMetadata(this.projectId)
        .subscribe(
          projectMetadata => this.projectMetadata = projectMetadata,
          error => this.errorMessage = <any>error
        );
      this.openRefineService.getRefineProject(this.projectId)
        .subscribe(
          project => this.refineProject = project,
          error => this.errorMessage = <any>error
        );
      this.openRefineService.getRows(this.projectId, 0, 1)
        .subscribe(
          rowModel => this.rowModel = rowModel
        );
    }
  }

  addMetricsOverlay() {
    this.openRefineService.setupProject(this.projectId)
      .subscribe(
        project => {
          this.refineProject;
          this.importSuccess = true;
        }
      );
  }

}
