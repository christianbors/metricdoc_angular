import { Component, OnInit } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams }  from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GitlabService } from '../gitlab.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-open-data-provenance-vis',
  templateUrl: './open-data-provenance-vis.component.html',
  providers: [ GitlabService ],
  styleUrls: ['./open-data-provenance-vis.component.sass']
})
export class OpenDataProvenanceVisComponent implements OnInit {

  private projectId: string;
  private commits: any[];
  private projects: any[];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private gitlabService: GitlabService
    ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectName');
    this.getAllProjects();
    if(this.projectId) {
      this.getCommitHistory();
    }
  }

  getAllProjects() {
    this.gitlabService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => {
        console.log(error);
      })
  }

  getCommitHistory() {
    
    this.gitlabService.getCommits(this.projectId).subscribe(data => {
      this.commits = data;
      this.createTimelineVis();
    });
  }

  private createTimelineVis() {
    let m = [20, 15, 15, 120], //top right bottom left
      w = 960 - m[1] - m[3],
      h = 500 - m[0] - m[2],
      miniHeight = this.commits.length * 12 + 50,
      mainHeight = h - miniHeight - 50;

    console.log(this.commits);

    let maxTime = d3.max(this.commits, (commit: any) => {return commit.created_at});

    let from = Date.parse(this.commits[this.commits.length -1].created_at);
    let to = Date.parse(this.commits[0].created_at);
    d3.scaleTime().domain([, this.commits[0].created_at]).range
    let x = d3.scaleLinear().domain([])
  }
}
