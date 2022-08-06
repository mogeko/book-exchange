import { faker } from "@faker-js/faker";

export function oneOf<T = any>(array: T[]): T {
  return array[randomNum(array.length - 1)];
}

export function someOf<T = any>(array: T[]): T[] {
  const result = array.filter(randomBool);

  return result.length === 0 ? [oneOf(array)] : result;
}

export function languages<T = any>(fn: (lang: string[]) => T): T {
  const langs = [
    "Afrikaans",
    "Arabic",
    "Azerbaijani",
    "Czech",
    "German",
    "Greek",
    "English",
    "Spanish",
    "Farsi",
    "Finnish",
    "French",
    "Georgian",
    "Hebrew",
    "Hrvatski",
    "Hungarian",
    "Armenian",
    "Indonesia",
    "Italian",
    "Japanese",
    "Korean",
    "Latvian",
    "Macedonian",
    "Norwegian",
    "Nepalese",
    "Dutch",
    "Polish",
    "Romanian",
    "Russian",
    "Slovakian",
    "Swedish",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Vietnamese",
    "Chinese",
  ];

  return fn(langs);
}

export const randomNum = faker.datatype.number;

export const randomBool = faker.datatype.boolean;

export const randomDateRecent = () => {
  return faker.date.recent(10, "2022-01-01T00:00:00.000Z").toISOString();
};

export const randomDatePost = () => {
  return faker.date.past(1000, "2000-01-01T00:00:00.000Z").toISOString();
};
