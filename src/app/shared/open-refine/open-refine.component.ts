// Observable Version
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, trigger,
  state,
  style,
  transition,
  animate, keyframes }	from '@angular/core';
import { MetricsOverlayModel }	from './model/metrics-overlay-model';
import { Metric } from './model/metric';
import { ProjectMetadata }		from './model/project-metadata';
import { OpenRefineProject }	from './model/open-refine-project';
import { OpenRefineService }	from './open-refine.service';
import { RawDataTableComponent } from '../raw-data-table/raw-data-table.component'
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

  state: string = 'inactive';
  expanded: boolean = false;

  @ViewChild(RawDataTableComponent)
  private rawDataTable: RawDataTableComponent;

  projectMetadata: ProjectMetadata;
  openRefineProject: OpenRefineProject;
  rowModel: any;

  private columnMetricColors: any;
  private spanMetricColors: any;

  private selectedMetrics: Metric[];
  private selectedColumns: string[];
  private rowsFrom:number;
  private rowsTo: number;

  private detailViewOffsetTop: number;

  constructor (private openRefineService: OpenRefineService) {}

  ngOnInit() { 
  	this.getOpenRefineProject();
  	this.getProjectMetadata();
    this.openRefineService.getRows(0, 1).subscribe(rowModel => this.rowModel = rowModel);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change in comp');
    if('metricsOverlayModel' in changes) {
      console.log('model changed');
    }
  }

  getOpenRefineProject() {
    this.openRefineService.getRefineProject()
      .subscribe(
        openRefineProject => {
          this.openRefineProject = openRefineProject;
          this.sortMetricColumns();
          this.openRefineService.model = this.openRefineProject.overlayModels.metricsOverlayModel;
          let colorbrewer = require('colorbrewer');
          let colColors = colorbrewer.Reds[this.openRefineService.model.availableSpanningMetrics.length];
          let spanColors = colorbrewer.Oranges[this.openRefineService.model.availableMetrics.length];
          this.columnMetricColors = {};
          this.spanMetricColors = {};
          for(let m in this.openRefineService.model.availableMetrics) {
            this.columnMetricColors[this.openRefineService.model.availableMetrics[m]] = colColors[m];
          }
          for (let m in this.openRefineService.model.availableSpanningMetrics) {
            this.spanMetricColors[this.openRefineService.model.availableSpanningMetrics[m]] = spanColors[m];
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  getProjectMetadata() {
    this.openRefineService.getProjectMetadata()
      .subscribe(
        projectMetadata => this.projectMetadata = projectMetadata,
        error => this.errorMessage = <any>error);
  }

  sortMetricColumns() {
    let currentMetricColumns = this.openRefineProject.overlayModels.metricsOverlayModel.metricColumns;
    let sortedMetricColumns = [];
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

  toggleMove() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    this.expanded = (this.state === 'inactive' ? false : true);
  }
  //TODO: add edit commands with @Output functions

  // getRows() {
  //   this.openRefineService.getRows(0, 50)
  //     .subscribe(
  //       rows => this.rows = rows,
  //       error => this.errorMessage = <any>error)
  // }

  // addHero (name: string) {
  //   if (!name) { return; }
  //   this.heroService.addHero(name)
  //                    .subscribe(
  //                      hero  => this.heroes.push(hero),
  //                      error =>  this.errorMessage = <any>error);
  // }
}