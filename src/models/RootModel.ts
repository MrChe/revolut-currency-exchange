import { AccountsModel } from "./AccountsModel";
import { ApiModel } from "./ApiModel";

export class RootModel {
  public AccountsModel: AccountsModel;
  public ApiModel: ApiModel;
  constructor() {
    this.ApiModel = new ApiModel();
    // init accounts
    this.AccountsModel = new AccountsModel(this);
  }
}

export const rootModel = new RootModel();
