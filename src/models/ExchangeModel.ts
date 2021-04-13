import { RootModel } from "./RootModel";
import { action, makeAutoObservable, observable } from "mobx";

export class ExchangeModel {
  private readonly rootModel: RootModel;
  public rates: any;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.rates = null;
    makeAutoObservable(this, {
      rates: observable,
      setRates: action,
    });
  }

  public setRates = (rates: any): void => {
    this.rates = rates;
  };

  public getLatestRates = async (): Promise<void> => {
    try {
      const data = await this.rootModel.ApiModel.getLatestRatesRequest();
      this.setRates(data);
    } catch (error) {
      console.error("getLatestRates", error);
    }
  };
}
