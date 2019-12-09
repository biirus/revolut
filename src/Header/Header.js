import React from "react";
import styled from "styled-components";
import Banner from "Banner";

import { useExchange } from "./hooks";

const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing(1)}px;
`;

export default function Header(props) {
  const { onCancel } = props;
  const [state, handleExchange, min, max] = useExchange();

  return (
    <AppHeader>
      <div onClick={onCancel}>cancel</div>
      <div onClick={handleExchange}>exchange</div>

      <Banner isOpen={state !== "idle"} isError={state === "error"}>
        {state === "error"
          ? max === 0
            ? "You don't have anough money"
            : `You amount should be more than ${min} and less than ${max}`
          : "Success"}
      </Banner>
    </AppHeader>
  );
}
