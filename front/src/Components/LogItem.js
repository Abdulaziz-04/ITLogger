import React, { useContext } from 'react';
import { Card, CardContent, CardActions, Typography, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format } from 'date-fns';
import LogContext from '../ContextAPI/LogsAPI/LogContext';
import { attentionPalette, statusPalette } from './statusTheme';

const LogItem = ({ log }) => {
    const { setCurrent, deleteLogs, updateLogs } = useContext(LogContext);
    const handleResolve = () => {
        if (log.status === 'resolved') return;
        updateLogs({ ...log, status: 'resolved' });
    };
    const formattedDate = log.dt ? format(new Date(log.dt), 'PPpp') : 'Not set';
    const status = log.status || 'open';
    const meta = statusPalette[status] || statusPalette.open;
    const StatusIcon = meta.icon;
    const AttentionIcon = attentionPalette.icon;

    return (
        <Card variant='outlined' sx={{ height: '100%', minHeight: 220 }}>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap'>
                        <Chip
                            icon={StatusIcon ? <StatusIcon fontSize='small' /> : undefined}
                            label={meta.label}
                            color={meta.color}
                            size='small'
                            variant={meta.variant || 'filled'}
                            sx={meta.chipSx}
                        />
                        {log.attention && (
                            <Chip
                                icon={AttentionIcon ? <AttentionIcon fontSize='small' /> : undefined}
                                label={attentionPalette.label}
                                color={attentionPalette.color}
                                size='small'
                                variant='filled'
                            />
                        )}
                    </Stack>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>
                        {log.message}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Updated by <strong>{log.tech || 'Unknown'}</strong> on {formattedDate}
                    </Typography>
                    <Typography variant='caption' color='text.disabled'>
                        ID #{log._id} {log.category ? `| ${log.category}` : ''}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title='Mark resolved'>
                    <span>
                        <IconButton onClick={handleResolve} disabled={log.status === 'resolved'} color='success'>
                            <DoneAllIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='Edit log'>
                    <IconButton color='primary' onClick={() => setCurrent(log)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete log'>
                    <IconButton color='error' onClick={() => deleteLogs(log)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default LogItem;
