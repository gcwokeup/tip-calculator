import { Component, OnInit } from '@angular/core';
import { TipsService } from '../tips.service';
import { countriesStore } from '../countries-store';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  store = countriesStore;
  countries: any[] = [];
  form: any = {} as any;
  amountAfterTip = 0;
  splitAmountAfterTip = 0;
  currency = '';
  constructor(private tipsService: TipsService) { }
  ngOnInit() {
    if (this.store.countries.length == 0) {
      this.tipsService.getCountries()
      .subscribe(res => {
        this.store.setCountries(res);
      });
    }
  }
  calculate(tipForm: NgForm) {
    if (tipForm.invalid) {
      return;
    }
    const country = this.store.countries.find(c => c.name == this.form.country);
    this.currency = country ? country.currencies[0].code : '';
    this.amountAfterTip = +this.form.amount * (1 + this.tipsService.getTipRates(this.form.country));
    this.splitAmountAfterTip = +this.amountAfterTip / +this.form.numPeople;
  }

  addMaskingByLength(inputLength: number) {
    return 'X'.repeat(inputLength - 4).concat('0000');
  }
}
