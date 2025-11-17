import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Grid, Typography, Stack, Button, Chip, Box, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import Form from './Form';
import AddTech from './AddTech';
import Techlist from './Techlist';
import LogContext from '../ContextAPI/LogsAPI/LogContext';
import { attentionPalette, statusPalette } from './statusTheme';

const StatCard = ({ icon: Icon, label, value, color = 'primary', chipSx, variant = 'filled' }) => {
    return (
        <Card elevation={1} sx={{ height: '100%', minHeight: 124 }}>
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 2.5 }
                }}
            >
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Chip
                        icon={Icon ? <Icon fontSize='small' /> : undefined}
                        label={label}
                        color={color}
                        variant={variant}
                        sx={chipSx}
                    />
                    <Typography variant='h5' sx={{ fontWeight: 700 }}>
                        {value}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

const Actions = () => {
    const { logs, techs, getTechs } = useContext(LogContext);
    const [openLog, setOpenLog] = useState(false);
    const [openTech, setOpenTech] = useState(false);
    const [openList, setOpenList] = useState(false);

    useEffect(() => {
        getTechs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stats = useMemo(() => {
        const open = logs.filter(log => (log.status || 'open') === 'open').length;
        const inProgress = logs.filter(log => (log.status || 'open') === 'in_progress').length;
        const resolved = logs.filter(log => (log.status || 'open') === 'resolved').length;
        const attention = logs.filter(log => log.attention).length;
        return {
            open,
            inProgress,
            resolved,
            attention,
            techCount: techs.length
        };
    }, [logs, techs]);

    const statCards = [
        { ...statusPalette.open, value: stats.open, icon: statusPalette.open.icon },
        { ...statusPalette.in_progress, value: stats.inProgress, icon: statusPalette.in_progress.icon },
        { ...statusPalette.resolved, value: stats.resolved, icon: statusPalette.resolved.icon },
        { ...attentionPalette, value: stats.attention, icon: attentionPalette.icon }
    ];

    return (
        <Grid container columnSpacing={2} rowSpacing={2} alignItems='stretch' sx={{ width: '100%' }}>
            {statCards.map(card => (
                <Grid item xs={12} sm={6} md={3} key={card.key}>
                    <StatCard
                        icon={card.icon}
                        label={card.label}
                        value={card.value}
                        color={card.color}
                        chipSx={card.chipSx}
                        variant={card.variant || 'filled'}
                    />
                </Grid>
            ))}

            <Grid item xs={12}>
                <Card sx={{ width: '100%', minHeight: 124 }}>
                    <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2.5 } }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                            justifyContent='space-between'
                        >
                            <Typography variant='h6' sx={{ fontWeight: 700 }}>
                                Quick actions
                            </Typography>
                            <Box
                                display='flex'
                                gap={1.25}
                                flexWrap='wrap'
                                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                            >
                                <Button variant='contained' startIcon={<AddIcon />} onClick={() => setOpenLog(true)}>
                                    New Log
                                </Button>
                                <Button
                                    variant='outlined'
                                    startIcon={<PeopleIcon />}
                                    onClick={() => setOpenList(true)}
                                >
                                    Manage Techs
                                </Button>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenTech(true)}
                                    sx={{ boxShadow: 0 }}
                                >
                                    Add Tech
                                </Button>
                            </Box>
                        </Stack>
                        <Divider sx={{ mt: 2 }} />
                    </CardContent>
                </Card>
            </Grid>

            <Form open={openLog} onClose={() => setOpenLog(false)} />
            <AddTech open={openTech} onClose={() => setOpenTech(false)} />
            <Techlist open={openList} onClose={() => setOpenList(false)} />
        </Grid>
    );
};

export default Actions;
