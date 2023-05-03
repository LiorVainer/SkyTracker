import axios from "axios";
import { API_HOST_HEADER, API_KEY_HEADER } from "../const";

const skyscannerRapidApiV3eUrl = process.env.SKYSCANNER_API_BASE_URL_V3E as
  | string
  | undefined;
const skyscannerRapidApiV3Url = process.env.SKYSCANNER_API_BASE_URL_V3 as
  | string
  | undefined;

if (!skyscannerRapidApiV3eUrl) {
  throw new Error("SKYSCANNER_API_BASE_URL_V3E is not defined");
}

if (!skyscannerRapidApiV3Url) {
  throw new Error("SKYSCANNER_API_BASE_URL_V3 is not defined");
}

export const SkyscannerRapidApiV3e = axios.create({
  baseURL: skyscannerRapidApiV3eUrl,
  headers: {
    [API_KEY_HEADER]: process.env.SKYSCANNER_API_KEY,
    [API_HOST_HEADER]: process.env.SKYSCANNER_API_HOST,
  },
});

export const SkyscannerRapidApiV3 = axios.create({
  baseURL: skyscannerRapidApiV3Url,
  headers: {
    [API_KEY_HEADER]: process.env.SKYSCANNER_API_KEY,
    [API_HOST_HEADER]: process.env.SKYSCANNER_API_HOST,
  },
});
