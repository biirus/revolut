import React from "react";
import styled from "styled-components";
import Header from "Header";
import CurrencyPane from "CurrencyPane";

import { useSync, useIndicator } from "./hooks";

const MainScreen = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 1fr;
  height: 100%;
`;

const Pane = styled.section`
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing(3)}px;
  align-items: center;
  height: 100%;
  width: 100%;
  flex: 1 0 auto;
  padding: ${({ theme }) => theme.spacing(3)}px;
  background: ${({ theme, isTo }) =>
    isTo
      ? `radial-gradient(${theme.palette.primary}, ${theme.palette.colors.darkBlue})`
      : theme.palette.primary};

  ${props =>
    !props.isTo &&
    `&::after {
        position: absolute;
        display: block;
        content: "";
        bottom: 0;
        left: 50%;
        width: 0; 
        height: 0; 
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid ${props.theme.palette.primary};
        transform: translate(-50%, 100%);
        z-index: 1;
      }`}
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Indicator = styled.div`
  width: ${props => props.theme.spacing(1)}px;
  height: ${props => props.theme.spacing(1)}px;
  margin: ${props => props.theme.spacing(0.5)}px;
  border-radius: 50%;
  background-color: ${props => props.theme.palette.text};
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  transition: opacity 200ms linear;
`;

export default function App() {
  const [, stop] = useSync();
  const [idxFrom, currencies] = useIndicator("from");
  const [idxTo] = useIndicator("to");

  return (
    <MainScreen>
      <Header onCancel={stop} />

      <Pane>
        <CurrencyPane direction="from" />
        <Footer>
          {currencies.map((c, i) => (
            <Indicator key={c} isActive={idxFrom === i} />
          ))}
        </Footer>
      </Pane>

      <Pane isTo>
        <CurrencyPane direction="to" />
        <Footer>
          {currencies.map((c, i) => (
            <Indicator key={c} isActive={idxTo === i} />
          ))}
        </Footer>
      </Pane>
    </MainScreen>
  );
}
