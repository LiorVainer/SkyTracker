import { FlightsLivePricesBody } from "@/app/types/flights-live-prices.types";
import { axiosInstance } from "./index.service";

const PREFIX = "flights";
export class FlightsLivePricesService {
  async create() {
    try {
      const body: FlightsLivePricesBody = {
        query: {
          market: "UK",
          locale: "en-GB",
          currency: "EUR",
          queryLegs: [
            {
              originPlaceId: { iata: "LHR" },
              destinationPlaceId: { iata: "DXB" },
              date: {
                year: 2023,
                month: 9,
                day: 20,
              },
            },
          ],
          cabinClass: "CABIN_CLASS_ECONOMY",
          adults: 2,
        },
      };

      const res = await axiosInstance.post(PREFIX, body);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching results");
    }
  }
}

export const flightsLivePricesService = new FlightsLivePricesService();
