import { CreateUserDto } from '../dto/create-user.dto';
import * as dayjs from 'dayjs';

export enum UserTypes {
  Admin = `ADMIN`,
  Customer = `CUSTOMER`,
  Employee = `EMPLOYEE`,
}

export class User {
  id: string;
  dui: string;
  birthDate: string;
  firstName: string;
  type: UserTypes;
  lastName: string;
  username: string;
  createdAt: string;

  getAsJson() {
    return {
      id: this.id,
      dui: this.dui,
      birthDate: this.birthDate,
      firstName: this.firstName,
      type: this.type,
      lastName: this.lastName,
      username: this.username,
      createdAt: this.createdAt,
    };
  }

  static getFromDto(data: CreateUserDto): User {
    const user = new User();
    user.dui = data.dui;
    user.firstName = data.firstName;
    user.birthDate = data.birthDate;
    user.lastName = data.lastName;
    user.username = data.username;
    user.type = data.type;
    user.createdAt = dayjs().format();
    return user;
  }
}
