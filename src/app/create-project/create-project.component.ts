import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OpenRefineService }  from '../shared/open-refine/open-refine.service';
import { ProjectMetadata }    from '../shared/open-refine/model/project-metadata';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass']
})
export class CreateProjectComponent implements OnInit {

  private projectId;
  private projectMetadata: ProjectMetadata;
  private errorMessage:string;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private openRefineService: OpenRefineService) { 
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.openRefineService.getProjectMetadata(this.projectId)
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

}
