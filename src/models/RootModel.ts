import { ExchangeModel } from "./ExchangeModel";
import { AccountsModel } from "./AccountsModel";
import { ApiModel } from "./ApiModel";

export class RootModel {
  public ExchangeModel: ExchangeModel;
  public AccountsModel: AccountsModel;
  public ApiModel: ApiModel;
  constructor() {
    this.ApiModel = new ApiModel();
    // init accounts
    this.AccountsModel = new AccountsModel(
      this,
      ["USD", "EUR", "GBP", "UAH"],
      "USD",
    );
    this.ExchangeModel = new ExchangeModel(this);
  }
}

export const rootModel = new RootModel();
