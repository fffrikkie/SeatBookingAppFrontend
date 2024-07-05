import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { _Vehicle } from './models/vehicles.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService {
  constructor(private _httpClient: HttpClient) {}

  getUserVehicles(userName: string): Observable<_Vehicle[]> {
    return this._httpClient.get<_Vehicle[]>(
      `${environment.apiEndpoint}/Vehicle/GetUserVehicles?ownerName=${userName}`
    );
  }

  registerUserVehicle(vehicle: Partial<_Vehicle>): Observable<string> {
    return this._httpClient.post<string>(
      `${environment.apiEndpoint}/Vehicle/RegisterUserVehicle`,
      vehicle
    );
  }

  updateVehicle(vehicleDetails: Partial<_Vehicle>): Observable<string> {
    return this._httpClient.patch<string>(
      `${environment.apiEndpoint}/Vehicle/UpdateVehicle/${vehicleDetails.id}`,
      vehicleDetails
    );
  }

  deleteVehicle(vehicleId: string): Observable<string> {
    return this._httpClient.delete<string>(
      `${environment.apiEndpoint}/Vehicle/DeleteVehicle/${vehicleId}`
    );
  }
}
