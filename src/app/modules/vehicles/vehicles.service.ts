import { Injectable } from '@angular/core';
import { VehiclesApiService } from '../../api/vehicles/vehicles-api.service';
import { Observable } from 'rxjs';
import { _Vehicle } from '../../api/vehicles/models/vehicles.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private _vehiclesApiService: VehiclesApiService) {}

  getUserVehicles(userName: string): Observable<_Vehicle[]> {
    return this._vehiclesApiService.getUserVehicles(userName);
  }

  registerUserVehicle(vehicle: Partial<_Vehicle>): Observable<string> {
    return this._vehiclesApiService.registerUserVehicle(vehicle);
  }

  updateVehicle(vehicle: Partial<_Vehicle>): Observable<string> {
    return this._vehiclesApiService.updateVehicle(vehicle);
  }

  deleteVehicle(vehicleId: string): Observable<string> {
    return this._vehiclesApiService.deleteVehicle(vehicleId);
  }
}
