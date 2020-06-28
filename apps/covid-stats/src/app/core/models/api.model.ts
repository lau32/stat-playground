export interface CountryNumbers {
  confirmed: number
  deaths: number
  recovered: number
}

export interface Result {
  [x: string]: CountryNumbers
}
