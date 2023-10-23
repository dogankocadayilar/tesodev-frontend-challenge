import data from "../mock-data.json";
import { Record } from "../types/types";

type UnformattedData = {
  cols: string[];
  data: (string | number)[][];
};

function formattedData(d: UnformattedData) {
  return d.data.map((array) => {
    return Object.fromEntries(d.cols.map((col, idx) => [col, array[idx]]));
  });
}

export const records = formattedData(data) as Record[];

export const KEYS = [
  "nameSurname",
  "company",
  "email",
  "phone",
  "website",
  "country",
  "city",
];

export function getFilteredRecords(
  query: string,
  sortingMode: string,
  numOfRecords?: number
): Record[] {
  if (query.trim().length === 0) return [];
  const storedRecords = localStorage.getItem("records");
  const addedRecords: Record[] = storedRecords ? JSON.parse(storedRecords) : [];
  const rc = records
    .concat(addedRecords)
    .filter((item) =>
      KEYS.some((key) =>
        item[key].toLowerCase().includes(query.toLocaleLowerCase().trim())
      )
    );

  return numOfRecords
    ? sortedArray(rc, sortingMode).splice(0, numOfRecords)
    : sortedArray(rc, sortingMode);
  // TODO: sorted array fonksiyonunu buraya taşı
}

export function sortedArray(arr: Record[], mode: string): Record[] {
  switch (mode) {
    case "nasc":
      return arr.sort((a, b) => a.nameSurname.localeCompare(b.nameSurname));
    case "ndesc":
      return arr.sort((a, b) => b.nameSurname.localeCompare(a.nameSurname));
    case "casc":
      return arr.sort((a, b) => a.company.localeCompare(b.company));
    case "cdesc":
      return arr.sort((a, b) => b.company.localeCompare(a.company));
    default:
      return arr;
  }
}
