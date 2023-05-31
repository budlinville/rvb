import { ThemeOptions, createTheme } from '@mui/material/styles';
import darkScrollbar from '@mui/material/darkScrollbar';
import { PaletteMode } from '@mui/material';
import { grey } from "@mui/material/colors";

import { DARK_MODE } from './local-storage/keys';

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

const lightOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        // primary:    { main: '#efefef' },
        // secondary:  { main: '#e8e8e8' },
    },
    ...commonProperties('light')
};

export const light = createTheme(lightOptions);


const darkOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        // primary:    { main: '#181818' },
        // secondary:  { main: '#2f2f2f' },
    },
    ...commonProperties('dark'),
    overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              transition: 'all 0.3s linear',
            },
          },
        },
      },
};

export const dark = createTheme(darkOptions);