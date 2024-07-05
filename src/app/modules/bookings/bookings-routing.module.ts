import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

const routes: Routes = [
  {
    path: '',
    component: SeatBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
