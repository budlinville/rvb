import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'

import Router from './Router'
import { light } from './themes'

import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={ light }>
            <Router />
        </ThemeProvider>
    </React.StrictMode>,
);
