import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { _Trip } from './models/trips.interface';

@Injectable({
  providedIn: 'root',
})
export class TripsApiService {
  constructor(private _httpClient: HttpClient) {}

  getTrips(): Observable<_Trip[]> {
    return this._httpClient.get<_Trip[]>(
      `${environment.apiEndpoint}/Trip/GetTrips`
    );
  }

  getVehicleTrips(vehicleId: string): Observable<_Trip[]> {
    return this._httpClient.get<_Trip[]>(
      `${environment.apiEndpoint}/Trip/GetVehicleTrips?vehicleId=${vehicleId}`
    );
  }

  registerVehicleTrip(trip: Partial<_Trip>): Observable<string> {
    return this._httpClient.post<string>(
      `${environment.apiEndpoint}/Trip/RegisterVehicleTrip`,
      trip
    );
  }

  updateTrip(tripDetails: Partial<_Trip>): Observable<string> {
    return this._httpClient.patch<string>(
      `${environment.apiEndpoint}/Trip/UpdateTrip/${tripDetails.id}`,
      tripDetails
    );
  }

  deleteTrip(tripId: string): Observable<string> {
    return this._httpClient.delete<string>(
      `${environment.apiEndpoint}/Trip/DeleteTrip/${tripId}`
    );
  }
}
