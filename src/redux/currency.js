import { createAction, createReducer } from "@reduxjs/toolkit";
import Big from "big.js";
import wrap from "lib/wrap";
import round from "lib/round";

export const startPolling = createAction("currency/start-polling");
export const cancelPolling = createAction("currency/cancel-polling");
export const updateRates = createAction("currency/update-rates");
export const changeAmount = createAction("currency/change-amount");
export const commit = createAction("currency/commit-changes");
export const changeCurrency = createAction("currency/change-currency");

/**
 * Big.js is used to proper handling
 * floating points operations.
 * @param {Array<String>} availableCurrencies
 */
const getInitialState = availableCurrencies => {
  return {
    availableCurrencies,
    exchangeRates: {},
    from: availableCurrencies[0],
    to: availableCurrencies[1],
    amount: {
      from: 0,
      to: 0
    },
    wallet: availableCurrencies.reduce((acc, curr) => {
      acc[curr] = new Big(10);
      return acc;
    }, {})
  };
};

/**
 * createReducer uses Immer under the hood.
 * That's why direction state mutations are OK here.
 * It copies the changes instead.
 */
export const reducer = createReducer(getInitialState(["USD", "EUR", "GBP"]), {
  [updateRates]: (state, { payload }) => {
    state.exchangeRates = payload;
  },

  [changeAmount]: (state, { payload }) => {
    const { from, to, exchangeRates } = state;
    const rate = exchangeRates[to].div(exchangeRates[from]);
    const count = payload;
    const result = new Big(payload || 0).abs().times(rate);

    state.amount.from = count;
    state.amount.to = round(result);
  },

  [commit]: (state, { payload }) => {
    const { from, to } = state;

    state.wallet[from] = state.wallet[from].minus(state.amount.from);
    state.wallet[to] = state.wallet[to].plus(state.amount.to);
    state.amount = {
      from: 0,
      to: 0
    };
  },

  [changeCurrency]: (state, { payload }) => {
    const { direction, inc } = payload;
    const total = state.availableCurrencies.length;
    const currency = state[direction];

    const idx = state.availableCurrencies.indexOf(currency);
    const nextCurrencyIdx = wrap(idx + inc, 0, total);

    state[direction] = state.availableCurrencies[nextCurrencyIdx];
    state.amount = {
      from: 0,
      to: 0
    };
  }
});

export default reducer;
