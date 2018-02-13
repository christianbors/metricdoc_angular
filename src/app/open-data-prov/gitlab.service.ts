import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams }  from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class GitlabService {

  private gitlabUrl: string = 'http://adequate-project.semantic-web.at:5003/api/v4/projects';
  private httpOptions = new RequestOptions({
    headers: new Headers({
      'PRIVATE-TOKEN': 'xbyMmAp4NoMXJS_pPjoP'
    })
  })

  constructor(private http: Http, private jsonp: Jsonp) { }

  getProjects() : Observable<any[]> {
    return this.http.get(this.gitlabUrl + "?search=mumok", { })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCommits(projectId: any) : Observable<any> {
    // let params = this.initializeParams(projectId);
    return this.http.get(this.gitlabUrl + '/' + projectId + '/repository/commits', this.httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    // response => <string[]> response.json()[1];

    let body = res.json();
    if(body.availableMetrics 
      && body.availableSpanningMetrics 
      && body.computeDuplicates
      && body.metricColumns
      && body.spanningMetrics) {
      // this.response = body;
    }
    return body || { };
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
