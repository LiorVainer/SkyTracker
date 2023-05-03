import { FlightsLivePricesQuery } from "@/app/types/flights-live-prices.types";
import { SkyscannerRapidApiV3, SkyscannerRapidApiV3e } from "./index.service";

const PREFIX = "flights/live/search";
export class FlightsLivePricesApiService {
  async create(query: FlightsLivePricesQuery) {
    return await SkyscannerRapidApiV3.post(PREFIX + "/create", {
      query,
    });
  }

  async poll(sessionToken: string) {
    return await SkyscannerRapidApiV3.post(PREFIX + `/poll/${sessionToken}`);
  }

  async createAndPoll(query: FlightsLivePricesQuery) {
    return await SkyscannerRapidApiV3e.post(PREFIX + "/synced", {
      query,
    });
  }
}

export const flightsLivePricesApiService = new FlightsLivePricesApiService();
