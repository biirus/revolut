import { useSelector } from "react-redux";
import { getCurrentCurrency, getWallet, getRate } from "redux/selectors";

export function useSelectors(direction) {
  const oppositeDirection = {
    from: "to",
    to: "from"
  };

  const currency = useSelector(state => getCurrentCurrency(state, direction));
  const opposite = useSelector(state =>
    getCurrentCurrency(state, oppositeDirection[direction])
  );

  const wallet = useSelector(state => getWallet(state, currency));
  const rate = useSelector(state => getRate(state, { currency, opposite }));

  return { currency, opposite, wallet, rate };
}

export default useSelectors;
