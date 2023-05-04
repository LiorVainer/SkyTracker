import { Switch } from "@adobe/react-spectrum";
import { useFlightsLivePrices } from "../hooks/flights-live-prices.hooks";

export default function Main() {
  const { cheapestItem, autosuggestIsLoading, flightsLivePricesIsLoading, isDirectFlightsOnly } =
    useFlightsLivePrices();

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
      <Switch isSelected={isDirectFlightsOnly}></Switch>
    </div>
  );
}
