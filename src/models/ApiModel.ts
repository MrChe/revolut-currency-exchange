import Axios, { AxiosInstance } from "axios";
import { IRates } from "../models/ExchangeModel";
import { filterRates } from "../utils/currencies";

const APP_ID = "e285ab8ceb004923b3e423a0d0583915";

export class ApiModel {
  private client: AxiosInstance;
  constructor() {
    this.client = Axios.create({
      baseURL: `https://openexchangerates.org/api`,
      params: {
        base: "USD",
        app_id: APP_ID,
        symbols: "USD,EUR,GBP,UAH",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public getLatestRatesRequest = async (): Promise<IRates | undefined> => {
    try {
      const response = await this.client.get(`/latest.json`);
      if (!response.data) {
        throw new Error("Not have any data");
      }
      return response.data;
    } catch (error) {
      console.error("getLatestRatesRequest", error);
    }
  };
}
