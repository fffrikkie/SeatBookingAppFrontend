import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../vehicles.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrl: './vehicle-registration.component.css',
})
export class VehicleRegistrationComponent implements OnDestroy {
  @Output() vehicleRegistered: EventEmitter<boolean> = new EventEmitter();
  destroy$: Subject<null> = new Subject();
  vehicleInfoGroup: FormGroup = new FormGroup({
    ownerName: new FormControl(environment.loggedInUser, Validators.required),
    make: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    variant: new FormControl('', Validators.required),
    registrationYear: new FormControl('', Validators.required),
    numberOfSeats: new FormControl('', Validators.required),
  });

  constructor(
    private _vehiclesService: VehiclesService,
    private _snackbar: MatSnackBar
  ) {}

  submitVehicleRegistration(): void {
    if (this.vehicleInfoGroup.valid) {
      this._vehiclesService
        .registerUserVehicle(this.vehicleInfoGroup.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this._snackbar.open('Vehicle Successfully Added!', 'Dismiss', {
              duration: 2000,
              panelClass: 'success-snackbar',
            });
            this.vehicleRegistered.emit(true);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
