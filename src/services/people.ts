import { Developer, Person } from "../types.ts";
import { getDevelopers } from "./fetchData";
import { getFittedChart } from "../utils";

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

      const fittedChart = getFittedChart(developer) || "-";

      const parsedNote = note.replace(`[${fittedChart}]`, "");
      return {
        ...person,
        avail: fittedChart,
        note: note,
        parsedNote: parsedNote,
      };
    }
    return person;
  });

  return enrichedPeople;
}
