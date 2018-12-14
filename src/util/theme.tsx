import { createMuiTheme } from '@material-ui/core/styles';
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export const grayTextColor = '#aab2bd';
export const grayBackgroundColor = '#F5F7FA';
export const charcoalGrayColor = '#434a54';
export const azulColor = '#217ce6';
export const premiumBlueColor = '#35C1EC';
export const COLlightGreenColor = '#E1F1E9';
export const COLdarkGreenColor = '#2abb4f';
export const errorRedColor = '#ed5040';
export const orangeColor = '#ff6e5f';

export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: charcoalGrayColor
        },
        secondary: {
            main: azulColor
        },
    },
    typography: {
        fontFamily: 'MarkOT',
        useNextVariants: true,
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        secondary: {
            main: '#000000',
        },
        type: 'dark'
    },
    typography: {
        fontFamily: 'MarkOT',
        useNextVariants: true,
    },
});

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<any>;

interface Sizes {
    phone: number;
    tablet: number;
    desktop: number;
    [key: string]: number;
}
const sizes: Sizes = {
  phone: 320,
  tablet: 768,
  desktop: 1024,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc: any, label) => {
  acc[label] = (...args: any) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(args)}
    }
  `

  return acc
}, {})

export { css, createGlobalStyle, keyframes, ThemeProvider, media };
export default styled;