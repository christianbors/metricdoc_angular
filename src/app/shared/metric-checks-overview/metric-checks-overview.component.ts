import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MetricsOverlayModel } from '../open-refine/model/metrics-overlay-model';
import { OpenRefineService } from '../open-refine/open-refine.service';
import { OpenRefineProject }  from '../open-refine/model/open-refine-project';

import { NgbModule, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'metric-accordion',
  templateUrl: './metric-checks-overview.component.html',
  styleUrls: ['./metric-checks-overview.component.scss'],
  providers: [ OpenRefineService ]
})
export class MetricChecksOverviewComponent implements OnInit {

  @Input() metricSelection;
  @Input() columnSelection;
  @Input() selectedEvaluable;
  @Input() project: OpenRefineProject;

  @Output() onSelectionUpdated = new EventEmitter();


  private selectionInvalid: boolean;
  private checkFeedback: string;
  private alertType: string;

  constructor(private openRefineService: OpenRefineService) { }

  public status: any = {
    isFirstOpen: false,
    isFirstDisabled: false
  };

  ngOnInit() {
  }

  public beforeChange($event: NgbPanelChangeEvent) {

  };

  onSelectionChange(entry) {
    this.metricSelection[0].datatype = entry;
    this.selectionInvalid = false;
    this.checkFeedback = null;
  }

  clickConcat(event, concat) {
    this.metricSelection[0].concat = concat;
    event.stopPropagation();
  }

  addCheck() {
    this.metricSelection[0].evalTuples.push({column: "", 
      comment:"",
      disabled:false,
      evaluable:""
    });
  }

  removeEvaluableSelection() {
    let idx: number = this.metricSelection[0].evalTuples.indexOf(this.selectedEvaluable, 0);
    if (idx > -1) {
      this.metricSelection[0].evalTuples.splice(idx, 1);
    } else {
      if (this.metricSelection[0].spanningEvaluable === this.selectedEvaluable) {
        this.metricSelection[0].spanningEvaluable = null;
      }
    }
  }

  disableEvaluableSelection() {
    this.selectedEvaluable.disabled = !this.selectedEvaluable.disabled;
  }

  onSelectEvaluable(evaluable) {
    this.selectedEvaluable = evaluable;
  }

  checkValidity(event) {
    if(event.key === "Enter") {
      //TODO: save evaluable to metric
      this.metricSelection[0].dirtyIndices = [];
      this.openRefineService.updateMetric(this.metricSelection[0], this.columnSelection[0])
        .subscribe(response => {
          // console.log("success");
          this.metricSelection[0] = response;
          this.openRefineService.evaluateSelection(this.metricSelection, this.columnSelection)
            .subscribe(response => {
              this.metricSelection = response.metricList;
              this.onSelectionUpdated.emit({metrics: this.metricSelection, columns: this.columnSelection});
              console.log(this.metricSelection[0].measure);
            });
        });
    }
    let col = this.project.columnModel.columns.find((value, idx, col) => {
      let colName = this.columnSelection[0];
      if (typeof colName != "string" && this.columnSelection[0].length > 1) {
        colName = this.columnSelection[0][0];
      }
      return value.name == colName;
    });
    this.openRefineService.previewExpression(this.selectedEvaluable.evaluable, col.cellIndex)
      .subscribe(response => {
        this.checkFeedback = response.message;

        if(response.code === "error") {
          this.selectionInvalid = true;
          this.alertType = "danger";
        } else {
          this.selectionInvalid = false;
          this.alertType = "info";
        }
      });
  }

}
