import { useMemo } from "react";
import { useQuery } from "react-query";
import { autosuggestService } from "../services/autosuggest.service";
import { flightsLivePricesService } from "../services/flights.service";

export default function Main() {
  const { data: flightsLivePricesData, isLoading: flightsLivePricesIsLoading } =
    useQuery("flights-live-prices", () => flightsLivePricesService.create());
  const { data: autosuggestData, isLoading: autosuggestIsLoading } = useQuery(
    "flights-auto-suggest",
    () =>
      autosuggestService.flights({
        locale: "en-US",
        market: "US",
        searchTerm: "New York",
      })
  );

  const bestFlight = useMemo(() => {
    if (!flightsLivePricesData) return null;
    return flightsLivePricesData.Itineraries[0];
  }, [flightsLivePricesData]);

  return (
    <div>
      {flightsLivePricesIsLoading ? (
        <div>Loading Live Flight Prices...</div>
      ) : (
        <p>Live Flight Prices Success</p>
      )}
      {autosuggestIsLoading ? (
        <div>Loading Autosuggest...</div>
      ) : (
        <p>Autosuggest Success</p>
      )}
    </div>
  );
}
