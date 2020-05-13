import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.getFilteredPriceQuery$;
  error$ = this.priceQuery.priceQueryerror$;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  private unsubscribe: Subject<void> = new Subject<void>();
  maxFromDate: Date;
  maxToDate: Date;
  minToDate: Date;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.maxFromDate = new Date();
    this.maxToDate = new Date();
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      toDate: [null, Validators.required],
      fromDate : [null, Validators.required]
    });

    
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(this.fetchQuote.bind(this));
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, toDate,  fromDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, fromDate.getTime(), toDate.getTime());
    }
  }

  onChangeToDate(event) {
    this.maxFromDate = event.target.value;
  }

  onChangeFromDate(event) {
    this.minToDate = event.target.value;
  }

  /**
   * Invalid Input validation.
   * @param controlName : Form control name
  */
 checkInvalidInput(controlName: string): boolean {
  return this.stockPickerForm.get(controlName).invalid
    && this.stockPickerForm.get(controlName).dirty;
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
