import { Component, OnInit } from '@angular/core';

import { ProjectMetadata }		from '../open-refine/model/project-metadata';
import { OpenRefineService }	from '../open-refine/open-refine.service';



@Component({
	selector: 'app-metadata-test',
	templateUrl: './metadata-test.component.html',
	styleUrls: ['./metadata-test.component.css'],
	providers: [ OpenRefineService ]
})
export class MetadataTestComponent implements OnInit {
	private projectMetadata: ProjectMetadata;

	constructor(private openRefineService: OpenRefineService) { }

	ngOnInit() {
		this.getProjectModels();
	}

	getProjectModels() {
		this.openRefineService.getProjectMetadata()
			.subscribe(projectMetadata => 
				this.projectMetadata = projectMetadata);
	}

}
