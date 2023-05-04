import { FlightsAutosuggestQuery } from "@/app/types/flights-autosuggest.types";
import { SkyscannerRapidApiV3 } from "./index.service";

const PREFIX = "autosuggest";
export class AutosuggestApiService {
  async flights(query: FlightsAutosuggestQuery) {
    return await SkyscannerRapidApiV3.post(PREFIX + "/flights", {
      query,
    });
  }
}

export const autosuggestApiService = new AutosuggestApiService();
