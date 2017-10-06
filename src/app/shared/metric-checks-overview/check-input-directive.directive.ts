import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appCheckInputDirective]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckInputDirectiveDirective, multi: true}]
})
export class CheckInputDirectiveDirective {

  constructor() { }

  
}
