import { createMuiTheme } from '@material-ui/core/styles';

export const grayTextColor = '#aab2bd';
export const grayBackgroundColor = '#F5F7FA';
export const charcoalGrayColor = '#434a54';
export const azulColor = '#217ce6';
export const COLlightGreenColor = '#E1F1E9';
export const COLdarkGreenColor = '#2abb4f';
export const errorRedColor = '#ed5040';

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