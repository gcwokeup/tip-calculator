import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TipsService {
  constructor(private http: HttpClient) { }
  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
  getTipRates(country) {
    const ROUND_UP_COUNTRIES = `France,Italy,Hungary,Greece,Latvia`.split(',').map(c => c.trim());
    const FIVE_PERCENT_TIP_COUNTRIES = `
      Ecuador,
      Argentina,
      Austria,
      Albania,
      Turkey,
      India,
      Slovenia,
      Romania,
      Lithuania,
      Russia
    `.split(',')
    .map(c => c.trim());
    const TEN_PERCENT_TIP_COUNTRIES = `
      Colombia,
      Slovakia,
      Estonia,
      Cuba,
      Uruguay,
      Bulgaria
    `.split(',')
    .map(c => c.trim());
    const FIFTEEN_PERCENT_TIP_COUNTRIES = `
      Serbia,
      Canada,
      Mexico,
      Chile,
      Poland,
      Ukraine,
      Egypt,
      Armenia
    `.split(',')
    .map(c => c.trim());
    const TWENTY_PERCENT_TIP_COUNTRIES = ['United States']
    if (TWENTY_PERCENT_TIP_COUNTRIES.includes(country)) {
      return 0.2;
    }
    if (FIFTEEN_PERCENT_TIP_COUNTRIES.includes(country)) {
      return 0.15;
    }
    if (TEN_PERCENT_TIP_COUNTRIES.includes(country)) {
      return 0.1;
    }
    if (FIVE_PERCENT_TIP_COUNTRIES.includes(country) || ROUND_UP_COUNTRIES.includes(country)) {
      return 0.05;
    }
    return 0
  }
}
