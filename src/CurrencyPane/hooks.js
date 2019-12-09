import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAmount, changeCurrency } from "redux/currency";
import { getAmount } from "redux/selectors";

export function useAmount(direction) {
  const amount = useSelector(state => getAmount(state, direction));

  const dispatch = useDispatch();
  const change = useCallback(
    e => {
      const value = e.target.value || "0";

      if (value.match(/^(\d+\.?\d{0,2})$/)) {
        dispatch(changeAmount(value.replace(/^0+/, "")));
      }
    },
    [dispatch]
  );

  return [amount, change];
}

export const useSwipe = direction => {
  const dispatch = useDispatch();

  const nextCurrency = useCallback(() => {
    dispatch(changeCurrency({ direction, inc: 1 }));
  }, [direction, dispatch]);

  const prevCurrency = useCallback(() => {
    dispatch(changeCurrency({ direction, inc: -1 }));
  }, [direction, dispatch]);

  return [prevCurrency, nextCurrency];
};
