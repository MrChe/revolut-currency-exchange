import Axios, { AxiosInstance, AxiosResponse } from "axios";

interface IRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: { [key: string]: number };
}
const APP_ID = "e285ab8ceb004923b3e423a0d0583915";

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

  public getLatestRatesRequest = async (): Promise<
    AxiosResponse<IRates> | undefined
  > => {
    try {
      const response = await this.client.get(`/latest.json`);
      if (!response) {
        throw new Error("Not have any data");
      }
      return response.data;
    } catch (error) {
      console.error("getLatestRatesRequest", error);
    }
  };
}
