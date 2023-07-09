import { Developer, Person } from "../types.ts";
import { getDevelopers } from "./fetchSnapshotData";

export async function enrichDataWithPeople(people: Person[]) {
  const developers = await getDevelopers();

  const developersMap = new Map<string, Developer>();
  developers.forEach((developer) => {
    developersMap.set(developer.uuid, developer);
  });

  const enrichedPeople = people.map((person) => {
    const developer = developersMap.get(person.uuid); // Type assertion to Person or undefined

    if (developer) {
      const { note } = developer;
      return { ...person, note };
    }
    return person;
  });
  console.log("-> enrichedPeople", enrichedPeople);

  return enrichedPeople;
}
