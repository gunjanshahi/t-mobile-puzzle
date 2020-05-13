import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  priceQueryAdapter,
  PriceQueryState,
  PRICEQUERY_FEATURE_KEY
} from './price-query.reducer';

const getPriceQueryState = createFeatureSelector<PriceQueryState>(
  PRICEQUERY_FEATURE_KEY
);

export const getSelectedSymbol = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.selectedSymbol
);

export const getPriceQueryError = createSelector(
  getPriceQueryState,
  state => state.error
)

const { selectAll } = priceQueryAdapter.getSelectors();

export const getAllPriceQueries = createSelector(
  getPriceQueryState,
  selectAll
);

export const getSelectedDateRange = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.dateRange
);

export const getFilteredPriceQueries = createSelector(
  getAllPriceQueries,
  getSelectedDateRange,
  (prices, dateRange) => prices.filter(price => price.dateNumeric >= dateRange.fromDate && price.dateNumeric <= dateRange.toDate)
);