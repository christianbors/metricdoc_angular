import { Component, HostBinding, AnimationTransitionEvent } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalNavService } from './global-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ GlobalNavService ]
})
export class AppComponent {
  private sidebarShown:boolean = true;
  private navbarPos:string;
  private projectId:string;

  constructor(private router: Router, private globalNavService: GlobalNavService) {
    router.events.subscribe(
      (change:any) => {
        if(change instanceof NavigationEnd) {
          this.navbarPos = change.urlAfterRedirects;

          if (change.urlAfterRedirects.includes('metric-project')) {
            this.sidebarShown = false;
            this.projectId = change.url.substr(16);
          } else {
            this.sidebarShown = true;
          }
        }
      });
  }

  onRecalculate() {
    this.globalNavService.onRecalculate();
  }

  // this.nodeService.getNode(path)
  //   .subscribe(
  //       node => {
  //           this.nodeService.addNode(node);
  //       },
  //       err => {
  //           console.log(err);
  //       }
  //   );
}
