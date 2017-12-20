import { Component, OnInit } from '@angular/core';

import { OpenRefineService } from '../shared/open-refine/open-refine.service';

@Component({
  selector: 'app-metric-browser',
  templateUrl: './metric-browser.component.html',
  styleUrls: ['./metric-browser.component.sass'],
  providers: [ OpenRefineService ]
})
export class MetricBrowserComponent implements OnInit {

  availableMetrics:any[];

  constructor(private openRefineService: OpenRefineService) {
    this.openRefineService.getMetricDocFunctionsOverview().subscribe(
      availableMetrics => {
        this.availableMetrics = availableMetrics;
      });
  }

  ngOnInit() {
  }

}
