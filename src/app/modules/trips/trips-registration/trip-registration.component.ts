import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from '../trips.service';
import { _Vehicle } from '../../../api/vehicles/models/vehicles.interface';
import { environment } from '../../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { _Trip } from '../../../api/trips/models/trips.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip-registration',
  templateUrl: './trip-registration.component.html',
  styleUrl: './trip-registration.component.css',
})
export class TripRegistrationComponent implements OnInit {
  destroy$: Subject<null> = new Subject();
  currDate: Date = new Date();
  vehicles?: _Vehicle[];
  routedVehicledId?: string;

  tripInfoGroup: FormGroup = new FormGroup({
    vehicle: new FormControl('', Validators.required),
    fromDestination: new FormControl('', Validators.required),
    toDestination: new FormControl('', Validators.required),
    totalSeats: new FormControl('', Validators.required),
    availableSeats: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  constructor(
    private _router: Router,
    private _tripsService: TripsService,
    private _snackbar: MatSnackBar
  ) {
    const state = this._router.getCurrentNavigation()?.extras.state;
    if (!state || !state?.['vehicleId']) this._router.navigate(['vehicles']);
    this.routedVehicledId = state?.['vehicleId'];
  }

  ngOnInit(): void {
    this._tripsService
      .getUserVehicles(environment.loggedInUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.tripInfoGroup.get('vehicle')?.valueChanges.subscribe((value) => {
            this.tripInfoGroup
              .get('totalSeats')
              ?.patchValue(
                this.vehicles?.find((vehicle) => vehicle.id === value)
                  ?.numberOfSeats
              );
            this.tripInfoGroup.get('totalSeats')?.disable();
            this.tripInfoGroup
              .get('availableSeats')
              ?.addValidators(
                Validators.max(this.tripInfoGroup.get('totalSeats')?.value)
              );
            this.tripInfoGroup
              .get('availableSeats')
              ?.patchValue(
                this.vehicles?.find((vehicle) => vehicle.id === value)
                  ?.numberOfSeats
              );
          });
          if (this.routedVehicledId)
            this.tripInfoGroup
              .get('vehicle')
              ?.patchValue(this.routedVehicledId);
        },
      });
  }

  submitTripRegistration(): void {
    let depDate: Date = this.tripInfoGroup.get('departureDate')?.value;
    const selectedTime = this.tripInfoGroup
      .get('departureTime')
      ?.value.split(':');
    depDate.setHours(selectedTime[0]);
    depDate.setMinutes(selectedTime[1]);
    this.tripInfoGroup.get('departureDate')?.patchValue(depDate);

    const newTrip: Partial<_Trip> = {
      vehicleId: this.tripInfoGroup.get('vehicle')?.value,
      startDestination: this.tripInfoGroup.get('fromDestination')?.value,
      endDestination: this.tripInfoGroup.get('toDestination')?.value,
      totalSeats: this.tripInfoGroup.get('totalSeats')?.value,
      totalAvailableSeats: this.tripInfoGroup.get('availableSeats')?.value,
      departureDateTime: depDate.toISOString(),
    };

    this._tripsService
      .registerVehicleTrip(newTrip)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._snackbar.open('Successfully Registered Trip!', 'Dismiss', {
            duration: 2000,
          });
          this.tripInfoGroup.reset();
        },
      });
  }
  goBack(): void {
    this._router.navigate(['vehicles']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
