import axios from "axios";
import {
  Developer,
  DevelopersResponse,
  Seniority,
  SnapshotResponse,
} from "../types.ts";
import { getCookie } from "../utils";

// todo to rewrite
const host = window.location.host;

export async function fetchSnapshotData(url: string) {
  const data = await axios.get<SnapshotResponse>(url);

  if ("people" in data.data) {
    return data.data.people;
  }
}

export async function getDevelopers(): Promise<Developer[]> {
  const page = 1;
  const pageSize = 75;

  const { data } = await axios.get<DevelopersResponse>(
    `https://${host}/api/myHub/people/advanced_filtering/?page=${page}&page_size=${pageSize}&timeframe_start=1990-07-01&timeframe_end=2050-07-31`,
  );
  const count = data.count;
  const totalPages = Math.ceil(count / pageSize);

  const promises = Array.from({ length: totalPages }, (_, i) =>
    axios.get<DevelopersResponse>(
      `https://${host}/api/myHub/people/advanced_filtering/?page=${
        i + 1
      }&page_size=${pageSize}&workload_min=1990-01-01&workload_max=2050-01-31`,
    ),
  );

  const results = await Promise.all(promises);

  return results.flatMap((result) => result.data.results) as Developer[];
}

export async function getSeniorities(): Promise<Seniority[]> {
  const data = await axios.get(`https://${host}/api/company/seniorities`);

  return data.data as Seniority[];
}

export async function updateDeveloperNotes(uuid: string, note: string) {
  await fetch(`https://${host}/api/employees_profiles/${uuid}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-csrftoken": getCookie("csrftoken"),
    },
    body: JSON.stringify({ note }),
  }); // todo axios
  await getDevelopers();
}
