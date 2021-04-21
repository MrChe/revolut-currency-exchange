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

export class AccountsModel {
  rootModel: RootModel;
  public accounts: AccountModel[];
  public ratesData: IRates | null;
  public activeAccountFrom: AccountModel | null;
  public activeAccountTo: AccountModel | null;
  public cashify: Cashify | null;
  public inputFromValue: string | number;
  public inputToValue: string | number;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.accounts = [];
    this.ratesData = null;
    this.cashify = null;
    this.inputToValue = "";
    this.inputFromValue = "";
    this.activeAccountFrom = null;
    this.activeAccountTo = null;
    makeAutoObservable(this, {
      rootModel: false,
      cashify: false,
      accounts: observable,
      inputFromValue: observable,
      inputToValue: observable,
      ratesData: observable,
      accountsAsArray: computed,
      setActiveAccountTo: action,
      setActiveAccountFrom: action,
      updateInputFromValue: action,
      updateInputToValue: action,
      isDisableExchange: computed,
    });

    // INIT Module
    // this.init();
    // persistStore(
    //   this,
    //   ["accounts", "selectedAccount", "accountsAsArray"],
    //   "AccountsModel",
    // );
  }

  public init = async (): Promise<void> => {
    try {
      const data = await this.rootModel.ApiModel.getLatestRatesRequest(
        ["USD", "EUR", "GBP", "UAH"],
        "USD",
      );
      if (data) {
        this.setRatesData(data);
        this.setAccounts(data);
        this.initCachify(data);
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
    const value = Number(this.inputFromValue);
    this.activeAccountFrom?.updateBalance(
      this.activeAccountFrom?.balance - value,
    );

    this.activeAccountFrom?.updateHistory({
      name: `Exchange to ${this.activeAccountTo?.currency}`,
      from: `- ${this.formatCurrency(
        this.inputFromValue,
        this.activeAccountFrom?.currency,
      )}`,
      to: `+ ${this.formatCurrency(
        this.inputToValue,
        this.activeAccountTo?.currency || "",
      )}`,
    });

    this.activeAccountTo?.updateBalance(this.activeAccountTo?.balance + value);

    this.activeAccountTo?.updateHistory({
      name: `Exchange from ${this.activeAccountFrom?.currency}`,
      from: `- ${this.formatCurrency(
        this.inputToValue,
        this.activeAccountFrom?.currency || "",
      )}`,
      to: `+ ${this.formatCurrency(
        this.inputFromValue,
        this.activeAccountTo?.currency,
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
}
