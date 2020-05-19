import { Action } from '@ngrx/store';
import { PriceQueryResponse } from './price-query.type';

export enum PriceQueryActionTypes {
  SelectSymbol = 'priceQuery.selectSymbol',
  FetchPriceQuery = 'priceQuery.fetch',
  PriceQueryFetched = 'priceQuery.fetched',
  PriceQueryFetchError = 'priceQuery.error',
  SelectDateRange = 'priceQuery.selectDateRange',
}

export class FetchPriceQuery implements Action {
  readonly type = PriceQueryActionTypes.FetchPriceQuery;
  constructor(public symbol: string) {}
}

export class PriceQueryFetchError implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetchError;
  constructor(public error: any) {}
}

export class PriceQueryFetched implements Action {
  readonly type = PriceQueryActionTypes.PriceQueryFetched;
  constructor(public queryResults: PriceQueryResponse[]) {}
}

export class SelectSymbol implements Action {
  readonly type = PriceQueryActionTypes.SelectSymbol;
  constructor(public symbol: string) {}
}

export class SelectDateRange implements Action {
  readonly type = PriceQueryActionTypes.SelectDateRange;
  constructor(public fromDate: number, public toDate: number) {}
}

export type PriceQueryAction =
  | FetchPriceQuery
  | PriceQueryFetched
  | PriceQueryFetchError
  | SelectSymbol
  | SelectDateRange;

export const fromPriceQueryActions = {
  FetchPriceQuery,
  PriceQueryFetched,
  PriceQueryFetchError,
  SelectSymbol,
  SelectDateRange
};
