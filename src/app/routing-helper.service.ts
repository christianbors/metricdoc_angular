import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class RoutingHelperService {

  private sidebarShown = new Subject<boolean>();

  sidebarShown$ = this.sidebarShown.asObservable();

  constructor() { }

  showSidebar() {
    this.sidebarShown.next(true);
  }

  hideSidebar() {
    this.sidebarShown.next(false);
  }
}
