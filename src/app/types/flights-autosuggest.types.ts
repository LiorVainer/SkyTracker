import { z } from "zod";

export const FlightsAutosuggestQuerySchema = z.object({
  market: z.string(),
  locale: z.string(),
  searchTerm: z.string(),
});

export const FlightsAutosuggestBodySchema = z.object({
  query: FlightsAutosuggestQuerySchema,
});

export type FlightsAutosuggestBody = z.infer<
  typeof FlightsAutosuggestBodySchema
>;

export type FlightsAutosuggestQuery = z.infer<
  typeof FlightsAutosuggestQuerySchema
>;
