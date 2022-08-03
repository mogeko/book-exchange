import { faker } from "@faker-js/faker";

export function oneOf(array: any[]) {
  return array[randomNum(array.length - 1)];
}

export function randomLanguage() {
  return oneOf([
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
  ]);
}

export function arrayBy(length: number, value: any) {
  return Array.from({ length: length }, () => value);
}

export const listBy = arrayBy;

export const randomNum = faker.datatype.number;
