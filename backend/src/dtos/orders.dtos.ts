export interface Prestation {
  city: string;
  streetName: string;
  streetNumber: number;
  zipCode: string;
  date: string;
  time: string;
  distanceKm: number;
}

export type CreateOrderDTO = {
  menus: {
    menuId: number;
    quantity: number;
  }[];
  prestation: Prestation;
};
export type CreateReservationDTO = {
  eventAddress: string;
  eventDate: string;
  eventTime: string;
  menus: {
    menuId: number;
    quantity: number;
  }[];
};
