import { cache } from "react";

interface GenericDataResponse {
  set: string | number;
  version: string;
  data: Record<string, unknown>[];
}

interface GuidesDataResponse {
  guides: Record<string, unknown>[];
  status: string;
  totalGuides: number;
  updated: string;
}

type DataType =
  | "champions"
  | "traits"
  | "items"
  | "augments"
  | "champions-revival"
  | "traits-revival"
  | "items-revival"
  | "augments-revival"
  | "guides"
  | "guides-revival";

type FetchDataReturn<T extends DataType> = T extends "guides" | "guides-revival"
  ? GuidesDataResponse | null
  : GenericDataResponse | null;

function isGuidesDataResponse<T extends DataType>(
  data: any,
  type: T
): data is GuidesDataResponse {
  return (
    (type === "guides" || type === "guides-revival") &&
    data &&
    Array.isArray(data.guides)
  );
}

function isGenericDataResponse<T extends DataType>(
  data: any,
  type: T
): data is GenericDataResponse {
  return (
    !["guides", "guides-revival"].includes(type) &&
    data &&
    Array.isArray(data.data)
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const DataFetcher = cache(
  async <T extends DataType>(type: T): Promise<FetchDataReturn<T>> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const url = `${BASE_URL}/data/auto/${type}.json`;

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

      const data = await response.json();

      if (
        isGuidesDataResponse(data, type) ||
        isGenericDataResponse(data, type)
      ) {
        return data as FetchDataReturn<T>;
      }

      console.error(`Invalid ${type} data structure`);
      return null;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`Error fetching ${type}:`, error);
      return null;
    }
  }
);
