import { OnInit, Component, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  elementAt,
  finalize,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { VehiclesService } from '../vehicles.service';
import { _Vehicle } from '../../../api/vehicles/models/vehicles.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { _TableColumnConfig } from '../../../shared/models/table-column-config.interface';
import { _TableColumnTypes } from '../../../shared/models/table-column-types.enum';
import { _TableActionResponse } from '../../../shared/models/table-action-response.interface';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnDestroy {
  reload$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  destroy$: Subject<null> = new Subject();

  columnnConfig: _TableColumnConfig[] = [
    {
      columnName: 'Vehicle Name',
      attributeValueName: 'displayName',
      type: _TableColumnTypes.text,
    },
    {
      columnName: '# of Seats',
      attributeValueName: 'numberOfSeats',
      type: _TableColumnTypes.text,
    },
    {
      columnName: '',
      attributeValueName: 'edit',
      type: _TableColumnTypes.action,
      tooltip: 'Edit Vehicle Details',
      icon: 'edit',
      iconColour: 'black',
    },
    {
      columnName: '',
      attributeValueName: 'addTrip',
      type: _TableColumnTypes.action,
      tooltip: 'Register Vehicle Trip',
      icon: 'add_location',
      iconColour: 'blue',
    },
    {
      columnName: '',
      attributeValueName: 'viewTrips',
      type: _TableColumnTypes.action,
      tooltip: 'View Vehicle Trips',
      icon: 'map',
      iconColour: 'green',
    },
    {
      columnName: '',
      attributeValueName: 'delete',
      type: _TableColumnTypes.action,
      tooltip: 'Delete Vehicle',
      icon: 'delete',
      iconColour: 'red',
    },
  ];
  dataSource?: _Vehicle[];
  loading: boolean = true;

  vehiclesData$: Observable<_Vehicle[]> = this.reload$.pipe(
    switchMap(() =>
      this._vehicleService.getUserVehicles(environment.loggedInUser).pipe(
        takeUntil(this.destroy$),
        map((vehicles) => {
          this.dataSource = vehicles;
          return this.dataSource;
        }),
        finalize(() => (this.loading = false))
      )
    )
  );

  constructor(
    private _vehicleService: VehiclesService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  updateVehicle(vehicleDetails: _Vehicle): void {
    this._router.navigate(['vehicles/vehicles-edit'], {
      state: vehicleDetails,
    });
  }

  registerVehicleTrip(vehicleId: string): void {
    this._router.navigate(['trips/trips-registration'], {
      state: { vehicleId: vehicleId },
    });
  }

  viewVehicleTrips(vehicle: _Vehicle): void {
    this._router.navigate(['trips/trips-for-vehicle'], {
      state: {
        vehicleId: vehicle.id,
        vehicleDisplayName: vehicle.displayName,
      },
    });
  }

  deleteVehicle(vehicleId: string): void {
    this._vehicleService
      .deleteVehicle(vehicleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._snackbar.open('Successfully Deleted Vehicle!', 'Dismiss', {
            duration: 2000,
            panelClass: 'success-snackbar',
          });
          this.loading = true;
          this.reload$.next(true);
        },
        error: (err) => {
          this._snackbar.open(err.error, 'Dismiss', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        },
      });
  }

  handleActionClick(clickedAction: _TableActionResponse<_Vehicle>): void {
    switch (clickedAction.action) {
      case 'edit':
        this.updateVehicle(clickedAction.element);
        break;
      case 'addTrip':
        this.registerVehicleTrip(clickedAction.element.id);
        break;
      case 'viewTrips':
        this.viewVehicleTrips(clickedAction.element);
        break;
      case 'delete':
        this.deleteVehicle(clickedAction.element.id);
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
