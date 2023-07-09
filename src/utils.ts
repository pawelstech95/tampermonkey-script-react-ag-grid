import { Developer } from "./types";

export function getUserIdsFromTable(tableSelector: HTMLElement) {
  const tableUuid: string[] = [];
  tableSelector
    .querySelectorAll<HTMLTableRowElement>("tbody tr")
    .forEach((rowSelector) => {
      const uuid = getUserUuid(rowSelector);

      if (uuid) {
        tableUuid.push(uuid);
      }
    });

  return tableUuid;
}

export function getUserUuid(rowSelector: HTMLTableRowElement) {
  return rowSelector
    .querySelector("td:first-child a")
    ?.getAttribute("href")
    ?.split("/")[2];
}

export function getFittedChart(developer: Developer) {
  const splittedStringForAvailCol = developer.note.split("\n")[0];

  return (
    splittedStringForAvailCol.lastIndexOf("]") !== -1 &&
    splittedStringForAvailCol.substring(
      splittedStringForAvailCol.indexOf("[") + 1,
      splittedStringForAvailCol.lastIndexOf("]"),
    )
  );
}

export function getOnlyBenchDevelopersAll(developers: Developer[]) {
  const tableOnlyBenchDevelopers: Developer[] = [];

  developers.filter((developer) => {
    const fittedChart = getFittedChart(developer);

    if (fittedChart) tableOnlyBenchDevelopers.push(developer);
  });
  return tableOnlyBenchDevelopers;
}

export function getOnlyBenchDevelopersFromTable(
  developers: Developer[],
  table: HTMLElement,
) {
  return developers.filter((developer) => {
    const row = table.querySelector(`[data-user-uuid="${developer.uuid}"]`);
    return !!row;
  });
}

// export function getCookie(name: string): string {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

export function findNoteForDeveloper(
  uuid: string,
  developers: Developer[],
): string {
  return (
    developers.find((developer) => developer.uuid === uuid)?.note ??
    "Developer not found, for some reason, they are not exist in the developer array"
  );
}
