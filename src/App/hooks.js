import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startPolling, cancelPolling } from "redux/currency";
import { getAvailableCurrencies, getCurrentCurrency } from "redux/selectors";

export const useSync = () => {
  const dispatch = useDispatch();

  const startSync = useCallback(() => {
    dispatch(startPolling());
  }, [dispatch]);

  const stopSync = useCallback(() => {
    dispatch(cancelPolling());
  }, [dispatch]);

  useEffect(() => {
    startSync();

    return stopSync;
  }, [startSync, stopSync]);

  return [startSync, stopSync];
};

export const useIndicator = direction => {
  const currencies = useSelector(getAvailableCurrencies);
  const current = useSelector(state => getCurrentCurrency(state, direction));
  const idx = currencies.indexOf(current);

  return [idx, currencies];
};
