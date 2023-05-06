import { Switch } from "@adobe/react-spectrum";
import { useFlightsLivePrices } from "../hooks/flights-live-prices.hooks";

export default function Main() {
  const {
    cheapestItem,
    autosuggestIsLoading,
    flightsLivePricesIsLoading,
    isDirectFlightsOnly,
    setIsDirectFlightsOnly,
    totalFlightsIterAmount,
    directFlightsOnlyIterAmount,
  } = useFlightsLivePrices();

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
      {cheapestItem && (
        <div>
          <p>Cheapest Item:</p>
          <p>{cheapestItem.pricingOptions[0].price.amount}$</p>
        </div>
      )}

      {totalFlightsIterAmount && (
        <div>
          <p>Total Flights Iterations:</p>
          <p>{totalFlightsIterAmount}</p>
        </div>
      )}

      {directFlightsOnlyIterAmount && (
        <div>
          <p>Direct Flights Only Iterations:</p>
          <p>{directFlightsOnlyIterAmount}</p>
        </div>
      )}
      <Switch
        onChange={() => setIsDirectFlightsOnly(!isDirectFlightsOnly)}
        isSelected={isDirectFlightsOnly}
      ></Switch>
    </div>
  );
}
