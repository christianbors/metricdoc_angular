import { ColumnModel } from './column-model';

export class OpenRefineProject {
	constructor(
		public id: number,
	    public rows: string[],
	    public columnModel: ColumnModel,
	    public recordModel: any,
	    public overlayModels: any) { }
}