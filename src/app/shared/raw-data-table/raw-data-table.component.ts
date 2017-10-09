import { Component, Directive, Injectable, HostListener, 
  OnInit, AfterContentChecked, AfterViewChecked,
  Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { OpenRefineService } from '../open-refine/open-refine.service';

import { OpenRefineProject } from '../open-refine/model/open-refine-project';
import { ColumnModel } from '../open-refine/model/column-model';
import { MetricsOverlayModel } from '../open-refine/model/metrics-overlay-model';
import { Metric } from '../open-refine/model/metric';
import { Row } from '../data-model/row';

import { ContextMenuService, ContextMenuComponent } from 'angular2-contextmenu';

import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';
import * as d3Selection from 'd3-selection';

@Injectable()
@Component({
  selector: 'app-raw-data-table',
  templateUrl: './raw-data-table.component.html',
  styleUrls: ['./raw-data-table.component.scss'],
  providers: [ OpenRefineService, ContextMenuService ]
})
export class RawDataTableComponent implements OnInit, AfterContentChecked, AfterViewChecked {
  @Input() private project:OpenRefineProject;
  @Input() private metricsOverlayModel:MetricsOverlayModel;
  @Input() private columnMetricColors;
  @Input() private spanMetricColors;
  private rowModel:any[];
  private maxSize:number = 5;
  private page:number = 1;
  private itemsPerPage:number = 100;
  private rowsFrom:number = 0;
  private disabled:boolean = false;

  // external js libraries
  private tooltip;

  @ViewChild('headerCols') headerCols;
  @ViewChild('bodyCols') bodyCols;
  @ViewChild('rawDataBody') dataBody;
  @ViewChild('colOverviewHead') colHead;
  @ViewChild('spanOverviewHead') spanHead;
  @ViewChild('tableOverlay') tableOverlay;
  private overlayOffsetTop:number = 0;
  private overlayWidth:number = 0;
  private bodyHeight: number = 0;
  private colOffset: number[] = [];

  @Input() private colWidths: number[] = [];
  @Output() onOverviewMetricSelected = new EventEmitter();
  @Output() tableHeightChanged = new EventEmitter();
  @Output() pageChangedEmitter = new EventEmitter();
  @Output() metricsChangedEmitter = new EventEmitter();

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  private currentContextIndex: number = 0;

  private selectedMetricCells: any;
  private selectedMetrics: Metric[];
  private selectedColumns: string[];
  private highlightedRows: number[];

  private updated: boolean = false;

  public menuOptions = [
    {
      html: () => 'Add Metric',
      click: (metric, $event) => {
        //TODO: add metric function
      },
    },
    {
      html: (): string => 'Remove Metric',
      click: (metric, $event): void => {
      },
      enabled: (metric): boolean => {
        // check if metric exists
        return this.metricsOverlayModel.metricColumns[this.currentContextIndex].metrics[metric] != null;
      }
    }
  ];

  constructor(private openRefineService: OpenRefineService, 
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.pageChanged({page: this.page, itemsPerPage: this.itemsPerPage});

    var tip = require('d3-tip');
    this.tooltip = tip().attr('class', 'd3-tip')
      .offset([-10, 0]);

    this.selectedMetricCells = {};
    this.selectedMetrics = [];
  }

  ngAfterContentChecked() {
    // the header widhts are added to the column widths only after initializing offsets
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
      for (let metricColumn of this.metricsOverlayModel.metricColumns) {
        let offsetWidth = 4;
        for (let key in metricColumn.metrics) {
          if (metricColumn.metrics[key].dirtyIndices) {
            offsetWidth += 12;
          }
        }
        this.colOffset.push(offsetWidth);
      }
      if (this.metricsOverlayModel.spanningMetrics) {
        for (let spanMetric of this.metricsOverlayModel.spanningMetrics) {
          for (let columnName of spanMetric.spanningColumns) {
            for (let i = 0; i < this.metricsOverlayModel.metricColumns.length; i++) {
              if (this.metricsOverlayModel.metricColumns[i].columnName === columnName)
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

    }

    if (this.colHead) {
      let colBox = this.colHead.nativeElement.getBoundingClientRect();
      this.overlayOffsetTop = colBox.height;
      this.overlayWidth = colBox.width;
      this.bodyHeight = this.dataBody.nativeElement.getBoundingClientRect().height;
    }
    if (this.tableOverlay) {
      this.tableOverlay.updateOverlayPositions();
    }
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

  pageChanged(event:any):void {
    this.page = event.page;
    this.rowsFrom = ( (this.page-1) * this.itemsPerPage);
    this.openRefineService.getRows(this.rowsFrom, this.itemsPerPage)
      .subscribe(rowModel => {
        this.rowModel = rowModel;
        this.updated = true;
        this.disabled = false;
      });
    this.pageChangedEmitter.emit({from: this.rowsFrom, to: (this.rowsFrom + this.itemsPerPage)});
  }

  private onContextMenu($event: MouseEvent, item: any, index: any): void {
    this.currentContextIndex = index;
    this.contextMenuService.show.next({
      actions: this.menuOptions,
      event: $event,
      item: item
    });
    $event.preventDefault();
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
      this.selectedMetrics.push(this.metricsOverlayModel.metricColumns[cellIndex].metrics[item]);
      this.selectedColumns.push(this.metricsOverlayModel.metricColumns[cellIndex].columnName);
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

  public updateTableOverlay() {
    this.tableOverlay.fillCols();
    this.tableOverlay.fillScrollVis();
    this.tableOverlay.updateOverlayPositions();
  }
}
