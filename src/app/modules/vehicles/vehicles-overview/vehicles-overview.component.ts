import { Component, ComponentRef, ViewChild } from '@angular/core';
import { VehiclesListComponent } from '../vehicles-list/vehicles-list.component';

@Component({
  selector: 'app-vehicles-overview',
  templateUrl: './vehicles-overview.component.html',
  styleUrl: './vehicles-overview.component.css',
})
export class VehiclesOverviewComponent {
  @ViewChild(VehiclesListComponent)
  vehicleListComponent?: VehiclesListComponent;
  currentTab: number = 0;

  constructor() {}

  vehicleRegistered(): void {
    this.currentTab = 0;
    this.vehicleListComponent?.reload$.next(true);
  }
}
