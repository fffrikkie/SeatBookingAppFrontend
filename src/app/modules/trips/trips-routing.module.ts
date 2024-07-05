import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripRegistrationComponent } from './trips-registration/trip-registration.component';
import { TripsForVehicleComponent } from './trips-for-vehicle/trips-for-vehicle.component';
import { TripsEditComponent } from './trips-edit/trips-edit.component';
import { TripsListComponent } from './trips-list/trips-list.component';

const routes: Routes = [
  {
    path: '',
    component: TripsListComponent,
  },
  {
    path: 'trips-registration',
    component: TripRegistrationComponent,
  },
  {
    path: 'trips-for-vehicle',
    component: TripsForVehicleComponent,
  },
  {
    path: 'trips-edit',
    component: TripsEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
