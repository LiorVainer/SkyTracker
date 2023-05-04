import {
  FlightsLivePricesBody,
  FlightsLivePricesQuery,
} from "@/app/types/flights-live-prices.types";
import { AxiosResponse } from "axios";
import { FlightsLivePricesResponse } from "./../types/flights-live-prices.types";
import { api } from "./index.service";

const PREFIX = "flights";
export class FlightsLivePricesService {
  async createAndPoll(query: FlightsLivePricesQuery) {
    try {
      const res = await api.post<
        FlightsLivePricesResponse,
        AxiosResponse<FlightsLivePricesResponse>,
        FlightsLivePricesBody
      >(PREFIX, { query });

      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching results");
    }
  }
}

export const flightsLivePricesService = new FlightsLivePricesService();
