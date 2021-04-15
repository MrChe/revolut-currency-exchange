import { ExchangeModel } from "./ExchangeModel";
import { AccountsModel } from "./AccountsModel";
import { ApiModel } from "./ApiModel";

export class RootModel {
  public ExchangeModel: ExchangeModel;
  public AccountsModel: AccountsModel;
  public ApiModel: ApiModel;
  constructor() {
    this.ApiModel = new ApiModel();
    this.AccountsModel = new AccountsModel(this);
    this.ExchangeModel = new ExchangeModel(this);
  }
}

export const rootModel = new RootModel();
