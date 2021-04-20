import { RootModel } from "./RootModel";
// import { persistStore } from "../utils/mobx-persist.utils";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { AccountModel } from "./AccountModel";
import { IRates } from "./ExchangeModel";

export class AccountsModel {
  rootModel: RootModel;
  public accounts: AccountModel[];
  public ratesData: IRates | null;
  public selectedAccount: AccountModel | null;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    this.selectedAccount = null;
    this.accounts = [];
    this.ratesData = null;
    makeAutoObservable(this, {
      // rootModel: false,
      accounts: observable,
      selectedAccount: observable,
      ratesData: observable,
      accountsAsArray: computed,
      setSelectedAccount: action,
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
      }
    } catch (error) {
      console.error("init", error);
    }
  };

  public setSelectedAccount = (id: string): void => {
    const foundAccount = this.getAccountById(id);
    if (foundAccount) {
      this.selectedAccount = foundAccount;
    } else {
      console.error(`Cant find account by id: ${id}`);
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
    return this.accounts.find((account) => account.id === id);
  };
}
