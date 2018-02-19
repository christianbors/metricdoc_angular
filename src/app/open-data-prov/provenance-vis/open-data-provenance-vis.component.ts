import { Component, OnInit } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams }  from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GitlabService } from '../gitlab.service';
import { OpenRefineService } from '../../shared/open-refine/open-refine.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-open-data-provenance-vis',
  templateUrl: './open-data-provenance-vis.component.html',
  providers: [ GitlabService, OpenRefineService ],
  styleUrls: ['./open-data-provenance-vis.component.scss']
})
export class OpenDataProvenanceVisComponent implements OnInit {

  private projectId: string;
  private commits: any[];
  private projects: any[];
  private currentProject: any;
  private xDistByTime: boolean = false;

  private d3Transform;
  private r: number = 8;

  private sim;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private gitlabService: GitlabService,
    private openRefineService: OpenRefineService
  ) {
    this.d3Transform = require("d3-transform");
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectName');
    //initialize projects and commits
    this.gitlabService.getProjects().subscribe(
      projects => {
        this.projects = projects;
        if(this.projectId) {
          this.getCommitHistory();
        }
      },
      error => {
        console.log(error);
      });
  }

  getCommitHistory() {
    this.currentProject = this.projects.find(d => { return d.id == this.projectId});
    this.gitlabService.getCommits(this.projectId).subscribe(data => {
      this.commits = data;
      let obs = [];
      for(let commit of this.commits) {
        obs.push(this.gitlabService.getCommit(this.projectId, commit));
        // .subscribe(commitInfoSource => {
        //   commit.stats = commitInfoSource.stats;
        // });
      }
      Observable.forkJoin(obs).subscribe((commitArray:any) => {
        for (let commitInfo of commitArray) {
          let commitCurrent = this.commits.find(c => { return commitInfo.id == c.id});
          commitCurrent.stats = commitInfo.stats;
        }
        this.createTimelineVis();
        this.createQualityStream();
      })
    });
  }

  private createQualityStream() {
    if(this.currentProject) {
      let projectObs: any[] = [];
        this.openRefineService.getAllProjectMetadata().subscribe((projectsOverviewMetadata: any) =>{
          
          let projectsMetadata = [];
          // for(let refineProjectId in projectsOverviewMetadata.projects) {
            // console.log(projectsOverviewMetadata.projects[refineProjectId]);
            // projectsMetadata.push(this.openRefineService.getRefineProject(refineProjectId));
          
            for (let commit of this.commits) {
              let projectFromCommit;
              let currentProjectId;
              let filterForProject = [];
              for(let projectMetaId in projectsOverviewMetadata.projects) {
                let currentProjMeta = projectsOverviewMetadata.projects[projectMetaId];
                if(currentProjMeta.tags.indexOf(this.projectId) > -1)
                  filterForProject.push({id: projectMetaId, meta: currentProjMeta});
              }
              projectFromCommit = filterForProject.find(proj => { return proj.meta.tags.indexOf(commit.short_id) > -1});
              // let refineProj = Object.entries(projectsOverviewMetadata.projects).find(data => { 
              //   return data[1].tags.indexOf(commit) >= 0;
              // })
              if(projectFromCommit) {
                // we found an already existing dataset
                projectObs.push(this.openRefineService.getRefineProject(projectFromCommit.id));
              } else {
                let dataUrl = this.gitlabService.getRawFileUrl(this.projectId, "resources%2FKnstler_der_Sammlung_mumok", commit.short_id);
                projectObs.push(this.openRefineService.createOpenRefineMetricsProject(this.currentProject.name, this.projectId, commit.short_id, "text/line-based/*sv", ",", dataUrl))
              }
            }
            Observable.forkJoin(projectObs).subscribe((projectIds: any[]) => {
              // .map((data: any) => {
              // console.log(data);
              let metricRecommendations = []
              for(let projectId of projectIds) {
                metricRecommendations.push(this.openRefineService.recommendMetrics(projectId));
              }
              Observable.forkJoin(metricRecommendations).subscribe((recommendations: any[]) => {
                // .map((metrics:any) => {
                  let qualityProjects = []
                  for (let i = 0; i < projectIds.length; ++i) {
                    qualityProjects.push(this.openRefineService.setupProject(projectIds[i], recommendations[i]));
                  }
                  Observable.forkJoin(qualityProjects).subscribe((qualityProjects: any[]) => {
                    console.log(qualityProjects);
                  });
                // })
              })
            })
          // }
        })
    }
  }

  private createTimelineVis() {
    let m = [20, 15, 15, 120], //top right bottom left
      w = 1500 - m[1] - m[3],
      h = 350 - m[0] - m[2];

    let svg = d3.select("svg.git-graph");

    // prepare commmits, calculate height for commit 
    let parents = [];
    let commitLinks = []
    let maxCount: number = 0;
    for (let comm of this.commits) {
      let currentCommCount = parents.find(d => { return d.id == comm.id });
      for (let parentId of comm.parent_ids) {
        if(!currentCommCount) {
          currentCommCount = {id: comm.id, count: 0};
          parents.push(currentCommCount);
        }

        let parentCount = parents.find(d => { return d.id == parentId });
        if(!parentCount) {
          parents.push({id: parentId, count: currentCommCount.count + comm.parent_ids.indexOf(parentId)});
        } else {
          currentCommCount.count += comm.parent_ids.indexOf(parentId);
        }
      }
      comm.yHeight = currentCommCount.count;


      for (let parent of comm.parent_ids) {
        commitLinks.push({source: comm.id, target: parent});
      }
    }

    // calculate scaling
    let maxTime = d3.max(this.commits, (commit: any) => {return commit.created_at});
    let minTime = d3.min(this.commits, (commit: any) => {return commit.created_at});

    let maxAdditions = d3.max(this.commits, (commit: any) => { return commit.stats.additions });
    let maxDeletions = d3.max(this.commits, (commit: any) => { return commit.stats.deletions });
    //offset for small values, otherwise they would not be visible
    let scaleChangeAdditions = d3.scaleLinear().domain([0, maxAdditions]).range([2, 40]);
    let scaleChangeDeletions = d3.scaleLinear().domain([0, maxDeletions]).range([2, 40]);

    let scaleXByTime = d3.scaleTime().domain([Date.parse(minTime), Date.parse(maxTime)]).range([0, w]);
    let scaleXByCommit = d3.scaleLinear().domain([0, this.commits.length+1]).range([w, 0]);

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    let scaleYMax = d3.max(parents, (parentCount: any) => { return parentCount.count });
    let miniHeight = scaleYMax * 40 + 50, //40 accords to maximum additions and deletions
        mainHeight = h - miniHeight - 50;
    let scaleY = d3.scaleLinear().domain([-1, scaleYMax]).range([0, miniHeight]);

    //TODO: forceX either do x axis distribution by date or by commit (evenly distributed)
    //      add dropdown to toggle 
    let forceX;
    if(this.xDistByTime) {
      forceX = d3.forceX((commit: any) => { return scaleXByTime(Date.parse(commit.created_at)) }).strength(10);
    }
    else {
      forceX = d3.forceX((commit: any, i: number) => { return scaleXByCommit(i) }).strength(10);
    }

    this.sim = d3.forceSimulation().force("xAxis", forceX)
      .force("yAxis", d3.forceY((commit: any) => { return (scaleY(commit.yHeight)) }).strength(10))
      .force("link", d3.forceLink().id((commit: any) => { return commit.id }));

    let visCanvas = svg.append("g")
      .attr("class", "vis")
      .attr("transform", this.d3Transform.transform().translate(20, 15));

    let link = visCanvas.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(commitLinks)
    .enter().append("line")
      .attr("stroke", (link) => {
        let source = this.commits.find((commit) => { return commit.id == link.source });
        let target = this.commits.find((commit) => { return commit.id == link.target });
        return source.yHeight > target.yHeight ? color(source.yHeight) : color(target.yHeight);
      })
      .attr("stroke-width", 3);

    let node = visCanvas.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(this.commits)
    .enter().append("circle")
      .attr("r", this.r)
      .attr("fill", (commit) => { return color(commit.yHeight) })
      .call(d3.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended));

    let translateRect = this.d3Transform.transform().translate((e) => { return [-17, -scaleChangeAdditions(e.stats.additions)] });

    visCanvas.append("g")
      .attr("class", "additions")
    .selectAll("rect")
      .data(this.commits)
      .enter().append("rect")
        .attr("width", 10)
        .attr("height", (d) => { return scaleChangeAdditions(d.stats.additions) })
        .attr("transform", translateRect)
        .attr("fill", "green");
    visCanvas.append("g")
      .attr("class", "deletions")
    .selectAll("rect")
      .data(this.commits)
      .enter().append("rect")
        .attr("width", 10)
        .attr("height", (d) => { return scaleChangeDeletions(d.stats.deletions) })
        .attr("transform", this.d3Transform.transform().translate(-17, 0))
        .attr("fill", "red");

    if(this.xDistByTime) {
      visCanvas.append("g")
        .attr("class", "x-axis")
        .attr("transform", this.d3Transform.transform().translate(0, mainHeight))
        .call(d3.axisBottom(scaleXByTime)
          .tickFormat(d3.timeFormat("%Y-%m-%d"))
          .tickArguments([d3.timeWeek.every(1)])
          .ticks(this.commits.length))
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", this.d3Transform.transform().rotate(-65));
    } else {
      // visCanvas.append("g")
      //   .attr("class", "x-axis")
      //   .attr("transform", this.d3Transform.transform().translate(0, mainHeight))
      //   .call(d3.axisBottom(scaleXByCommit)
      //     .ticks(this.commits.length+2))
      //   .selectAll("text")
      //     .style("text-anchor", "end")
      //     .attr("dx", "-.8em")
      //     .attr("dy", ".15em")
      //     .attr("transform", this.d3Transform.transform().rotate(-65));
    }

    node.append("title").text((commit) => { return commit.title });
    
    this.sim.nodes(this.commits)
      .on("tick", ticked);
    this.sim.force("link")
      .links(commitLinks);
    // this.sim.force("yAxis").links(commitLinks);//.nodes(node);

    function ticked() {
      link
          .attr("x1", function(d) {
            return d.source.x; 
          })
          .attr("y1", function(d, i, group) {
            // d3.select(group[i]).select("rect").attr("y", d.target.y = (d.target.y - d.source.y));
            return d.source.y; 
          })
          .attr("x2", function(d) { 
            return d.target.x; 
          })
          .attr("y2", function(d) { 
            return d.target.y; 
          });

      node
          .attr("cx", function(d, i, group) {
            let change = visCanvas.select("g.additions").select("rect:nth-child(" + (i+1) + ")");
            // change.attr("x", d.x - 17); //subtract by radius and bar width
            change.attr("x", d.x);
            visCanvas.select("g.deletions")
            .select("rect:nth-child(" + (i+1) + ")")
              // .attr("x", d.x - 17);
              .attr("x", d.x);
            return d.x;
          })
          .attr("cy", function(d, i, group) { 
            let change = visCanvas.select("g.additions")
            .select("rect:nth-child(" + (i+1) + ")")
              // .attr("y", (commit:any) => { return d.y - scaleChangeAdditions(commit.stats.additions) });
              .attr("y", d.y);
            visCanvas.select("g.deletions")
            .select("rect:nth-child(" + (i+1) + ")")
              .attr("y", d.y);
            return d.y; 
          });
    }
  }

  private dragstarted(d) {
    if (!d3.event.active) this.sim.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  private dragended(d) {
    if (!d3.event.active) this.sim.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // private ticked()
}
