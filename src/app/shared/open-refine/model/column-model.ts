import { ColumnGroup } from './column-group';

class Column {
  cellIndex: number;
  originalName: string;
  name: string;
}

export class ColumnModel {
    columns: Column[];
    keyCellIndex: number;
    keyColumnName: string;
    columnGroups: ColumnGroup[];
}
