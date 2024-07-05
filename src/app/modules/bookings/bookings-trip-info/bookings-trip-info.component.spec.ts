import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsTripInfoComponent } from './bookings-trip-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';

describe('BookingsTripInfoComponent', () => {
  let component: BookingsTripInfoComponent;
  let fixture: ComponentFixture<BookingsTripInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsTripInfoComponent],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsTripInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
