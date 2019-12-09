import React, { useContext, useCallback } from "react";
import styled, { ThemeContext } from "styled-components";
import isMobile from "lib/is-mobile";

const Row = styled.div`
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: ${props =>
    props.isReverse ? `1fr max-content` : `max-content 1fr`};
  grid-gap: ${props => props.theme.spacing(3)}px;

  & + & {
    margin-top: ${props => props.theme.spacing(1)}px;
  }
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: ${props => props.theme.typography.size * 2}px;
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: right;
  font-size: ${props => props.theme.typography.size * 2}px;
  color: ${props => props.theme.typography.color};

  &:focus {
    outline: none;
    font-size: ${props => props.theme.typography.size * 2}px;
  }
`;

export default function CurrencyInput(props) {
  const { label, helpText, ...rest } = props;
  const { updateVhSize } = useContext(ThemeContext);

  const handleFocus = useCallback(() => {
    // make a room for the keyboard
    isMobile() && updateVhSize(0.65);
  }, [updateVhSize]);

  const handleBlur = useCallback(() => {
    isMobile() && updateVhSize(1);
  }, [updateVhSize]);

  return (
    <div>
      <Row>
        <Label>{label}</Label>
        <Input
          {...rest}
          type="number"
          inputMode="decimal"
          step=".01"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Row>
      <Row isReverse>
        <div>{helpText.primary}</div>
        <div>{helpText.secondary}</div>
      </Row>
    </div>
  );
}

CurrencyInput.defaultProps = {
  className: "",
  helpText: {
    primary: null,
    secondary: null
  }
};
