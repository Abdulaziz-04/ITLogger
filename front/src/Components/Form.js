import React, { useState, useContext, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Stack,
    Snackbar,
    Alert,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { format } from 'date-fns';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Form = ({ open, onClose }) => {
    const { addLogs, getTechs, techs, clearAll } = useContext(LogContext);
    const [toast, setToast] = useState('');
    const now = () => format(new Date(), "yyyy-MM-dd'T'HH:mm");
    const [data, setData] = useState({
        message: '',
        attention: false,
        tech: '',
        status: 'open',
        dt: now()
    });

    useEffect(() => {
        getTechs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (data.message.trim() === '' || data.tech.trim() === '') {
            setToast('Please enter a message and select a technician.');
            return;
        }
        await addLogs({ ...data, dt: new Date(data.dt) });
        setToast('Message logged!');
        setData({
            message: '',
            attention: false,
            tech: '',
            status: 'open',
            dt: now()
        });
        clearAll();
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
                <DialogTitle>Enter system log</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label='Log message'
                            name='message'
                            value={data.message}
                            onChange={onChange}
                            fullWidth
                            autoFocus
                        />
                        <FormControl fullWidth>
                            <InputLabel id='tech-label'>Technician</InputLabel>
                            <Select
                                labelId='tech-label'
                                label='Technician'
                                name='tech'
                                value={data.tech}
                                onChange={onChange}
                            >
                                <MenuItem value=''>Select technician</MenuItem>
                                {techs.map(tech => (
                                    <MenuItem key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>
                                        {tech.firstName} {tech.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id='status-label'>Status</InputLabel>
                                <Select
                                    labelId='status-label'
                                    label='Status'
                                    name='status'
                                    value={data.status}
                                    onChange={onChange}
                                >
                                    <MenuItem value='open'>Open</MenuItem>
                                    <MenuItem value='in_progress'>In progress</MenuItem>
                                    <MenuItem value='resolved'>Resolved</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label='Date / time'
                                type='datetime-local'
                                name='dt'
                                value={data.dt}
                                onChange={onChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Stack>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.attention}
                                    onChange={e => setData({ ...data, attention: e.target.checked })}
                                    name='attention'
                                />
                            }
                            label='Attention required'
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit} variant='contained'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={Boolean(toast)}
                autoHideDuration={2500}
                onClose={() => setToast('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity='success' onClose={() => setToast('')} variant='filled'>
                    {toast}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Form;
