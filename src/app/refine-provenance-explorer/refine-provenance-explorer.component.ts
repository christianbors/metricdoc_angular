import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer }                     from '@angular/platform-browser';
import { OpenRefineService }                from './../shared/open-refine/open-refine.service';
import { OpenRefineProject }                from './../shared/open-refine/model/open-refine-project';
import { ProjectMetadata }                  from './../shared/open-refine/model/project-metadata';
import { ProvenanceOverlayModel }           from './../refine-provenance/model/provenance-overlay-model';

import * as d3 from 'd3';
import * as d3Sankey from './d3-sankey.js';

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

  operationIconCodes: any = {
    "TextTransformOperation": "\uf121",
    "MassEditOperation": "\uf044",
    "MultiValuedCellJoinOperation": "\uf066",
    "MultiValuedCellSplitOperation": "\uf065",
    "FillDownOperation": "\uf044",
    "BlankDownOperation": "\uf044",
    "TransposeColumnsIntoRowsOperation": "\uf101",
    "TransposeRowsIntoColumnsOperation": "\uf103",
    "KeyValueColumnizeOperation": "\uf084",
    "ColumnAdditionOperation": "\uf65e",
    "ColumnRemovalOperation": "\uf0db",
    "ColumnRenameOperation": "\uf07b",
    "ColumnMoveOperation": "\uf2f6",
    "ColumnSplitOperation": "\uf0db",
    "ColumnAdditionByFetchingURLsOperation": "\uf65e",
    "ColumnReorderOperation": "\uf0db",
    "RowRemovalOperation": "\uf0c9",
    "RowStarOperation": "\uf005",
    "RowFlagOperation": "\uf024",
    "RowReorderOperation": "\uf37f",
    "ReconOperation": "\uf37f",
    "ReconMarkNewTopicsOperation": "\uf08d",
    "ReconMatchBestCandidatesOperation": "\uf24d",
    "ReconDiscardJudgmentsOperation": "\uf0e7",
    "ReconMatchSpecificTopicOperation": "\uf37f",
    "ReconJudgeSimilarCellsOperation": "\uf37f",
    "ReconClearSimilarCellsOperation": "\uf37f",
    "ReconCopyAcrossColumnsOperation": "\uf37f",
    "ExtendDataOperation": "\uf35d",
  };

  constructor(protected route: ActivatedRoute,
    protected router: Router,
    protected openRefineService: OpenRefineService,
    private domSanitizer : DomSanitizer) {
    // TODO old way of loading sankey
    // this.d3Sankey = require("d3-sankey");
    // delete this.d3Sankey['computeNodeValues'];

    // this.d3Sankey.computeNodeValues = function(graph) {
    //   console.log("override");
    // };
    // module.exports = this.d3Sankey;
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
    let nodeWidth:number = 15;
    let iconPadding:number = 4;
    let iconHeight:number = 12;
    let nodePadding:number = iconPadding*2 + iconHeight;

    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.provenanceOverlayModel = openRefineProject.overlayModels['qualityProvenance'];

          if(this.provenanceOverlayModel) {
            let graph = this.buildGraph(this.provenanceOverlayModel);

            // let sankeyDiag = this.d3Sankey.computeNodeValues();
            let sankeyDiag = d3Sankey.sankey()
              .nodeWidth(nodeWidth)
              .nodePadding(nodePadding)
              .extent([[1, 1], [1000, 250]])
              .nodeAlign(d3Sankey.sankeyLeft);

            sankeyDiag.nodes(graph.nodes)
              .links(graph.links)
              .nodeId((node:any) => node.key);

            const link = d3.select("svg.sankey").append("g")
              .attr("fill", "none")
              .attr("stroke-opacity", 0.25)
            .selectAll("g")
            .data(sankeyDiag().links)
            .enter().append("g");

            link.append("path")
                .attr("d", (d:any) => { return this.linkSkewed(d) })
                // .attr("stroke", d => "grey")
                .attr("fill", d => "grey")
                .attr("fill-opacity", 0.25)
                // .attr("stroke-width", (d:any) => Math.max(1, d.width))
                .append("title")
              .text((d:any) => {
                return `${d.key}`;
              });

            let ops = [];
            Object.values(graph.nodes).forEach((n:any) => {
              if (!ops.includes(n.entity["prov:label"]))
                ops.push(n.entity["prov:label"]);
            });
            let sankeyColorScale = d3.scaleSequential(d3.interpolateViridis);
            let scale = d3.scaleOrdinal(d3.schemeCategory10).domain(ops)

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
              .attr("height", (d:any) => d.y1 - d.y0)
              .attr("width", (d:any) => d.x1 - d.x0)
              .each((data: any, idx: number, node:any) => {  
                let activityId = data.key.substring(14);
                let nodeHeight:number = data.y1 - data.y0;
                let nodeWidth:number = data.x1 - data.x0;
                
                d3.select(node[idx])
                  .append("rect")
                    .attr("class", "activity")
                    .attr("x", data.x0)
                    .attr("y", data.y0)
                    .attr("height", data.y1 - data.y0)
                    .attr("width", nodeWidth)
                    .attr("stroke", "none")
                    .attr("fill", (d:any) => {
                      let col = d.entity["prov:label"];
                      return scale(col);
                    });
                d3.select(node[idx])
                  // .append("i")
                  //   .attr("class", function(d){ 
                  //     return "icon fa fa-5x fa-twitter-square";
                  //   })
                  .append('text')
                  .attr("x", (d:any) => d.x0 + nodeWidth/2)
                  .attr("y", (d:any) => d.y1 + nodePadding/2)
                  .attr('text-anchor', 'middle')
                  .attr('dominant-baseline', 'central')
                  .attr('font-family', 'FontAwesome')
                  .attr('font-size', iconHeight + 'px')
                  .attr("stroke", "none")
                  .text(this.operationIconCodes[data.entity["prov:label"]]);//[activityId]);

                  // .append("text")
                  //   .attr("x", (d:any) => d.x0)
                  //   .attr("y", (d:any) => d.y1 + (iconHeight/2))
                  //   .attr("dx", (iconHeight/16) + 'em')
                  //   .attr("text-anchor", (d:any) => "start")
                  //   .attr('font-size', (iconHeight/16) + 'em')
                  //   .attr('font-family', 'Font Awesome 5 Free')
                  //   .text("\uf5c1");//(d:any) => d.entity["prov:label"]);
                let a = node.activity;
              })
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
    }

    // nodes are the history entries, stored as entities
    let nodeEntries:any[] = Object.entries(provenanceOverlayModel.provenance.entity).filter((entity: any) => entity[0].includes('history_entry'));

    let maxVal = 0;
    for (let wdf of Object.values(provenanceOverlayModel.provenance.wasDerivedFrom)) {
      let value = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:usedEntity"]).length;
      let endValue = Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).filter((wdf_filter: any) => wdf_filter["prov:usedEntity"] === wdf["prov:generatedEntity"]).length;
      if (endValue == 0)
        value = 1;

      if(maxVal < value)
        maxVal = value;

      let metrics: any[];
      if(wdf["prov:usedEntity"] && !wdf["prov:generatedEntity"].includes("quality")) {
        links.push(
          {
            source: wdf["prov:usedEntity"],
            target: wdf["prov:generatedEntity"],
            generated: provenanceOverlayModel.provenance.entity[wdf["prov:generatedEntity"]],
            out: null,
            in: null,
            value: 1,
            depth: Object.values(provenanceOverlayModel.provenance.wasDerivedFrom).indexOf(wdf),
            activity: wdf["prov:activity"]
          });
      }
    }

    let cols:any = {};
    for(let k of Object.keys(this.provenanceOverlayModel.provenance.entity)) {
      if(k.includes("column:"))
        cols[k] = this.provenanceOverlayModel.provenance.entity[k];
    }

    let nodes:any[] = [];
    for (let entry of nodeEntries) {
      let activityId = entry[0].replace("history_entry:", "");
      let colMetrics:any = {};
      let colNames:any[] = [];
      let mNames:string[] = [];
      Object.keys(cols).forEach((k:any) => {
        let qEntry = cols[k]["quality:"+activityId];
        if(qEntry) {
          colMetrics[k] = qEntry;
          for(let m of qEntry) {
            colNames.push({col:k, metric: m.type});
            if(!mNames.includes(m.type))
              mNames.push(m.type);
          }
        }
      })
      let value = 0;
      Object.values(colMetrics).forEach((colMetric:any) => {
        colMetric.sum = 0;
        Object.values(colMetric).forEach((val:any) => {
          if(val.$)
            colMetric.sum += parseFloat(val.$);
        });
        value += colMetric.sum;
      })

      nodes.push({key: entry[0], value: value, entity: entry[1], depth: entry[1].depth});
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
         + "L" + x1 + "," + (y1+ (d.target.y1 - d.target.y0))
         + "C" + x3 + "," + (y1+ (d.target.y1 - d.target.y0))
         + " " + x2 + "," + (y0+ (d.source.y1 - d.source.y0))
         + " " + x0 + "," + (y0+ (d.source.y1 - d.source.y0))
         + "L" + x0 + "," + y0;
  }

}
