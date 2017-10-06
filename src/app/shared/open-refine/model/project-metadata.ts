export class ProjectMetadata {
	constructor(
	    public name: string,
	    public created: Date,
	    public modified: Date,
	    public customMetadata: any) { }
}