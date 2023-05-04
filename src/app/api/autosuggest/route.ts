import { FlightsAutosuggestBodySchema } from "@/app/types/flights-autosuggest.types";
import { NextRequest, NextResponse } from "next/server";
import { autosuggestApiService } from "../services/autosuggest.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validBody = FlightsAutosuggestBodySchema.parse(body);
    const res = await autosuggestApiService.flights(validBody.query);

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
