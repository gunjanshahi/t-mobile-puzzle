import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery, SelectDateRange } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getSelectedSymbol, getAllPriceQueries, getPriceQueryError, getSelectedDateRange, getFilteredPriceQueries } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );
  priceQueryerror$ = this.store.pipe(select(getPriceQueryError));
  
  getFilteredPriceQuery$ =  this.store.pipe(
    select(getFilteredPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );
  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, from: number, to: number) {
    this.store.dispatch(new FetchPriceQuery(symbol));
    this.store.dispatch(new SelectDateRange(from, to));
  }
}
