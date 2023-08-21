export class User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  mobile: string;
  avatar: string;
  userRole: number;
  isActive: boolean;
  isDeleted: boolean;

  constructor() {
    this._id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.mobile = '';
    this.avatar = '';
    this.userRole = 0;
    this.isActive = false;
    this.isDeleted = false;
  }
}
