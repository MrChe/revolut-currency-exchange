import { makeAutoObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export class AccountHistory {
  public id: string;
  public name: string | undefined;
  public time: string;
  public from: string | undefined;
  public to: string | undefined;
  constructor(data: Partial<AccountHistory>) {
    this.id = uuidv4();
    this.name = data.name;
    this.time = format(new Date(), "dd/MM/yyyy HH:mm");
    this.from = data.from;
    this.to = data.to;
    makeAutoObservable(this, {
      id: false,
      time: false,
      name: observable,
      from: observable,
      to: observable,
    });
  }
}

export class AccountModel {
  public id: string;
  public currency: string;
  public balance: number;
  public history: AccountHistory[];
  constructor(data: Partial<AccountModel>) {
    this.id = uuidv4();
    this.currency = data.currency || "USD";
    this.balance = Number(data.balance?.toFixed(2)) || 100;
    this.history = [];
    makeAutoObservable(this, {
      id: false,
      currency: observable,
      balance: observable,
    });
  }
}
