import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-overview',
  templateUrl: './metric-overview.component.html',
  styleUrls: ['./metric-overview.component.css']
})
export class MetricOverviewComponent implements OnInit {

  constructor() { }

  public status: any = {
    isFirstOpen: false,
    isFirstDisabled: false
  };

  ngOnInit() {
  }

}
