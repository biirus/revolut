import Big from "big.js";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commit } from "redux/currency";
import { getAmount } from "redux/selectors";
import useSelectors from "lib/use-selectors";

export function useExchange() {
  const dispatch = useDispatch();
  const [state, setState] = useState("idle");
  const { wallet, rate } = useSelectors("from");
  const amount = useSelector(state => getAmount(state, "from"));

  const min = rate
    ? parseFloat(
        new Big(0.01)
          .div(rate)
          .round(2, 3)
          .toString()
      )
    : 0;

  const max = parseFloat(wallet.toString());
  const value = parseFloat(amount);
  const isOK = min <= value && value <= max;

  const handleExchange = useCallback(() => {
    isOK && dispatch(commit());
    setState(isOK ? "success" : "error");

    setTimeout(() => {
      setState("idle");
    }, 3000);
  }, [isOK, dispatch]);

  return [state, handleExchange, min, max];
}
