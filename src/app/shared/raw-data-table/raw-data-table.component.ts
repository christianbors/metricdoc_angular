import { Component, Directive, Injectable, HostListener, 
  OnInit, AfterContentChecked, AfterViewChecked,
  Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { OpenRefineService } from '../open-refine/open-refine.service';

import { OpenRefineProject } from '../open-refine/model/open-refine-project';
import { ColumnModel } from '../open-refine/model/column-model';
import { MetricsOverlayModel } from '../open-refine/model/metrics-overlay-model';
import { Metric } from '../open-refine/model/metric';
import { Row } from '../data-model/row';

import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';

import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Injectable()
@Component({
  selector: 'app-raw-data-table',
  templateUrl: './raw-data-table.component.html',
  styleUrls: ['./raw-data-table.component.scss'],
  providers: [ OpenRefineService ]
})
export class RawDataTableComponent implements OnInit, AfterContentChecked, AfterViewChecked {
  @Input() projectId:any;
  @Input() project:OpenRefineProject;
  @Input() columnMetricColors;
  @Input() spanMetricColors;
  // metricsOverlayModel:MetricsOverlayModel;

  colWidths: number[] = [];
  rowModel:any[];
  maxSize:number = 5;
  page:number = 1;
  itemsPerPage:number = 100;
  rowsFrom:number = 0;
  disabled:boolean = false;

  // external js libraries
  tooltip;

  @ViewChild('headerCols', {static: false}) headerCols;
  @ViewChild('bodyCols', {static: false}) bodyCols;
  @ViewChild('rawDataBody', {static: false}) dataBody;
  @ViewChild('colOverviewHead', {static: false}) colHead;
  @ViewChild('spanOverviewHead', {static: false}) spanHead;
  @ViewChild('tableOverlay', {static: false}) tableOverlay;
  overlayOffsetTop:number = 0;
  overlayWidth:number = 0;
  bodyHeight: number = 0;
  colOffset: number[] = [];

  @Output() onOverviewMetricSelected = new EventEmitter();
  @Output() tableHeightChanged = new EventEmitter();
  @Output() pageChangedEmitter = new EventEmitter();
  @Output() sortEmitter = new EventEmitter();

  @ViewChild('existingMetric', {static: false}) public existingMenu: ContextMenuComponent;
  @ViewChild('newMetric', {static: false}) public newMenu: ContextMenuComponent;

  selectedMetricCells: any;
  selectedMetrics: Metric[];
  selectedColumns: string[];
  highlightedRows: number[];
  contextColumn: any;

  updated: boolean = false;
  changeDetected: boolean = false;
  oldColumns: any[];

  constructor(protected openRefineService: OpenRefineService,
    protected contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.pageChanged({ 
      page: this.page, 
      itemsPerPage: this.itemsPerPage 
    });

    // var tip = require('d3-tip');
    this.tooltip = d3Tip().attr('class', 'd3-tip')
      .offset([-10, 0]);

    this.selectedMetricCells = {};
    this.selectedMetrics = [];
  }

  ngAfterContentChecked() {
    // the header widhts are added to the column widths only after initializing offsets
    this.calculateColWidths();
  }

  ngAfterViewChecked() {
    if(this.updated) {
      this.highlightRows();
      if(this.highlightedRows && this.highlightedRows.length > 0)
        this.scrollToRow(this.highlightedRows[0]);
      this.updated = false;
    }
    d3.selectAll('table.metrics-overview thead tr.overview-row th')
      .data(this.colWidths)
      .each(function(data, index) {
        d3.select(this).select('svg')
          .style('width', data);
      });
  }

  ngDoCheck() {
    if(this.project) {
      if (this.project.columnModel.columns !== this.oldColumns) {
        this.changeDetected = true;
        this.colOffset = [];
        this.oldColumns = this.project.columnModel.columns;
      }

      this.changeDetected = false;
    }
  }

  pageChanged(event:any):void {
    this.page = event.page;
    this.rowsFrom = ( (this.page-1) * this.itemsPerPage);
    this.openRefineService.getRows(this.projectId, this.rowsFrom, this.itemsPerPage)
      .subscribe(rowModel => {
        this.rowModel = rowModel;
        this.updated = true;
        this.disabled = false;
      });
    this.pageChangedEmitter.emit({from: this.rowsFrom, to: (this.rowsFrom + this.itemsPerPage)});
  }

  private onContextMenu($event: MouseEvent, item: any, metric: any): void {
    this.contextColumn = item.columnName;
    let metricContext = item.metrics[metric];
    if (metricContext) {
      this.contextMenuService.show.next({
        // Optional - if unspecified, all context menu components will open
        contextMenu: this.existingMenu,
        event: $event,
        item: metricContext
      });
    } else {
      this.contextMenuService.show.next({
        contextMenu: this.newMenu,
        event: $event,
        item: metric
      })
    }
    $event.preventDefault();
    $event.stopPropagation();
    // this.contextMenuService.show.next({
    //   actions: this.menuOptions,
    //   event: $event,
    //   item: item
    // });
  }

  private onClickOverview($event: MouseEvent, item: any, cellIndex: any): void {
    let previousMetrics = this.selectedMetrics;
    let previousColumns = this.selectedColumns;
    this.selectedColumns = [];
    this.selectedMetrics = [];

    if ($event.shiftKey) {
      this.selectedMetrics = this.selectedMetrics.concat(previousMetrics);
      this.selectedColumns = this.selectedColumns.concat(previousColumns);
    } else {
      this.selectedMetricCells = {};
    }
    if (!this.selectedMetricCells[item]) {
      this.selectedMetricCells[item] = [cellIndex];
    } else {
      this.selectedMetricCells[item].push(cellIndex);
    }
    if(item.spanningColumns) {
      this.selectedMetrics.push(item);
      this.selectedColumns.push(item.spanningColumns);
    } else {
      this.selectedMetrics.push(this.project.overlayModels.metricsOverlayModel.metricColumns[cellIndex].metrics[item]);
      this.selectedColumns.push(this.project.overlayModels.metricsOverlayModel.metricColumns[cellIndex].columnName);
    }
    this.onOverviewMetricSelected.emit({metrics: this.selectedMetrics, columns: this.selectedColumns});
    this.tableHeightChanged.emit(this.colHead.nativeElement.getBoundingClientRect().height + this.spanHead.nativeElement.getBoundingClientRect().height);
  }

  private onClickRect($event: MouseEvent) {
    let rect:any = $event.target;
    this.highlightedRows = [];
    this.highlightedRows.push(rect.__data__.index);
    this.scrollToRow(rect.__data__.index);
    this.highlightRows();
  }

  public scrollRows(rows: number[]) {
    this.disabled = true;
    this.highlightedRows = [];
    for (let it in rows) {
      this.highlightedRows.push(rows[it]%this.itemsPerPage);
    }
    if(rows[0] < this.rowsFrom || rows[0] > (this.rowsFrom + this.itemsPerPage)) {
      this.page = Math.floor(rows[0]/this.itemsPerPage)+1;
      this.rowsFrom = ( (this.page-1) * this.itemsPerPage);
    } else {
      this.highlightRows();
      this.scrollToRow(rows[0]);
    }
  }

  private highlightRows() {
    if(this.highlightedRows && this.highlightedRows.length > 0) {
      d3.select(this.dataBody.nativeElement).selectAll('tr').classed('highlight', false);
      for (let rowIdx of this.highlightedRows) {
        let truncRow = rowIdx%this.itemsPerPage;
        d3.select(this.dataBody.nativeElement.childNodes[truncRow + 2]).classed('highlight', true);
      }
    }
  }

  private scrollToRow(row: number) {
    let truncRow = row%this.itemsPerPage;
    let selectedRow = this.dataBody.nativeElement.childNodes[truncRow + 2];
    let scrollHeight = selectedRow.offsetTop - this.dataBody.nativeElement.offsetTop;
    let duration = (Math.abs(this.dataBody.nativeElement.scrollTop - scrollHeight))*0.5;

    d3.select('tbody.metrics-overview')
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .tween('scroll', (offset:number, {}) => {
        let i = d3.interpolateNumber(this.dataBody.nativeElement.scrollTop, scrollHeight);
        return t => this.dataBody.nativeElement.scrollTop = i(t);
      });
  }

  public changePage($event: MouseEvent) {
    this.highlightedRows = [];
    this.scrollToRow(0);
    this.disabled = true;
  }

  // public checkHighlighted(rowIndex: number): string {
  //   if (this.highlightedRows && this.highlightedRows.indexOf(rowIndex) != -1) {
  //     return 'highlight';
  //   }
  // }

  public checkValues(item: any, cellIndex: any): string {
    if (this.selectedMetricCells[item]) {
      if (this.selectedMetricCells[item].indexOf(cellIndex) >= 0)
        return 'active';
    }
  }

  public handleSelectionUpdated($event: any) {
    console.log("selection updated... do something?");
  }

  public handleSort($event: MouseEvent, sortBy: string) {
    this.sortEmitter.emit(sortBy);
  }

  // public updateTableOverlay() {
  //   this.tableOverlay.fillCols();
  //   this.tableOverlay.fillScrollVis();
  //   this.tableOverlay.updateOverlayPositions();
  // }

  deleteMetric(metric: Metric) {
    console.log('test delete metric' + metric.name);
    this.openRefineService.deleteMetric(this.projectId, metric, this.contextColumn).subscribe(d => console.log(d));
  }

  private calculateColWidths() {
    if (this.headerCols && this.colOffset.length > 0) {
      for (let i = 1; i < this.headerCols.nativeElement.children.length; ++i) {
        if (this.colWidths[i] < this.headerCols.nativeElement.children[i].offsetWidth) {
          this.colWidths[i] = this.headerCols.nativeElement.children[i].offsetWidth;
        }
      }
    }
    if (this.headerCols && this.bodyCols && this.colOffset.length == 0) {
      this.colWidths = [];
      
      // push first empty column width
      this.colWidths.push(this.headerCols.nativeElement.children[0].offsetWidth);

      for (let i = 1; i < this.bodyCols.nativeElement.children.length; ++i) {
        this.colWidths.push(this.bodyCols.nativeElement.children[i].offsetWidth);
      }

      this.colOffset = [];
      this.colOffset.push(0);
      for (let metricColumn of this.project.overlayModels.metricsOverlayModel.metricColumns) {
        let offsetWidth = 4;
        for (let key in metricColumn.metrics) {
          if (metricColumn.metrics[key].dirtyIndices) {
            offsetWidth += 12;
          }
        }
        this.colOffset.push(offsetWidth);
      }
      if (this.project.overlayModels.metricsOverlayModel.spanningMetrics) {
        for (let spanMetric of this.project.overlayModels.metricsOverlayModel.spanningMetrics) {
          for (let columnName of spanMetric.spanningColumns) {
            for (let i = 0; i < this.project.overlayModels.metricsOverlayModel.metricColumns.length; i++) {
              if (this.project.overlayModels.metricsOverlayModel.metricColumns[i].columnName === columnName)
                this.colOffset[i+1] += 12;
            }
          }
        }
      }
      for (let i = 0; i < this.colWidths.length; ++i) {
        this.colWidths[i] += this.colOffset[i];
      }
      
      d3.selectAll('table.metrics-overview thead tr.overview-row th')
        .data(this.colWidths)
        .each(function(data, index) {
          d3.select(this).select('svg')
            .style('paddingTop', 0)
            .style('paddingBottom', 0)
            .style('paddingRight', 0)
            .style('paddingLeft', 6);
        });
      d3.selectAll('table.metrics-overview thead tr.column-names *')
        .data(this.colWidths)
        .each(function(data, index) {
          d3.select(this)
            .style('paddingTop', 0)
            .style('paddingBottom', 0)
            .style('paddingRight', 0)
            .style('paddingLeft', 6);
      });
      this.tableOverlay.fillCols();
      this.tableOverlay.fillScrollVis();
    }
    if (this.tableOverlay) {
      this.tableOverlay.updateOverlayPositions();
    }
    if (this.colHead && this.dataBody) {
        let colBox = this.colHead.nativeElement.getBoundingClientRect();
        this.overlayOffsetTop = colBox.height;
        this.overlayWidth = colBox.width;
        this.bodyHeight = this.dataBody.nativeElement.getBoundingClientRect().height;
      }
  }
}
