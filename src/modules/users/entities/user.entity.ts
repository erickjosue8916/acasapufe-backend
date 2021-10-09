export enum UserTypes {
  Admin = `ADMIN`,
  Customer = `CUSTOMER`,
  Employee = `EMPLOYEE`,
}

export class User {
  id: string;
  dui: string;
  birthDate: string;
  name: string;
  type: UserTypes;
  lastName: string;
  username: string;
  createdAt: string;
}
