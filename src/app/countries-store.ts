import { observable, action } from 'mobx-angular';
class CountriesStore {
  @observable countries = [];
  @action setCountries(countries) {
    this.countries = countries;
  }
}
export const countriesStore = new CountriesStore();
