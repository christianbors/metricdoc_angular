import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metricProjects'
})
export class ProjectListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      if(value[key].customMetadata["metricsProject"]) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}

@Pipe({
  name: 'nonMetricProjects'
})
export class NonMetricsProjectListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      if(!value[key].customMetadata["metricsProject"]) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
