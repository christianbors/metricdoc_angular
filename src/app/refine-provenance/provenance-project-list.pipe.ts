import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'provenanceProjectList'
})
export class ProvenanceProjectListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      if (value[key].customMetadata["hasProvenance"] && value[key].customMetadata["hasProvenance"] === true) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}

@Pipe({
  name: 'nonProvenanceProjectList'
})
export class NonProvenanceProjectListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      if (!value[key].customMetadata["hasProvenance"] || value[key].customMetadata["hasProvenance"] === false) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
