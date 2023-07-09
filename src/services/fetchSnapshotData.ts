import axios from "axios";
import { SnapshotResponse } from "../types.ts";

export async function fetchSnapshotData(url: string) {
  const data = await axios.get<SnapshotResponse>(url);

  if ("people" in data.data) {
    return data.data.people;
  }
}
