import { action, makeAutoObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { persistStore } from "../utils/mobx-persist.utils";

export class AccountModel {
  public id: string;
  public currency: string;
  public balance: number;
  // public history: [];
  constructor(data: Partial<AccountModel>) {
    this.id = uuidv4();
    this.currency = data.currency || "USD";
    this.balance = Number(data.balance?.toFixed(2)) || 100;
    // this.history = data.history;
    makeAutoObservable(this, {
      id: observable,
      currency: observable,
      balance: observable,
      updateBalance: action,
    });
    persistStore(this, ["id", "currency", "balance"], "AccountsModel");
  }

  public updateBalance = (balance: number): void => {
    this.balance = Number(balance.toFixed(2));
  };
}
