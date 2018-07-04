import { 
  Component, OnInit, OnDestroy,
  Output, EventEmitter 
} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { OpenRefineService } from '../shared/open-refine/open-refine.service';
import { OpenRefineProject } from '../shared/open-refine/model/open-refine-project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ OpenRefineService ]
})
export class ProjectListComponent implements OnInit {

  refineProjects:any;
  errorMessage:String;
  sidebarShown:boolean;

  subscription: Subscription;

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