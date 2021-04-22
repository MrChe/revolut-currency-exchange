import Axios, { AxiosInstance } from "axios";

import { IRates } from "../models/ExchangeModel";

const APP_ID = "1e7b1a94b01b44888d269b7af23c44af";

export class ApiModel {
  private client: AxiosInstance;
  constructor() {
    this.client = Axios.create({
      baseURL: `https://openexchangerates.org/api`,
      params: {
        app_id: APP_ID,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public getLatestRatesRequest = async (
    currencies: string[],
    base?: string,
  ): Promise<IRates | undefined> => {
    try {
      const response = await this.client.get(`/latest.json`, {
        params: {
          base: base || "USD",
          symbols: currencies.toString(),
        },
      });
      if (!response.data) {
        throw new Error("Not have any data");
      }
      return response.data;
    } catch (error) {
      console.error("getLatestRatesRequest", error);
    }
  };

  public getCurrenciesRequest = async (): Promise<
    Record<string, string> | undefined
  > => {
    try {
      const response = await this.client.get(`/currencies.json`, {});
      if (!response.data) {
        throw new Error("Not have any data");
      }
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("getCurrenciesRequest", error);
    }
  };
}
