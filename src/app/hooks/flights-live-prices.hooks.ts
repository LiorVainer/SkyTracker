import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { autosuggestService } from "../services/autosuggest.service";
import { flightsLivePricesService } from "../services/flights.service";

export const useFlightsLivePrices = () => {
  const [isDirectFlightsOnly, setIsDirectFlightsOnly] = useState(true);
  const { data: flightsLivePricesData, isLoading: flightsLivePricesIsLoading } =
    useQuery("flights-live-prices", () =>
      flightsLivePricesService.createAndPoll({
        market: "US",
        locale: "en-US",
        currency: "USD",
        queryLegs: [
          {
            originPlaceId: { iata: "TLV" },
            destinationPlaceId: { iata: "BER" },
            date: {
              year: 2023,
              month: 9,
              day: 16,
            },
          },
          {
            originPlaceId: { iata: "MUC" },
            destinationPlaceId: { iata: "TLV" },
            date: {
              year: 2023,
              month: 9,
              day: 28,
            },
          },
        ],
        prefer_directs: isDirectFlightsOnly,
        cabinClass: "CABIN_CLASS_ECONOMY",
        adults: 1,
        nearbyAirports: true,
      })
    );

  const flightsLivePricesResults = useMemo(
    () => flightsLivePricesData?.content?.results,
    [flightsLivePricesData?.content?.results]
  );
  const { data: autosuggestData, isLoading: autosuggestIsLoading } = useQuery(
    "flights-auto-suggest",
    () =>
      autosuggestService.flights({
        locale: "en-US",
        market: "US",
        searchTerm: "New York",
      })
  );

  const cheapestIterId = useMemo(() => {
    return flightsLivePricesData?.content?.sortingOptions.cheapest[0]
      .itineraryId;
  }, [flightsLivePricesData]);

  const directFlightsOnlyLegs = useMemo(() => {
    return (
      flightsLivePricesResults?.legs &&
      Object.values(flightsLivePricesResults.legs).filter(
        (iter) => iter.stopCount === 0
      ).length
    );
  }, [flightsLivePricesResults?.legs]);

  const totalFlightsLegsAmount = useMemo(() => {
    return (
      flightsLivePricesResults?.legs &&
      Object.values(flightsLivePricesResults.legs).length
    );
  }, [flightsLivePricesResults?.legs]);

  const cheapestItem = useMemo(() => {
    if (!cheapestIterId) return undefined;
    return flightsLivePricesData?.content?.results.itineraries[cheapestIterId];
  }, [cheapestIterId, flightsLivePricesData]);

  return {
    isDirectFlightsOnly,
    setIsDirectFlightsOnly,
    flightsLivePricesData,
    flightsLivePricesIsLoading,
    autosuggestData,
    autosuggestIsLoading,
    cheapestItem,
    directFlightsOnlyIterAmount: directFlightsOnlyLegs,
    totalFlightsIterAmount: totalFlightsLegsAmount,
  };
};
