import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalNavService {
  private recalc = new Subject<string>();
  recalc$ = this.recalc.asObservable();

  constructor() { }

  onRecalculate() {
    this.recalc.next('test');
  }
}
