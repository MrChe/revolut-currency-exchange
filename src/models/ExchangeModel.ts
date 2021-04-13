import { RootModel } from "./RootModel";
import { action, makeAutoObservable, observable } from "mobx";
import { Cashify } from "cashify";
import { Options } from "cashify/dist/lib/options";
import currency from "currency.js";

export interface IRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export class CurrencyData {
  public top?: string;
  public bottom?: string;
  constructor(data: CurrencyData) {
    this.top = data.top;
    this.bottom = data.bottom;
    makeAutoObservable(this, {
      top: observable,
      bottom: observable,
    });
  }
}

export class ExchangeModel {
  private readonly rootModel: RootModel;
  public rateData: IRates | null;
  private cashify: Cashify;
  public currencyData: CurrencyData;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.rateData = null;
    this.cashify = new Cashify({});
    this.currencyData = new CurrencyData({ top: "", bottom: "" });
    makeAutoObservable(this, {
      rateData: observable,
      currencyData: observable,
      setRates: action,
      setCurrencyData: action,
      convertCurrency: action,
      formatCurrency: action,
    });
  }

  public setRates = (rateData: IRates): void => {
    this.rateData = rateData;
  };

  private setCashify = (rateData: IRates): void => {
    this.cashify = new Cashify({
      base: rateData.base,
      rates: rateData.rates,
    });
  };

  public setCurrencyData = (currencyData: CurrencyData): void => {
    this.currencyData = currencyData;
  };

  public getLatestRates = async (): Promise<void> => {
    try {
      const data = await this.rootModel.ApiModel.getLatestRatesRequest();
      if (data) {
        this.setRates(data);
        this.setCashify(data);
        this.setCurrencyData({
          top: Object.keys(data.rates)[0],
          bottom: Object.keys(data.rates)[1],
        });
      }
    } catch (error) {
      console.error("getLatestRates", error);
    }
  };

  public convertCurrency = (
    amount: number | string,
    options?: Partial<Options>,
  ): number => {
    return Number(this.cashify.convert(amount, options).toFixed(2));
  };

  public formatCurrency = (
    value: currency.Any,
    options?: currency.Options,
  ): string => {
    return currency(value, options).format();
  };
}
