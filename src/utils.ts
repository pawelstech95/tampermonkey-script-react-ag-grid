import { Developer, Person } from "./types";

export function getFittedChart(employee: Developer | Person) {
  const splittedStringForAvailCol = employee.note.split("\n")[0];

  return (
    splittedStringForAvailCol.lastIndexOf("]") !== -1 &&
    splittedStringForAvailCol.substring(
      splittedStringForAvailCol.indexOf("[") + 1,
      splittedStringForAvailCol.lastIndexOf("]"),
    )
  );
}

export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    if (cookieValue) {
      return cookieValue;
    }
  }
  throw new Error(`Cookie with name '${name}' not found.`);
}
