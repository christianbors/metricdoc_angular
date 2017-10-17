import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingHelperService } from './routing-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ RoutingHelperService ]
})
export class AppComponent {
  private sidebarShown:boolean = true;

  constructor(private routingHelperService: RoutingHelperService) {
    routingHelperService.sidebarShown$.subscribe(
      sidebarShown => {
        this.sidebarShown = sidebarShown;
        console.log("show sidebar: " + this.sidebarShown);
      });
  }

  // onNavigated(showSidebar: boolean) {
  //   this.sidebarShown = showSidebar;
  // }
}
