import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	:root {
		--vh: ${({ theme }) => theme.getVhSize()}px;
	}

	* {
		box-sizing: border-box;
		-webkit-appearance: none;
		-moz-appearance: none;
		margin: 0;
		padding: 0;
	}
	
	#root {
		margin: 0;
		padding: 0;
		height: 100vh;
  	height: calc(var(--vh, 1vh) * 100);
		transition: height .2s linear;
	}

  body {
		height: 100vh;
    color: ${({ theme }) => theme.typography.color};
		font-family: ${({ theme }) => theme.typography.font};
		background: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.palette.primary} 10%, ${theme.palette.colors.darkBlue} 50%)`}
	}
`;
