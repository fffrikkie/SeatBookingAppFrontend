import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingComponent } from './seat-booking.component';
import { provideHttpClient } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingsModule } from '../bookings.module';
import { Router } from '@angular/router';
import { BookingsService } from '../bookings.service';
import { BookingsApiService } from '../../../api/bookings/bookings-api.service';

describe('SeatBookingComponent', () => {
  let component: SeatBookingComponent;
  let fixture: ComponentFixture<SeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        BrowserAnimationsModule,
        BookingsModule,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#bookingRegistered() should set #step to 1', () => {
    expect(fixture.componentInstance.step).withContext('0 at first').toBe(0);
    fixture.componentInstance.bookingRegistered();
    expect(fixture.componentInstance.step)
      .withContext('1 after booking registered')
      .toBe(1);
  });
});
