import { z } from "zod";

export const QueryLegSchema = z.object({
  originPlaceId: z.object({
    iata: z.string(),
  }),
  destinationPlaceId: z.object({
    iata: z.string(),
  }),
  date: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
});

export const FlightsLivePricesQuerySchema = z.object({
  market: z.string(),
  locale: z.string(),
  currency: z.string(),
  queryLegs: z.array(QueryLegSchema),
  cabinClass: z.literal("CABIN_CLASS_ECONOMY"),
  adults: z.number(),
});

export const FlightsLivePricesBodySchema = z.object({
  query: FlightsLivePricesQuerySchema,
});

export type FlightsLivePricesBody = z.infer<typeof FlightsLivePricesBodySchema>;

export type FlightsLivePricesQuery = z.infer<
  typeof FlightsLivePricesQuerySchema
>;
