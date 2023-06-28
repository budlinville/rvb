import React from 'react';
import { ThemeProvider } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Router from './Router';
import { dark, light, setAmplifyDarkMode } from './themes/index.ts';
import { DARK_MODE } from './local-storage/keys.ts';
import ContextProvider from './components/ContextProvider.tsx';
import CountFetcher from './components/CountFetcher.tsx';
import Background from './components/Background/index.tsx';


Amplify.configure(config);


export const App = () => {
    const [isDarkMode, _] = useLocalStorage(DARK_MODE, false);

    if (isDarkMode)
        setAmplifyDarkMode();

    return (
        <React.StrictMode>
            <AmplifyProvider>
                <ThemeProvider theme={ isDarkMode ? dark : light }>
                    <ContextProvider>
                        <CountFetcher>
                            <Background>
                                <Router />
                            </Background>
                        </CountFetcher>
                    </ContextProvider>
                </ThemeProvider>
            </AmplifyProvider>
        </React.StrictMode>
    );
};
