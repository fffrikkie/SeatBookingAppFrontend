import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesOverviewComponent } from './vehicles-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VehiclesListComponent } from '../vehicles-list/vehicles-list.component';
import {
  HttpClient,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { VehicleRegistrationComponent } from '../vehicles-registration/vehicle-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VehiclesOverviewComponent', () => {
  let component: VehiclesOverviewComponent;
  let fixture: ComponentFixture<VehiclesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VehiclesOverviewComponent,
        VehiclesListComponent,
        VehicleRegistrationComponent,
      ],
      imports: [
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
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
