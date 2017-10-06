import { Injectable }								from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams }	from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MetricsOverlayModel } from './model/metrics-overlay-model';
import { OpenRefineProject } from './model/open-refine-project';

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-open-refine',
//   templateUrl: './open-refine.component.html',
//   styleUrls: ['./open-refine.component.css']
// })
@Injectable()
export class OpenRefineService {
  private openRefineServerUrl = 'http://localhost:3333/command/';
  private isSuccess;
  private params;

  model: MetricsOverlayModel;

  constructor (private http: Http, private jsonp: Jsonp) {
  	this.params = new URLSearchParams();
  	//TODO: replace with variable parameter
    this.params.set('project', '2130755782250');
  }

  private extractData(res: Response) {
  	// response => <string[]> response.json()[1];
    this.params = new URLSearchParams();
    this.params.set('project', '2130755782250');

    let body = res.json();
    if(body.availableMetrics 
      && body.availableSpanningMetrics 
      && body.computeDuplicates
      && body.metricColumns
      && body.spanningMetrics) {
      this.model = body;
    }
    return body || { };
  }

  getOverlayModel () : Observable<MetricsOverlayModel> {  	
  	return this.http.get(this.openRefineServerUrl + 'metric-doc/getMetricsOverlayModel', { search: this.params })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getProjectMetadata () {
  	return this.http.get(this.openRefineServerUrl + 'core/get-project-metadata', { search: this.params })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getRefineProject () : Observable<OpenRefineProject> {
  	return this.http.get(this.openRefineServerUrl + 'core/get-models', { search: this.params })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getRows (first: number, limit: number) {
  	this.params.set('start', first);
  	this.params.set('limit', limit);
  	return this.http.get(this.openRefineServerUrl + 'core/get-rows', { search: this.params })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  updateMetric ( metric: any, column: any) {
    this.params.set('metric', JSON.stringify(metric));
    if(column instanceof Array) {
      this.params.set('columns', JSON.stringify(column));
    } else {
      this.params.set('column', column);
    }
    return this.http.post(this.openRefineServerUrl + 'metric-doc/updateMetric', this.params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  evaluateMetrics () {
    return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateMetrics', this.params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  evaluateSelection (metricSelection: any[], columnSelection: String[]) {
    let selection = [];
    for (let selIdx = 0; selIdx < metricSelection.length; ++selIdx) {
      metricSelection[selIdx].dirtyIndices = [];
      metricSelection[selIdx].measure = 0;
      if(columnSelection[selIdx] instanceof Array) {
        selection.push({ metric: JSON.stringify(metricSelection[selIdx]), columns: JSON.stringify(columnSelection[selIdx]) });
      } else {
        selection.push({metric: JSON.stringify(metricSelection[selIdx]), column: columnSelection[selIdx]});
      }
    }
    this.params.set('selection', JSON.stringify(selection));
    return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateSelectedMetric', this.params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  previewExpression (expression: string, cellIdx: any) {
    let rowIdx: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.params.set('rowIndices', JSON.stringify(rowIdx));
    this.params.set('expression', 'grel:'+ expression);
    this.params.set('cellIndex', cellIdx);
    return this.http.post(this.openRefineServerUrl + 'core/preview-expression', this.params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      const errormsg = JSON.parse(body.message);
      errMsg = `${errormsg.message || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
