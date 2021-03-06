export class Client {
  id: string;
  name: string;
  lastName: string;
  areaCode: string;
  phone: string;
  email: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    areaCode: string,
    phone: string,
    email: string
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.areaCode = areaCode;
    this.phone = phone;
    this.email = email;
  }
}
