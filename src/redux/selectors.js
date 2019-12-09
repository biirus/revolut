import { createSelector } from "@reduxjs/toolkit";
import noop from "lib/noop";
import passProps from "lib/pass-props";

export const getAvailableCurrencies = createSelector(
  state => state.availableCurrencies,
  noop
);

export const getCurrentCurrency = createSelector(
  noop,
  passProps,
  (state, direction) => state[direction]
);

export const getAmount = createSelector(
  noop,
  passProps,
  (state, direction) => state.amount[direction]
);

export const getWallet = createSelector(
  noop,
  passProps,
  (state, currency) => state.wallet[currency]
);

export const getRate = createSelector(
  noop,
  passProps,
  (state, { currency, opposite }) => {
    return Object.keys(state.exchangeRates).length > 0
      ? state.exchangeRates[opposite].div(state.exchangeRates[currency])
      : null;
  }
);
