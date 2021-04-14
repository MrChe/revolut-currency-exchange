import { RootModel } from "./RootModel";
// import { persistStore } from "../utils/mobx-persist.utils";
import { makeAutoObservable } from "mobx";

export class DashboardModel {
  private rootStore: RootModel;
  constructor(rootStore: RootModel) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    // persistStore(this, ["dashboard"], "DashboardModel");
  }
}
