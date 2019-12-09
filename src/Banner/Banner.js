import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" }
};

const Root = styled(motion.div)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px;
  box-shadow: 0 0 ${({ theme }) => theme.spacing(1)}px rgba(0, 0, 0, 0.35);
  background-color: ${({ isError, theme }) =>
    theme.palette.colors[isError ? "pink" : "green"]};
`;

export default function Banner({ isOpen, isError, children }) {
  return (
    <Root
      isError={isError}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      {children}
    </Root>
  );
}
