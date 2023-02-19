import React from 'react'
import { Checkbox, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const theme = createTheme();
export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header/>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </ThemeProvider>
    )
}
