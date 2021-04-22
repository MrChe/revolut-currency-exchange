import { ExchangeModel } from "./ExchangeModel";
import { ApiModel } from "./ApiModel";

export class RootModel {
  public ExchangeModel: ExchangeModel;
  public ApiModel: ApiModel;
  constructor() {
    this.ApiModel = new ApiModel();
    this.ExchangeModel = new ExchangeModel(this);
  }
}

export const rootModel = new RootModel();
