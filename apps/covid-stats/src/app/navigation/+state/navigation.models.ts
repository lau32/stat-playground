interface CountryNumbers {
  confirmed: number
  deaths: number
  recovered: number
}

export interface NavigationEntity {
  id?: string | number;
  name: string;
  'alpha-2': string;
  'alpha-3': string;
  countryCode: string;
  'iso_3166-2': string;
  region: string;
  subRegion: string;
  intermediateRegion: string;
  regionCode: string;
  subRegionCode: string;
  intermediateRegionCode: string;
  numbers?: CountryNumbers
}
