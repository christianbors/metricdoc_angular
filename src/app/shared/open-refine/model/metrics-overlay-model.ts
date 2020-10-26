import { MetricColumn } from './metric-column';
import { SpanningMetric } from './metric';

export class MetricsOverlayModel {
  constructor(
  	public metricColumnNames: MetricColumn[],
    public availableMetrics: string[],
    public availableSpanningMetrics: string[],
    public computeDuplicates: boolean,
    public spanningMetrics: SpanningMetric[]) { }
}