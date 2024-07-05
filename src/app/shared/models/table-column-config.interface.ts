import { _TableColumnTypes } from './table-column-types.enum';

export interface _TableColumnConfig {
  type: _TableColumnTypes;
  columnName: string;
  attributeValueName: string;
  tooltip?: string;
  icon?: string;
  iconColour?: string;
}
