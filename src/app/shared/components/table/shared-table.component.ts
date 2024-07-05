import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { _TableColumnConfig } from '../../models/table-column-config.interface';
import { _TableActionResponse } from '../../models/table-action-response.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.css',
})
export class SharedTableComponent implements OnChanges {
  @Input() listObservable$!: Observable<unknown[]>;
  @Input() columnConfig?: _TableColumnConfig[];
  @Input() loadingData?: boolean;
  @Output() actionIconClicked: EventEmitter<_TableActionResponse<any>> =
    new EventEmitter();

  displayedColumns: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columnConfig'])
      this.displayedColumns = changes['columnConfig'].currentValue.map(
        (column: _TableColumnConfig) => column.attributeValueName
      );
  }

  handleActionClick(action: string, element: any): void {
    this.actionIconClicked?.emit({ action: action, element: element });
  }
}
