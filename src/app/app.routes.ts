import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./modules/vehicles/vehicles.module').then(
        (m) => m.VehiclesModule
      ),
  },
  {
    path: 'trips',
    loadChildren: () =>
      import('./modules/trips/trips.module').then((m) => m.TripsModule),
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./modules/bookings/bookings.module').then(
        (m) => m.BookingsModule
      ),
  },
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full',
  },
];
