import { RootModel } from "./RootModel";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { AccountHistory, AccountModel } from "./AccountModel";
import { Cashify } from "cashify";
import { Options } from "cashify/dist/lib/options";
import currencyJS from "currency.js";
import getSymbolFromCurrency from "currency-symbol-map";
import { persistStore } from "../utils/persist";
import { clearPersist, stopPersist, startPersist } from "mobx-persist-store";

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
  public inputFromValue: string | number;
  public inputToValue: string | number;
  public currencyNames: Record<string, string>;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.accounts = [];
    this.ratesData = null;
    this.inputToValue = "";
    this.inputFromValue = "";
    this.activeAccountFrom = null;
    this.activeAccountTo = null;
    this.currencyNames = {};
    makeAutoObservable(this, {
      rootModel: false,
      accounts: observable,
      currencyNames: observable,
      inputFromValue: observable,
      inputToValue: observable,
      ratesData: observable,
      activeAccountFrom: observable,
      activeAccountTo: observable,
      accountsAsArray: computed,
      setActiveAccountTo: action,
      setActiveAccountFrom: action,
      updateInputFromValue: action,
      updateInputToValue: action,
      setCurrencyNames: action,
      isDisableExchange: computed,
    });
    persistStore(
      this,
      [
        "accounts",
        "currencyNames",
        "ratesData",
        "activeAccountFrom",
        "activeAccountTo",
        "inputFromValue",
        "inputToValue",
      ],
      "ExchangeModel",
    );
  }

  public init = async (): Promise<any> => {
    try {
      const rates = await this.rootModel.ApiModel.getLatestRatesRequest(
        ["USD", "EUR", "GBP", "UAH"],
        "USD",
      );
      const currencyNames = await this.rootModel.ApiModel.getCurrenciesRequest();
      if (rates && currencyNames) {
        this.setRatesData(rates);
        this.setAccounts(rates);
        this.setCurrencyNames(currencyNames);
      }
    } catch (error) {
      console.error("init", error);
    }
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
    const cashify = this.ratesData
      ? new Cashify({
          base: this.ratesData.base,
          rates: this.ratesData.rates,
        })
      : null;
    return Number(cashify?.convert(amount, options).toFixed(2));
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
    if (this.activeAccountFrom && this.activeAccountTo) {
      this.updateBalanceFrom(
        this.activeAccountFrom?.id,
        Number(this.inputFromValue),
      );

      this.updateHistoryInAccount(this.activeAccountFrom?.id, {
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

      this.updateBalanceTo(this.activeAccountTo?.id, Number(this.inputToValue));

      this.updateHistoryInAccount(this.activeAccountTo.id, {
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
    }
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
      Number(this.inputFromValue) > Number(this.activeAccountFrom?.balance)
    );
  }

  public clearModel = (): void => {
    this.accounts = [];
    this.currencyNames = {};
    this.ratesData = null;
    this.inputToValue = "";
    this.inputFromValue = "";
    this.activeAccountFrom = null;
    this.activeAccountTo = null;
  };

  public updateBalanceFrom = (accountId: string, value: number): void => {
    const found = this.getAccountById(accountId);
    if (found) {
      found.balance = found?.balance - Number(value.toFixed(2));
    }
  };

  public updateBalanceTo = (accountId: string, value: number): void => {
    const found = this.getAccountById(accountId);
    if (found) {
      found.balance = found?.balance + Number(value.toFixed(2));
    }
  };

  public updateHistoryInAccount = (
    accountId: string,
    data: Partial<AccountHistory>,
  ): void => {
    const found = this.getAccountById(accountId);
    if (found) {
      found.history.push(
        new AccountHistory({
          name: data.name,
          to: data.to,
          from: data.from,
        }),
      );
    }
  };

  public clearStore = async (): Promise<void> => {
    await clearPersist(this);
  };

  public stopPersist = (): void => {
    stopPersist(this);
  };

  public startPersist = (): void => {
    startPersist(this);
  };
}
