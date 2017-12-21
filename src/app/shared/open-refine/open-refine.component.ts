// Observable Version
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, 
  trigger, state, style, transition, animate, keyframes }	from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { MetricsOverlayModel }	from './model/metrics-overlay-model';
import { Metric } from './model/metric';
import { ProjectMetadata }		from './model/project-metadata';
import { OpenRefineProject }	from './model/open-refine-project';
import { OpenRefineService }	from './open-refine.service';
import { RawDataTableComponent } from '../raw-data-table/raw-data-table.component'
import { GlobalNavService } from '../../global-nav.service';

import { NgbModule, NgbAccordion, NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'metrics-overlay-model',
  templateUrl: './open-refine.component.html',
  providers: [ OpenRefineService ],
  styles: ['.error {color:red;}'],
  styleUrls: ['./open-refine.component.scss'],
  animations: [
    trigger('shrinkOut', [
        state('inactive', style({
            height: '*'
            // backgroundColor: '#eee'
        })),
        state('active', style({
            height: 120
            // backgroundColor: '#cfd8dc'
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
    ])//,

    // trigger('movePanel', [
        
    //     transition('void => *', [
    //         animate(600, keyframes([
    //             style({opacity: 0, transform: 'translateY(-200px)', offset: 0}),
    //             style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
    //             style({opacity: 1, transform: 'translateY(0)', offset: 1}),
    //         ]))
    //     ])

    // ])
  ]
})
export class OpenRefineComponent implements OnInit, OnChanges {
  errorMessage: string;
  mode = 'Observable';
  subscription: Subscription;

  private state: string = 'inactive';
  private expanded: boolean = false;

  private projectId: string

  @ViewChild(RawDataTableComponent)
  private rawDataTable: RawDataTableComponent;

  private projectMetadata: ProjectMetadata;
  private openRefineProject: OpenRefineProject;
  private rowModel: any;

  private columnMetricColors: any;
  private spanMetricColors: any;

  private selectedMetrics: Metric[];
  private selectedColumns: string[];
  private rowsFrom:number;
  private rowsTo: number;

  private detailViewOffsetTop: number;

  private sortBy: string = "none";

  constructor (  private route: ActivatedRoute,
    private router: Router,
    private openRefineService: OpenRefineService,
    private globalNavService: GlobalNavService
  ) {
    globalNavService.recalc$.subscribe(
      recalc => {
        this.openRefineService.evaluateMetrics(this.projectId)
        .subscribe(
          metricsOverlayModel => {
            this.openRefineProject.overlayModels['metricsOverlayModel'] = metricsOverlayModel;
            this.updateProjectData(this.openRefineProject);
          },
          error => this.errorMessage = <any>error
        );
      });
    // this.subscription = routineHelperService.sidebarShown$.subscribe(
    //   sidebarShown => {
    //     this.sidebarShown = sidebarShown;
    // });
  }

  ngOnInit() { 
    this.projectId = this.route.snapshot.paramMap.get('projectId');

  	this.getOpenRefineProject();
  	this.getProjectMetadata();
    this.openRefineService.getRows(this.projectId, 0, 1).subscribe(rowModel => this.rowModel = rowModel);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change in comp');
    if('metricsOverlayModel' in changes) {
      // this.openRefineService.evaluateMetrics(this.projectId)
      //   .subscribe(
      //     openRefineProject => updateProjectData(openRefineProject),
      //     error => this.errorMessage = <any>error
      //   );
      console.log('metrics overlay model changed');
    }
  }

  getOpenRefineProject() {
    this.openRefineService.getRefineProject(this.projectId)
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.updateProjectData(openRefineProject);
        },
        error => this.errorMessage = <any>error
      );
  }

  getProjectMetadata() {
    this.openRefineService.getProjectMetadata(this.projectId)
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

  sortMetricColumns() {
    let currentMetricColumns = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns;
    let sortedMetricColumns = [];
    let sortedColumns = [];
    for (let col of this.openRefineProject.columnModel.columns) {
      let metricColumn = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns.filter(mCol => {
        return col.name == mCol.columnName;
      });
      if (metricColumn[0]) {
        sortedMetricColumns.push(metricColumn[0]);
      } else {
        sortedMetricColumns.push({columnName: col.name, metrics: {}});
      }
    }

    if (this.sortBy == "sortByDirtiness") {
      sortedColumns = [];
      sortedMetricColumns = sortedMetricColumns.sort((a: any, b: any) => {
        let valA = Object.keys(a.metrics).map((d:any) => { return parseFloat(a.metrics[d].measure)}).reduce((pv, cv) => pv+cv, 0);;
        let valB = Object.keys(b.metrics).map((d:any) => { return parseFloat(b.metrics[d].measure)}).reduce((pv, cv) => pv+cv, 0);;
        // if(a.value < b.value)
        //   return -1;
        // if (a.value > b.value)
        //   return 1;
        // return 0;
        return valB - valA;
      });

      for (let metricCol of sortedMetricColumns) {
      let col = this.openRefineProject.columnModel.columns.find((value, idx, col) => { return metricCol.columnName === value.name });
      if (col) 
          sortedColumns.push(col);
      }
      for (let col of this.openRefineProject.columnModel.columns) {
        let modelCol = sortedColumns.find((value, idx) => {
          return col.name === value.name;
        });
        if(!modelCol)
          sortedColumns.push(modelCol);
      }
    } else if (this.sortBy == "sortByName") {
      //TODO
    } else {
      sortedColumns = [];
      sortedColumns.push.apply(sortedColumns, this.openRefineProject.columnModel.columns);
      sortedColumns = sortedColumns.sort((a: any, b: any) => {
        return a.cellIndex - b.cellIndex;
      })
      sortedMetricColumns = [];
      for (let col of sortedColumns) {
        let metricCol = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns.filter(mCol => { return col.name == mCol.columnName });
        if (metricCol[0])
          sortedMetricColumns.push(metricCol[0]);
      }
    }
    this.openRefineProject.columnModel.columns = sortedColumns;
    this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns = sortedMetricColumns;
  }

  handleTableHeightUpdated(newOffsetTop) {
    this.detailViewOffsetTop = newOffsetTop;
  }

  handleSelectionUpdated(selection: any) {
    this.selectedMetrics = selection.metrics;
    this.selectedColumns = selection.columns;

    for (let i = 0; i < this.selectedColumns.length; ++i) {
      if (Array.isArray(this.selectedColumns[i])) {
        for (let spanIdx = 0; spanIdx < this.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics.length; spanIdx++) {
          if (this.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics[spanIdx].name == this.selectedMetrics[i].name) {
            this.openRefineProject.overlayModels.metricsOverlayModel.spanningMetrics[spanIdx] = this.selectedMetrics[i];
            break;
          }
        }
      } else {
        let metricColumn = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns.filter(mCol => {
          return this.selectedColumns[i] == mCol.columnName;
        });
        metricColumn[0].metrics[this.selectedMetrics[i].name] = this.selectedMetrics[i];
      }
    }
    this.rawDataTable.updateTableOverlay();
  }

  handleOverviewSelection(selectedMetrics: any) {
    this.selectedMetrics = selectedMetrics.metrics;
    this.selectedColumns = selectedMetrics.columns
  }

  handleDataRowsSelected(selectedRows: any[]) {
    this.rawDataTable.scrollRows(selectedRows);
  }

  handleDataRowsPageChanged(pages: any) {
    this.rowsFrom = pages.from;
    this.rowsTo = pages.to;
  }

  handleSort(sortBy: string) {
    this.sortBy = sortBy;
    this.updateProjectData(this.openRefineProject);
  }

  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    this.expanded = (this.state === 'inactive' ? false : true);
  }
  //TODO: add edit commands with @Output functions

  private updateProjectData(openRefineProject: OpenRefineProject) {
    this.sortMetricColumns();
    // this.openRefineService.model = this.openRefineProject.overlayModels.metricsOverlayModel;

    let colorbrewer = require('colorbrewer');
    let colColors = colorbrewer.Reds[this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics.length];
    let spanColors = colorbrewer.Oranges[this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics.length];
    this.columnMetricColors = {};
    this.spanMetricColors = {};
    for(let m in this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics) {
      this.columnMetricColors[this.openRefineProject.overlayModels.metricsOverlayModel.availableMetrics[m]] = colColors[m];
    }
    for (let m in this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics) {
      this.spanMetricColors[this.openRefineProject.overlayModels.metricsOverlayModel.availableSpanningMetrics[m]] = spanColors[m];
    }
  }
}