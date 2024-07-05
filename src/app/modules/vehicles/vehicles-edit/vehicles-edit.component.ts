import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { _Vehicle } from '../../../api/vehicles/models/vehicles.interface';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.component.html',
  styleUrl: './vehicles-edit.component.css',
})
export class VehiclesEditComponent implements OnDestroy {
  vehicle?: _Vehicle;
  destroy$: Subject<null> = new Subject();
  vehicleInfoGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    make: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    variant: new FormControl('', Validators.required),
    registrationYear: new FormControl('', Validators.required),
    numberOfSeats: new FormControl('', Validators.required),
  });

  constructor(
    private _router: Router,
    private _vehiclesService: VehiclesService,
    private _snackbar: MatSnackBar
  ) {
    this.vehicle = this._router.getCurrentNavigation()?.extras
      .state as _Vehicle;

    this.vehicleInfoGroup.patchValue(this.vehicle);
  }

  submitVehicleUpdates(): void {
    if (this.vehicleInfoGroup.valid) {
      this._vehiclesService
        .updateVehicle(this.vehicleInfoGroup.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this._snackbar.open('Vehicle Successfully Updated!', 'Dismiss', {
              duration: 2000,
              panelClass: ['success-snackbar'],
            });
          },
        });
    }
  }

  goBack(): void {
    this._router.navigate(['vehicles']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
