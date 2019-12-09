const colors = {
  blue: "#60b4f9",
  darkBlue: "#0b4da8",
  orange: "#f9b745",
  purple: "#9572cf",
  green: "#48b6ac",
  pink: "#f26091",
  white: "#ffffff",
  black: "#191C1F"
};

const palette = {
  primary: colors.blue,
  secondary: colors.orange,
  text: colors.white,
  colors
};

const typography = {
  font: `"Roboto", sans-serif`,
  color: palette.text,
  size: 15
};

const unit = 8;
const spacing = (x = 1) => {
  return x * unit;
};

const getVhSize = () => {
  return window.innerHeight / 100;
};

const updateVhSize = (x = 1) => {
  document.documentElement.style.setProperty("--vh", `${getVhSize() * x}px`);
};

const theme = {
  typography,
  palette,
  colors,
  unit,
  spacing,
  getVhSize,
  updateVhSize
};

export default theme;
