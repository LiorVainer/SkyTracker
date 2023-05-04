import { FlightsAutosuggestQuery } from "../types/flights-autosuggest.types";
import { api } from "./index.service";

const PREFIX = "autosuggest";
export class AutosuggestService {
  async flights(query: FlightsAutosuggestQuery) {
    return await api.post(PREFIX, {
      query,
    });
  }
}

export const autosuggestService = new AutosuggestService();
