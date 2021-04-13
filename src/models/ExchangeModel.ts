import { RootModel } from "./RootModel";
import { action, makeAutoObservable, observable } from "mobx";
import { Cashify } from "cashify";
import { Options } from "cashify/dist/lib/options";
import currency from "currency.js";
import { AccountModel } from "../models/AccountModel";

export interface IRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export class ActiveAccounts {
  public top?: AccountModel | null;
  public bottom?: AccountModel | null;
  constructor(data: ActiveAccounts) {
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
  public accounts: AccountModel[];
  public activeAccounts: ActiveAccounts | null;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.rateData = null;
    this.cashify = new Cashify({});
    this.accounts = [];
    this.activeAccounts = null;
    makeAutoObservable(this, {
      rateData: observable,
      accounts: observable,
      setRates: action,
      convertCurrency: action,
      setActiveAccounts: action,
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

  public exchange = (topBalance: number, bottomBalance: number): void => {
    this.activeAccounts?.top?.updateBalance(
      this.activeAccounts?.top?.balance - topBalance,
    );

    this.activeAccounts?.bottom?.updateBalance(
      this.activeAccounts?.bottom?.balance + bottomBalance,
    );
  };

  public findAccountByCurrency = (
    currency: string,
  ): AccountModel | undefined => {
    return this.accounts.find((account) => account.currency === currency);
  };

  public setActiveAccounts = (activeAccounts: ActiveAccounts): void => {
    this.activeAccounts = activeAccounts;
  };

  public getLatestRates = async (): Promise<void> => {
    try {
      const data = await this.rootModel.ApiModel.getLatestRatesRequest();
      if (data) {
        this.setRates(data);
        this.setCashify(data);
        Object.keys(data.rates).forEach((key: string) => {
          this.accounts.push(
            new AccountModel({
              currency: key,
            }),
          );
        });
        this.setActiveAccounts({
          top: this.findAccountByCurrency("USD"),
          bottom: this.findAccountByCurrency("EUR"),
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
