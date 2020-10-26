import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from "@angular/common";

import { OpenRefineService }  from '../shared/open-refine/open-refine.service';
import { ProjectMetadata }    from '../shared/open-refine/model/project-metadata';
import { OpenRefineProject } from '../shared/open-refine/model/open-refine-project';
import { MetricFunction } from '../shared/open-refine/model/metric-function';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass'],
  providers: [ OpenRefineService ]
})
export class CreateProjectComponent implements OnInit {

  objectKeys = Object.keys;

  projectId;
  refineUrl: string;
  projectMetadata: ProjectMetadata;
  refineProject: OpenRefineProject;
  refineProjects:any;
  rowModel: any;
  metricFunctions: any;
  metricsDisabled: boolean[][];

  importSuccess: boolean = false;

  errorMessage:string;

  constructor(public route: ActivatedRoute, 
    public router: Router,
    public openRefineService: OpenRefineService) {
    this.openRefineService.getAllProjectMetadata().subscribe(
      refineProjects => {
          this.refineProjects = refineProjects.projects;
          // console.log(this.refineProjects.projects);
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.refineUrl = "http://127.0.0.1:3333/project?project=" + this.projectId;
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
      this.openRefineService.recommendMetrics(this.projectId)
        .subscribe(
          metricFunctions => {
            this.metricFunctions = metricFunctions['recommendedMetrics'];
            this.metricsDisabled = {} as any;
            for(let col of Object.keys(this.metricFunctions)) {
              this.metricsDisabled[col] = [];
              for (let mIdx = 0; mIdx < this.metricFunctions[col].length; ++mIdx)
                this.metricsDisabled[col][mIdx] = false;
            }
          });
    } else {

    }
  }

  toggleMetric(event: MouseEvent, column: string, metricIndex: number) {
    this.metricsDisabled[column][metricIndex] = !this.metricsDisabled[column][metricIndex];
  }

  onTextKey(event: KeyboardEvent, column: string, metricIndex: number) {
    this.metricFunctions[column].metrics[metricIndex].parameters = (<HTMLInputElement>event.target).value;
  }

  addMetricsOverlay() {
    for (let i = 0; i < this.metricFunctions.length; ++i) {
      for (let j = 0; j < this.metricFunctions[i].metrics.length; ++j) {
        if (this.metricsDisabled[i][j]) {
          this.metricFunctions.recommendedMetrics[i][j] = null;
        }
      }
    }
    this.openRefineService.setupProject(this.projectId, this.metricFunctions)
      .subscribe(
        project => {
          this.refineProject;
          this.openRefineService.evaluateMetrics(this.projectId);
          this.router.navigate(['/metric-project', this.projectId]);
        },
        error => {
          this.errorMessage = <any>error;
          console.log('could not convert to metrics project');
        }
      );
  }

  goToRefineProject() {
    window.location.href = this.refineUrl;
  }

}
