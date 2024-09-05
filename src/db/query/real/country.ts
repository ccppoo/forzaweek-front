import { db } from '@/db/index';
import { Country } from '@/db/model/real';
import { country as countryZod } from '@/schema/real/country';
import { CountryInput, CountryType } from '@/schema/real/types';

export async function getAllCountry(): Promise<CountryType[]> {
  const countries = await db.country.offset(0).toArray();
  const _countries = countries.map((cnt) => countryZod.parse(cnt) as CountryType);
  return _countries;
}

export async function getCountry(countryID: string): Promise<CountryType | undefined> {
  const country = await db.country.get(countryID);
  if (!country) return undefined;

  return country as unknown as CountryType;
}

export async function getCountriesByID(countryIDs: string[]): Promise<CountryType[]> {
  const country = await db.country.bulkGet(countryIDs);
  if (!country) return [];

  return country as CountryType[];
}
