import React from "react";
import styled from "styled-components";
import CurrencyInput from "CurrencyInput";
import Value from "Value";
import Swipe from "Swipe";
import round from "lib/round";
import useSelectors from "lib/use-selectors";
import { useAmount, useSwipe } from "./hooks";

const Pane = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export default function CurrencyPane(props) {
  const { direction } = props;
  const [prev, next] = useSwipe(direction);
  const [amount, change] = useAmount(direction);
  const { currency, opposite, wallet, rate } = useSelectors(direction);

  const primary = (
    <div>
      You have <Value amount={round(wallet)} currency={currency} />
    </div>
  );
  const secondary = rate && (
    <div>
      <Value amount={1} currency={currency} /> ={" "}
      <Value amount={round(rate)} currency={opposite} />
    </div>
  );

  return (
    <Pane>
      <Swipe onLeft={next} onRight={prev}>
        <CurrencyInput
          label={currency}
          helpText={{ primary, secondary }}
          readOnly={direction === "to"}
          value={amount.toString()}
          onChange={change}
        />
      </Swipe>
    </Pane>
  );
}
