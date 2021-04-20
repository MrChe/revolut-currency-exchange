import { RootModel } from "./RootModel";
import { action, makeAutoObservable, observable } from "mobx";
import { Cashify } from "cashify";
import { Options } from "cashify/dist/lib/options";
import currencyJS from "currency.js";
// import { AccountModel } from "../models/AccountModel";
import getSymbolFromCurrency from "currency-symbol-map";
// import { persistStore } from "../utils/mobx-persist.utils";

export interface IRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export class ExchangeModel {
  rootModel: RootModel;
  // public ratesData: IRates | null;
  public cashify: Cashify | null;
  // public accounts: AccountModel[];
  constructor(rootModel: RootModel) {
    makeAutoObservable(this, {
      rootModel: false,
      // accounts: observable,
      // ratesData: observable,
      convertCurrency: action,
      init: action,
    });
    this.rootModel = rootModel;
    // this.accounts = [];
    // this.ratesData = null;
    this.cashify = null;

    // persistStore(
    //   this,
    //   ["accounts", "ratesData", "activeAccounts"],
    //   "ExchangeModel",
    // );
  }

  // public setRatesData = (ratesData: IRates): void => {
  //   this.ratesData = ratesData;
  // };

  public init = (ratesData: IRates): void => {
    this.cashify = new Cashify({
      base: ratesData.base,
      rates: ratesData.rates,
    });
  };

  // public setAccounts = (ratesData: IRates): void => {
  //   Object.keys(ratesData.rates).forEach((key: string) => {
  //     this.accounts.push(
  //       new AccountModel({
  //         currency: key,
  //       }),
  //     );
  //   });
  // };

  // public exchange = (topBalance: number, bottomBalance: number): void => {
  //   this.activeAccounts?.from?.updateBalance(
  //     this.activeAccounts?.from?.balance - topBalance,
  //   );
  //
  //   this.activeAccounts?.to?.updateBalance(
  //     this.activeAccounts?.to?.balance + bottomBalance,
  //   );
  // };

  // public findAccountByCurrency = (
  //   currency: string,
  // ): AccountModel | undefined => {
  //   return this.accounts.find((account) => account.currency === currency);
  // };

  // public setActiveAccounts = (activeAccounts: ActiveAccounts): void => {
  //   this.activeAccounts = activeAccounts;
  // };

  // public getLatestRates = async (): Promise<void> => {
  //   try {
  //     const data = await this.rootModel.ApiModel.getLatestRatesRequest();
  //     if (data) {
  //       this.setRatesData(data);
  //       this.initCashify(data);
  //       this.setAccounts(data);
  //       this.setActiveAccounts({
  //         from: this.findAccountByCurrency("USD"),
  //         to: this.findAccountByCurrency("EUR"),
  //       });
  //     }
  //   } catch (error) {
  //     console.error("getLatestRates", error);
  //   }
  // };

  public convertCurrency = (
    amount: number | string,
    options?: Partial<Options>,
  ): number => {
    return Number(this.cashify?.convert(amount, options).toFixed(2));
  };

  public formatCurrency = (
    value: currency.Any,
    currencyName: string,
  ): string => {
    return currencyJS(value, {
      symbol: getSymbolFromCurrency(currencyName),
    }).format();
  };
}
