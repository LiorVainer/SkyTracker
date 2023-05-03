import { FlightsLivePricesQuery } from "@/app/types/flights-live-prices.types";
import { SkyscannerRapidApiV3 } from "./index.service";

const PREFIX = "autosuggest";
export class AutosuggestService {
  async flights(query: FlightsLivePricesQuery) {
    return await SkyscannerRapidApiV3.post(PREFIX + "/flights", {
      query,
    });
  }
}

export const autosuggestApiService = new AutosuggestService();
