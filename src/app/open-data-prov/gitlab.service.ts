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
    return this.http.get(this.gitlabUrl + '/' + projectId + '/repository/commits?per_page=100', this.httpOptions) //?since=2017-01-01T00:00:00Z
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCommit(projectId: any, commitId: any) : Observable<any> {
    let id = commitId;
    if(commitId.id)
      id = commitId.id;
    return this.http.get(this.gitlabUrl + '/' + projectId + '/repository/commits/' + id, this.httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //todo extend to fetch file information (csv, etc., meta-information)
  getRawFileUrl(projectId: string, filename: string, commit: string) : string {
    let searchParams = new URLSearchParams();
    searchParams.set("ref", commit);
    // replace folder structure elements
    filename = filename.replace("/", "%2F");
    return this.gitlabUrl + '/' + projectId + "/repository/files/" + filename + "/raw?ref=" + commit;
    // return this.http.get(this.gitlabUrl + '/' + projectId + "/repository/files/" + filename + "/raw", { search: searchParams })
    //   .map(response => response.text())
    //   // .map(this.extractData)
    //   .catch(this.handleError);
  }

  private extractData(res: Response) {
    // response => <string[]> response.json()[1];

    let body = res.json();
    if(body.availableMetrics 
      && body.availableSpanningMetrics 
      && body.computeDuplicates
      && body.metricColumnNames
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
