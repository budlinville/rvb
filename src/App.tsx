import React from 'react';
import { ThemeProvider } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';

import { Amplify } from 'aws-amplify';
import config from './aws-exports.ts';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Router from './Router';
import { dark, light } from './themes/index.ts';
import { DARK_MODE } from './local-storage/keys.ts';

Amplify.configure(config);

export const App = () => {
    const [isDarkMode, _] = useLocalStorage(DARK_MODE, false);

    return (
        <React.StrictMode>
            <AmplifyProvider>
                <ThemeProvider theme={ isDarkMode ? dark : light }>
                    <Router />
                </ThemeProvider>
            </AmplifyProvider>
        </React.StrictMode>
    );
};