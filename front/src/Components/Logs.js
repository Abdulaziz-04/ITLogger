import React, { useEffect, useContext, useMemo } from 'react';
import { Grid, CircularProgress, Box, Typography, Stack, Button } from '@mui/material';
import LogItem from './LogItem';
import logContext from '../ContextAPI/LogsAPI/LogContext';

const Logs = () => {
    const { loading, getLogs, logs, filters, resetFilters } = useContext(logContext);

    useEffect(() => {
        getLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredLogs = useMemo(() => {
        let data = [...logs];
        if (filters.query) {
            const query = filters.query.toLowerCase();
            data = data.filter(
                log =>
                    log.message.toLowerCase().includes(query) ||
                    (log.tech && log.tech.toLowerCase().includes(query)) ||
                    (log._id && log._id.toString().includes(query))
            );
        }
        if (filters.status !== 'all') {
            data = data.filter(log => (log.status || 'open') === filters.status);
        }
        if (filters.attention !== 'all') {
            const needsAttention = filters.attention === 'true';
            data = data.filter(log => Boolean(log.attention) === needsAttention);
        }
        if (filters.tech !== 'all') {
            data = data.filter(log => log.tech === filters.tech);
        }
        if (filters.category !== 'all') {
            data = data.filter(log => (log.category || 'General') === filters.category);
        }
        data.sort((a, b) => {
            const aDate = new Date(a.dt || a.createdAt);
            const bDate = new Date(b.dt || b.createdAt);
            return bDate - aDate;
        });
        return data;
    }, [logs, filters]);

    if (loading) {
        return (
            <Box display='flex' justifyContent='center' mt={8}>
                <CircularProgress size={64} />
            </Box>
        );
    }

    if (!loading && filteredLogs.length === 0) {
        return (
            <Stack spacing={2} alignItems='center' sx={{ py: 8 }}>
                <Typography variant='h6'>No logs to show</Typography>
                <Typography variant='body2' color='text.secondary'>
                    Try relaxing the filters or add a new log.
                </Typography>
                <Button variant='outlined' onClick={resetFilters}>
                    Reset filters
                </Button>
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
                Activity
            </Typography>
            <Grid container spacing={2}>
                {filteredLogs.map(log => (
                    <Grid item xs={12} md={6} key={log._id}>
                        <LogItem log={log} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default Logs;
