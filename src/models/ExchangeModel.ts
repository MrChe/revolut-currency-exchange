import { RootModel } from "./RootModel";
// import { persistStore } from "../utils/mobx-persist.utils";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { AccountModel } from "./AccountModel";
import { Cashify } from "cashify";
import { Options } from "cashify/dist/lib/options";
import currencyJS from "currency.js";
import getSymbolFromCurrency from "currency-symbol-map";

export interface IRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export class ExchangeModel {
  rootModel: RootModel;
  public accounts: AccountModel[];
  public ratesData: IRates | null;
  public activeAccountFrom: AccountModel | null;
  public activeAccountTo: AccountModel | null;
  public cashify: Cashify | null;
  public inputFromValue: string | number;
  public inputToValue: string | number;
  public currencyNames: Record<string, string>;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.accounts = [];
    this.ratesData = null;
    this.cashify = null;
    this.inputToValue = "";
    this.inputFromValue = "";
    this.activeAccountFrom = null;
    this.activeAccountTo = null;
    this.currencyNames = {};
    makeAutoObservable(this, {
      rootModel: false,
      cashify: false,
      accounts: observable,
      currencyNames: observable,
      inputFromValue: observable,
      inputToValue: observable,
      ratesData: observable,
      accountsAsArray: computed,
      setActiveAccountTo: action,
      setActiveAccountFrom: action,
      updateInputFromValue: action,
      updateInputToValue: action,
      setCurrencyNames: action,
      isDisableExchange: computed,
    });
  }

  public init = async (): Promise<void> => {
    try {
      const rates = await this.rootModel.ApiModel.getLatestRatesRequest(
        ["USD", "EUR", "GBP", "UAH"],
        "USD",
      );
      const currencyNames = await this.rootModel.ApiModel.getCurrenciesRequest();
      if (rates && currencyNames) {
        this.setRatesData(rates);
        this.setAccounts(rates);
        this.initCachify(rates);
        this.setCurrencyNames(currencyNames);
      }
    } catch (error) {
      console.error("init", error);
    }
  };

  public initCachify = (ratesData: IRates): void => {
    this.cashify = new Cashify({
      base: ratesData.base,
      rates: ratesData.rates,
    });
  };

  public setActiveAccountTo = (id: string): void => {
    const found = this.getAccountById(id);
    if (found) {
      this.activeAccountTo = found;
    }
  };

  public setActiveAccountFrom = (id: string): void => {
    const found = this.getAccountById(id);
    if (found) {
      this.activeAccountFrom = found;
    }
  };

  public get accountsAsArray(): AccountModel[] {
    return this.accounts.slice();
  }

  public setRatesData = (ratesData: IRates): void => {
    this.ratesData = ratesData;
  };

  public setCurrencyNames = (currencyNames: Record<string, string>): void => {
    this.currencyNames = currencyNames;
  };

  public setAccounts = (ratesData: IRates): void => {
    Object.keys(ratesData.rates).forEach((currency: string) => {
      this.accounts.push(
        new AccountModel({
          currency,
          balance: 100,
        }),
      );
    });
  };

  public getAccountById = (id: string): AccountModel | undefined => {
    return this.accounts.find((account: AccountModel) => account.id === id);
  };

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

  public exchange = (): void => {
    this.activeAccountFrom?.updateBalance(
      this.activeAccountFrom?.balance - Number(this.inputFromValue),
    );

    this.activeAccountFrom?.updateHistory({
      name: `Exchange to ${this.activeAccountTo?.currency}`,
      from: `- ${this.formatCurrency(
        this.inputFromValue,
        this.activeAccountFrom?.currency || "",
      )}`,
      to: `+ ${this.formatCurrency(
        this.inputToValue,
        this.activeAccountTo?.currency || "",
      )}`,
    });

    this.activeAccountTo?.updateBalance(
      this.activeAccountTo?.balance + Number(this.inputToValue),
    );

    this.activeAccountTo?.updateHistory({
      name: `Exchange from ${this.activeAccountFrom?.currency}`,
      from: `+ ${this.formatCurrency(
        this.inputToValue,
        this.activeAccountTo?.currency || "",
      )}`,
      to: `- ${this.formatCurrency(
        this.inputFromValue,
        this.activeAccountFrom?.currency || "",
      )}`,
    });
  };

  public updateInputFromValue = (value: string | number): void => {
    this.inputFromValue = value ? value : "";
  };

  public updateInputToValue = (value: string | number): void => {
    this.inputToValue = value ? value : "";
  };

  public get isDisableExchange(): boolean {
    return (
      (!this.inputFromValue && !this.inputToValue) ||
      this.activeAccountFrom?.id === this.activeAccountTo?.id ||
      Number(this.inputFromValue) > Number(this.activeAccountFrom?.balance) ||
      Number(this.inputToValue) > Number(this.activeAccountTo?.balance)
    );
  }

  public clearModel = (): void => {
    this.accounts = [];
    this.currencyNames = {};
    this.ratesData = null;
    this.cashify = null;
    this.inputToValue = "";
    this.inputFromValue = "";
    this.activeAccountFrom = null;
    this.activeAccountTo = null;
  };
}
