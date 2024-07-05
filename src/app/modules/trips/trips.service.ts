import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TripsApiService } from '../../api/trips/trips-api.service';
import { _Trip } from '../../api/trips/models/trips.interface';
import { VehiclesApiService } from '../../api/vehicles/vehicles-api.service';
import { _Vehicle } from '../../api/vehicles/models/vehicles.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  constructor(
    private _tripsApiService: TripsApiService,
    private _vehiclesApiService: VehiclesApiService
  ) {}

  getTrips(): Observable<_Trip[]> {
    return this._tripsApiService.getTrips();
  }

  getVehicleTrips(vehicleId: string): Observable<_Trip[]> {
    return this._tripsApiService.getVehicleTrips(vehicleId);
  }

  registerVehicleTrip(trip: Partial<_Trip>): Observable<string> {
    return this._tripsApiService.registerVehicleTrip(trip);
  }

  updateTrip(trip: Partial<_Trip>): Observable<string> {
    return this._tripsApiService.updateTrip(trip);
  }

  deleteTrip(tripId: string): Observable<string> {
    return this._tripsApiService.deleteTrip(tripId);
  }

  // Vehicles API
  getUserVehicles(userName: string): Observable<_Vehicle[]> {
    return this._vehiclesApiService.getUserVehicles(userName);
  }
}
