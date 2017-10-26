export class User {

  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public role: string,
    public createdAt?: string,
    public updatedAt?: string
  ) { }
}
