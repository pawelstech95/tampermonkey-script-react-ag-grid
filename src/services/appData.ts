import { fetchSnapshotData } from "./fetchData.ts";
import { enrichDataWithPeople } from "./people.ts";

export async function snapshotDataListener(url: string) {
  const data = await fetchSnapshotData(`${url}?fromListener=true`);
  if (data) {
    return enrichDataWithPeople(data);
  }
}
