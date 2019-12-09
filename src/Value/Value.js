import React from "react";

import getSymbol from "lib/get-symbol";

export default function Value(props) {
  const { amount, currency } = props;

  return (
    <span>
      <span dangerouslySetInnerHTML={{ __html: getSymbol(currency) }} />
      {amount}
    </span>
  );
}
