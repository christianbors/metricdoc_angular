import { Component, OnInit } from '@angular/core';
import { OpenRefineService } from '../shared/open-refine/open-refine.service';

@Component({
  selector: 'app-provenance',
  templateUrl: './refine-provenance.component.html',
  styleUrls: ['./refine-provenance.component.sass'],
  providers: [ OpenRefineService ]
})
export class RefineProvenanceComponent implements OnInit {

  refineProjects:any;
  errorMessage:String;

  constructor(protected openRefineService: OpenRefineService) { 

    this.openRefineService.getAllProjectMetadata().subscribe(
      refineProjects => {
          this.refineProjects = refineProjects.projects;
          // console.log(this.refineProjects.projects);
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
  }

}
