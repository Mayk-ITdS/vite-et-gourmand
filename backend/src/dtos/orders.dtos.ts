export type CreateOrderDTO = {
  menus: {
    menuId: number;
    quantity: number;
  }[];
  prestation: {
    address: string;
    city: string;
    date: string;
    time: string;
  };
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
