import { Metric } from './metric';
import { EvalTuple } from './eval-tuple';

export class MetricFunction {
  constructor (
    public description: string,
    public evalTuple: EvalTuple,
    public params: String,
    public call: any
    ) { }
}