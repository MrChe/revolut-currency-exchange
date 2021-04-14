import { RootModel } from "./RootModel";
// import { persistStore } from "../utils/mobx-persist.utils";
import { action, makeAutoObservable, observable } from "mobx";
import { AccountModel } from "./AccountModel";
import { IRates } from "./ExchangeModel";
// import { ActiveAccounts } from "./ActiveAccountsModel";

export class DashboardModel {
  private rootModel: RootModel;
  public accounts: AccountModel[];
  public ratesData: IRates | null;
  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
    makeAutoObservable(this, {
      accounts: observable,
      setActiveAccounts: action,
    });
    this.accounts = [];
    this.ratesData = null;
    // persistStore(this, ["dashboard"], "DashboardModel");
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

  public getAccount = (currency: string): AccountModel | undefined => {
    return this.accounts.find((account) => account.currency === currency);
  };

  public getLatestRates = async (): Promise<void> => {
    try {
      const data = await this.rootModel.ApiModel.getLatestRatesRequest();
      if (data) {
        this.setRatesData(data);
        // this.initCashify(data);
        this.setAccounts(data);
        // this.setActiveAccounts({
        //   from: this.findAccountByCurrency("USD"),
        //   to: this.findAccountByCurrency("EUR"),
        // });
      }
    } catch (error) {
      console.error("getLatestRates", error);
    }
  };
}
