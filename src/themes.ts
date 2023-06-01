import { ThemeOptions, createTheme } from '@mui/material/styles';
import darkScrollbar from '@mui/material/darkScrollbar';
import { PaletteMode } from '@mui/material';
import { grey } from "@mui/material/colors";

import './index.css';

// These are defined in index.css
const RED           = getComputedStyle(document.documentElement).getPropertyValue('--RED');
const DARK_RED      = getComputedStyle(document.documentElement).getPropertyValue('--DARK-RED');
const LIGHT_RED     = getComputedStyle(document.documentElement).getPropertyValue('--LIGHT-RED');
const BLUE          = getComputedStyle(document.documentElement).getPropertyValue('--BLUE');
const DARK_BLUE     = getComputedStyle(document.documentElement).getPropertyValue('--DARK-BLUE');
const LIGHT_BLUE    = getComputedStyle(document.documentElement).getPropertyValue('--LIGHT-BLUE');

const primary   = { main: RED,  dark: DARK_RED,  light: LIGHT_RED };
const secondary = { main: BLUE, dark: DARK_BLUE, light: LIGHT_BLUE };


//----------------------------------------------------------------------------------------------------------------------


const commonProperties = (mode: PaletteMode): ThemeOptions => ({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ...darkScrollbar(
                    mode === "light"
                        ? { track: grey[200], thumb: grey[400], active: grey[500] }
                        : undefined
                ),
            },
        },
    },
});


//----------------------------------------------------------------------------------------------------------------------


const lightOptions: ThemeOptions = {
    palette: { mode: 'light', primary, secondary },
    ...commonProperties('light')
};

export const light = createTheme(lightOptions);


//----------------------------------------------------------------------------------------------------------------------


const darkOptions: ThemeOptions = {
    palette: { mode: 'dark', primary, secondary },
    ...commonProperties('dark'),
};

export const dark = createTheme(darkOptions);
