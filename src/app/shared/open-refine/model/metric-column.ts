import {
	Metric
} from './metric';

export class MetricColumn {
	constructor(
  	public columnName: string,
    public metrics: Metric[],
    public availableMetrics: string[],
    public availableSpanningMetrics: string[],
    public computeDuplicates: boolean) { }
}