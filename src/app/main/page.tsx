import { useQuery } from "react-query";
import { flightsLivePricesService } from "../services/flights.service";

export default function Main() {
  const { data } = useQuery("main", () => flightsLivePricesService.create());

  return <kbd>{`${data}`}</kbd>;
}
