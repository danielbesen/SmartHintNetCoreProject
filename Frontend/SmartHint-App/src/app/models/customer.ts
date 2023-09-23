export interface Customer {
  id: number;
  name: string;
  type: string;
  email: string;
  phone: string;
  registerDate?: Date;
  identityDocument: string;
  stateRegistration: string;
  gender: string;
  dateOfBirth?: Date;
  isBlocked: boolean;
  password: string;
}
