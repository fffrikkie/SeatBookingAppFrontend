export interface _Trip {
  id: string;
  vehicleId: string;
  startDestination: string;
  endDestination: string;
  totalSeats: number;
  totalAvailableSeats: number;
  availableDisplay?: number;
  departureDateTime: Date | string;
}
