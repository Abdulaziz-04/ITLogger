import React, { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Stack } from '@mui/material';
import Search from './Components/Search';
import Logs from './Components/Logs';
import Actions from './Components/Actions';
import Edit from './Components/Edit';
import LogState from './ContextAPI/LogsAPI/LogState';
import './App.css';

const themeSettings = mode =>
    createTheme({
        palette: {
            mode,
            primary: { main: '#1d4ed8' },
            secondary: { main: '#0ea5e9' },
            info: { main: '#6366f1' },
            success: { main: '#16a34a' },
            warning: { main: '#f59e0b' },
            error: { main: '#ef4444' },
            background: {
                default: mode === 'light' ? '#f4f6fb' : '#0f172a',
                paper: mode === 'light' ? '#ffffff' : '#111827'
            }
        },
        shape: { borderRadius: 12 },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 600
                    }
                }
            }
        }
    });

const App = () => {
    const [mode, setMode] = useState('light');
    const theme = useMemo(() => themeSettings(mode), [mode]);

    const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LogState>
                <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
                    <Search mode={mode} onToggleMode={toggleMode} />
                    <Container maxWidth='lg' sx={{ py: 4 }}>
                        <Stack spacing={3}>
                            <Actions />
                            <Logs />
                        </Stack>
                    </Container>
                    <Edit />
                </Box>
            </LogState>
        </ThemeProvider>
    );
};

export default App;
