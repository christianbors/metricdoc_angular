import { MetricColumn } from './metric-column';
import { SpanningMetric } from './metric';

export class MetricsOverlayModel {
  constructor(
  	public metricColumns: MetricColumn[],
    public availableMetrics: string[],
    public availableSpanningMetrics: string[],
    public computeDuplicates: boolean,
    public spanningMetrics: SpanningMetric[]) { }
}