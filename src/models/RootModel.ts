import { ExchangeModel } from "./ExchangeModel";
import { DashboardModel } from "./DashboardModel";
import { ApiModel } from "./ApiModel";

export class RootModel {
  public ExchangeModel: ExchangeModel;
  public DashboardModel: DashboardModel;
  public ApiModel: ApiModel;
  constructor() {
    this.ApiModel = new ApiModel();
    this.DashboardModel = new DashboardModel(this);
    this.ExchangeModel = new ExchangeModel(this);
  }
}

export const rootModel = new RootModel();
