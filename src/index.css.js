import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    dark: "#0f0f0f",
    grey: "#CDCDCD",
  },
};

export const global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${theme.colors.dark};
  }
`;
