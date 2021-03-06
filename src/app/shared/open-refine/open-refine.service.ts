import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, URLSearchParams }	from '@angular/http';
import { FormsModule, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MetricsOverlayModel } from './model/metrics-overlay-model';
import { OpenRefineProject } from './model/open-refine-project';
import { MetricFunction } from './model/metric-function';

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

  private model: MetricsOverlayModel;

  constructor (private http: Http, private jsonp: Jsonp) {
  	// this.params = new URLSearchParams();
  	// //TODO: replace with variable parameter
  }

  private extractData(res: Response) {
  	// response => <string[]> response.json()[1];

    let body = res.json();
    if(body.availableMetrics 
      && body.availableSpanningMetrics 
      && body.computeDuplicates
      && body.metricColumnNames
      && body.spanningMetrics) {
      this.model = body;
    }
    return body || { };
  }

  createOpenRefineMetricsProject(projectName: any, projectId: string, commit_short: any, format: string, separator: string, content: any) : Observable<MetricsOverlayModel> {
    let params:URLSearchParams = new URLSearchParams();

    // let data = {
    //   'project-name': projectName,
    //   'format': format,
    //   'project-file': content
    // }
    
    let opt = {
      guessCellValueTypes:true,
      projectTags:[projectId, commit_short],
      ignoreLines:-1,
      processQuotes:true,
      fileSource: content,
      encoding:"",
      separator: separator,
      storeBlankCellsAsNulls:true,
      storeBlankRows:true,
      skipDataLines:0,
      includeFileSources:false,
      headerLines:1,
      limit:-1,
      projectName: projectName
    };

    let body = new FormData();
    body.append("download", content);

    params.set("project-name", projectName);
    params.set("format", format);
    params.set("options", JSON.stringify(opt));
    params.set("project-file", content);


    return this.http.post(this.openRefineServerUrl + 'core/create-project-from-upload', body, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  setupProject(projectId: any, metricFunctions: any) : Observable<MetricsOverlayModel> {
    let params = this.initializeParams(projectId);
    params.set('computeDuplicates', 'false');
    // new HttpParams().set('metricsConfigList', JSON.stringify(metricFunctions))
    if (metricFunctions)
      params.set('metricsConfigList', JSON.stringify(metricFunctions));
    // let body = new FormData();
    // body.append("metricsConfigList", );

    return this.http.post(this.openRefineServerUrl + 'metric-doc/createMetricsExtension', params)//{ metricsConfigList: JSON.stringify(metricFunctions)}, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  recommendMetrics(projectId: any) : Observable<MetricFunction[]> {
    let params = this.initializeParams(projectId);
    return this.http.get(this.openRefineServerUrl + 'metric-doc/recommend-metrics', { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllProjectMetadata() : Observable<any> {
    return this.http.get(this.openRefineServerUrl + 'core/get-all-project-metadata', {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getOverlayModel (projectId: any) : Observable<MetricsOverlayModel> {

  	return this.http.get(this.openRefineServerUrl + 'metric-doc/getMetricsOverlayModel', { search: this.initializeParams(projectId) })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getProjectMetadata (projectId: any) {
  	return this.http.get(this.openRefineServerUrl + 'core/get-project-metadata', { search: this.initializeParams(projectId) })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getRefineProject (projectId: any) : Observable<OpenRefineProject> {
  	return this.http.get(this.openRefineServerUrl + 'core/get-models', { search: this.initializeParams(projectId) })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getHistory (projectId: any) {
    return this.http.get(this.openRefineServerUrl + 'core/get-history', { search: this.initializeParams(projectId) })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRows (projectId: any, first: any, limit: any) {
    let params = this.initializeParams(projectId);
    params.set('project', projectId);
  	params.set('start', first);
  	params.set('limit', limit);
  	return this.http.get(this.openRefineServerUrl + 'core/get-rows', { search: params })
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  updateMetric (projectId: any, metric: any, column: any) {
    let params = this.initializeParams(projectId);
    params.set('metric', JSON.stringify(metric));
    if(column instanceof Array) {
      params.set('columns', JSON.stringify(column));
    } else {
      params.set('column', column);
    }
    return this.http.post(this.openRefineServerUrl + 'metric-doc/updateMetric', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteMetric (projectId: any, metric: any, column: any) {
    let params = this.initializeParams(projectId)
    params.set('metricName', metric.name);
    if(column instanceof Array) {
      params.set('columns', JSON.stringify(column));
    } else {
      params.set('column', column);
    }
    return this.http.post(this.openRefineServerUrl + 'metric-doc/deleteMetric', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  evaluateMetrics (projectId: string) :Observable<MetricsOverlayModel> {
    return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateMetrics', this.initializeParams(projectId))
      .map(this.extractData)
      .catch(this.handleError);
  }

  evaluateSelection (projectId: any, metricSelection: any[], columnSelection: any[]) {
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
    let params = this.initializeParams(projectId);
    params.set('selection', JSON.stringify(selection));
    return this.http.post(this.openRefineServerUrl + 'metric-doc/evaluateSelectedMetric', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  previewExpression (projectId: any, expression: string, cellIdx: any) {
    let rowIdx: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let params = this.initializeParams(projectId);
    params.set('rowIndices', JSON.stringify(rowIdx));
    params.set('expression', 'grel:'+ expression);
    params.set('cellIndex', cellIdx);
    return this.http.post(this.openRefineServerUrl + 'core/preview-expression', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMetricDocFunctionsOverview () {
    return this.http.get(this.openRefineServerUrl + 'metric-doc/get-metricdoc-language-info')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProvenanceJSON(path: string) {
    this.http.get(path)
      .toPromise()
      .then((response) => {
        return response.json();
      }).catch((err) => {
      console.log(err);
    });
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

  private initializeParams(projectId: any):URLSearchParams {
    let params:URLSearchParams = new URLSearchParams();
    params.set('project', projectId);
    return params;
  }
}
