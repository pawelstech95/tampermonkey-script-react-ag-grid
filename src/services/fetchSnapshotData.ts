import axios from "axios";
import { Developer, DevelopersResponse, SnapshotResponse } from "../types.ts";

export async function fetchSnapshotData(url: string) {
  const data = await axios.get<SnapshotResponse>(url);

  if ("people" in data.data) {
    return data.data.people;
  }
}

export async function getDevelopers(): Promise<Developer[]> {
  const host = "beta"; // todo
  const page = 1; //todo
  const pageSize = 75;

  const { data } = await axios.get<DevelopersResponse>(
    `https://${host}.primetric.com/api/myHub/people/advanced_filtering/?page=${page}&page_size=${pageSize}&timeframe_start=1990-07-01&timeframe_end=2050-07-31`,
  );
  const count = data.count;
  const totalPages = Math.ceil(count / pageSize);

  const promises = Array.from({ length: totalPages }, (_, i) =>
    axios.get<DevelopersResponse>(
      `https://${host}.primetric.com/api/myHub/people/advanced_filtering/?page=${
        i + 1
      }&page_size=${pageSize}&workload_min=1990-01-01&workload_max=2050-01-31`,
    ),
  );

  const results = await Promise.all(promises);

  return results.flatMap((result) => result.data.results) as Developer[];
}
