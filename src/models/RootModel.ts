import { UserModel } from './UserModel';

export class RootModel {
  userStore: UserModel;
  constructor() {
    this.userStore = new UserModel(this);
  }
}
