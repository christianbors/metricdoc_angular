import {
	EvalTuple
} from './eval-tuple';

export class Metric {
	constructor(
    public name: string,
    public measure: number,
    public datatype: string,
    public description: string,
    public concat: string,
    public evalTuples: EvalTuple[],
    public dirtyIndices: any[]) { }
}

export class SpanningMetric extends Metric {
  constructor(
    public name: string,
    public measure: number,
    public datatype: string,
    public description: string,
    public concat: string,
    public evalTuples: EvalTuple[],
    public dirtyIndices: any[],
    public spanningColumns: string[],
    public spanningEvaluable: string) { 
      super(name, measure, datatype, description, concat, evalTuples, dirtyIndices);
      this.spanningColumns = spanningColumns;
      this.spanningEvaluable = spanningEvaluable;
    }
}