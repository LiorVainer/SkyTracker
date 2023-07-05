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

export const CABIN_CLASS_ENUM = [
  "CABIN_CLASS_ECONOMY",
  "CABIN_CLASS_PREMIUM_ECONOMY",
  "CABIN_CLASS_BUSINESS",
  "CABIN_CLASS_FIRST",
  "CABIN_CLASS_UNSPECIFIED",
] as const;

export const CABIN_CLASS = {
  ECONOMY: "CABIN_CLASS_ECONOMY",
  PREMIUM_ECONOMY: "CABIN_CLASS_PREMIUM_ECONOMY",
  BUSINESS: "CABIN_CLASS_BUSINESS",
  FIRST: "CABIN_CLASS_FIRST",
  UNSPECIFIED: "CABIN_CLASS_UNSPECIFIED",
} as const;

export const FlightsLivePricesQuerySchema = z.object({
  market: z.string(),
  locale: z.string(),
  currency: z.string(),
  queryLegs: z.array(QueryLegSchema),
  cabinClass: z.enum(CABIN_CLASS_ENUM),
  adults: z.number(),
  childrenAges: z.array(z.number()).optional(),
  nearbyAirports: z.boolean().optional(),
  prefer_directs: z.boolean().optional(),
});

export const FlightsLivePricesBodySchema = z.object({
  query: FlightsLivePricesQuerySchema,
});

export type FlightsLivePricesBody = z.infer<typeof FlightsLivePricesBodySchema>;

export type FlightsLivePricesQuery = z.infer<
  typeof FlightsLivePricesQuerySchema
>;

export const ItinerarySchema = z.object({
  pricingOptions: z.array(
    z.object({
      id: z.string(),
      price: z.object({
        amount: z.string(),
        unit: z.string(),
        updateStatus: z.string(),
      }),
      items: z.array(
        z.object({
          price: z.object({
            amount: z.string(),
            unit: z.string(),
            updateStatus: z.string(),
          }),
          fares: z.array(
            z.object({
              segmentId: z.string(),
              fareBasisCode: z.string(),
              bookingCode: z.string(),
              fareFamily: z.string(),
            })
          ),
          deepLink: z.string(),
          agentId: z.string(),
        })
      ),
      agentIds: z.array(z.string()),
      transferType: z.string(),
    })
  ),
  legIds: z.array(z.string()),
  sustainabilityData: z.null(),
});

export const CarrierSchema = z.object({
  name: z.string(),
  iata: z.string(),
  imageUrl: z.string(),
  allianceId: z.string(),
});

export const LegSchema = z.object({
  originPlaceId: z.string(),
  destinationPlaceId: z.string(),

  departureDateTime: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
  }),
  arrivalDateTime: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
  }),
  marketingCarrierIds: z.array(z.string()),
  operatingCarrierIds: z.array(z.string()),
  durationInMinutes: z.number(),
  segmentIds: z.array(z.string()),
  stopCount: z.number(),
});

export const AgentSchema = z.object({
  name: z.string(),
  type: z.string(),
  feedbackCount: z.number(),
  rating: z.number(),
  ratingBreakdown: z.object({
    other: z.number(),
    reliablePrices: z.number(),
    clearExtraFees: z.number(),
    customerService: z.number(),
    easeOfBooking: z.number(),
  }),
  isOptimisedForMobile: z.boolean(),
});

export const PlaceSchema = z.object({
  entityId: z.string(),
  parentId: z.string(),
  name: z.string(),
  type: z.string(),
  iata: z.string(),
  coordinates: z.null(),
});

export const SegmentSchema = z.object({
  originPlaceId: z.string(),
  destinationPlaceId: z.string(),
  departureDateTime: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
  }),
  arrivalDateTime: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
  }),
  durationInMinutes: z.number(),
  marketingFlightNumber: z.string(),
  marketingCarrierId: z.string(),
  operatingCarrierId: z.string(),
});

export const AllianceSchema = z.object({
  name: z.string(),
});

export const FlightsLivePricesResponseSchema = z.object({
  action: z.string(),
  content: z.object({
    results: z.object({
      itineraries: z.record(ItinerarySchema),
      carriers: z.record(CarrierSchema),
      legs: z.record(LegSchema),
      agents: z.record(AgentSchema),
      places: z.record(PlaceSchema),
      segments: z.record(SegmentSchema),
      alliances: z.record(AllianceSchema),
    }),
    sortingOptions: z.object({
      cheapest: z.array(
        z.object({ score: z.number(), itineraryId: z.string() })
      ),
      best: z.array(z.unknown()),
      fastest: z.array(z.unknown()),
    }),
    stats: z.object({}),
  }),
  sessionToken: z.string(),
  status: z.string(),
});

export type FlightsLivePricesResponse = z.infer<
  typeof FlightsLivePricesResponseSchema
>;
