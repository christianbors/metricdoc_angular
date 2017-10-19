import { Component, HostBinding, AnimationTransitionEvent } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private sidebarShown:boolean = true;
  private navbarPos:string;

  constructor(private router: Router) {
    router.events.subscribe(
      (change:any) => {
        if(change instanceof NavigationEnd) {
          this.navbarPos = change.urlAfterRedirects;

          if (change.urlAfterRedirects.includes('metric-project')) {
            this.sidebarShown = false;
          } else {
            this.sidebarShown = true;
          }
          console.log('show sidebar: ' + this.sidebarShown);
        }
      });
  }
}
