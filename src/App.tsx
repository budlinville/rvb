import React from 'react';
import { ThemeProvider } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';

import Router from './Router';
import { dark, light } from './themes';

export const App = () => {
    const [isDarkMode, _] = useLocalStorage('DARK_MODE', false);

    return (
        <React.StrictMode>
            <ThemeProvider theme={ isDarkMode ? dark : light }>
                <Router />
            </ThemeProvider>
        </React.StrictMode>
    );
};