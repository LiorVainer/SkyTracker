import { NextRequest, NextResponse } from "next/server";

import { FlightsLivePricesBodySchema } from "@/app/types/flights-live-prices.types";
import { flightsLivePricesApiService } from "../services/flights-live-prices.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validBody = FlightsLivePricesBodySchema.parse(body);
    const res = await flightsLivePricesApiService.createAndPoll(
      validBody.query
    );
    // const res = await flightsLivePricesApiService.poll(
    //   createRes.data.sessionToken
    // );
    // console.log(createRes.status);
    // console.log(createRes.statusText);

    if (res.status === 200) {
      return NextResponse.json(res.data);
    } else {
      return new Response(res.statusText, { status: res.status });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
