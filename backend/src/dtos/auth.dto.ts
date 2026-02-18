export type RegisterDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  houseNumber: number;
  zipCode: string;
  city: string;
  country: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
