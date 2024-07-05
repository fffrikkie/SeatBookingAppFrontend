import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesOverviewComponent } from './vehicles-overview/vehicles-overview.component';
import { VehiclesEditComponent } from './vehicles-edit/vehicles-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesOverviewComponent,
  },
  {
    path: 'vehicles-edit',
    component: VehiclesEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
