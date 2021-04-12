import { RootModel } from './RootModel';
import { makeAutoObservable } from 'mobx';

export class UserModel {
  public rootStore: RootModel;
  constructor(rootStore: RootModel) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }
}
