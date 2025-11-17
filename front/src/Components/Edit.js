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
    Select,
    MenuItem,
    Stack,
    InputLabel,
    FormControl
} from '@mui/material';
import { format } from 'date-fns';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Edit = () => {
    const { techs, current, updateLogs, setCurrent } = useContext(LogContext);
    const [data, setData] = useState({
        message: '',
        attention: false,
        tech: '',
        status: 'open',
        dt: ''
    });

    useEffect(() => {
        if (current !== null) {
            const parsedDate = current.dt ? format(new Date(current.dt), "yyyy-MM-dd'T'HH:mm") : '';
            setData({ ...current, dt: parsedDate });
        }
    }, [current]);

    const handleClose = () => setCurrent(null);

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (data.message.trim() === '' || data.tech.trim() === '') {
            return;
        }
        await updateLogs({ ...data, dt: data.dt ? new Date(data.dt) : data.dt });
        handleClose();
    };

    return (
        <Dialog open={Boolean(current)} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit system log</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label='Log message'
                        name='message'
                        value={data.message}
                        onChange={onChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id='edit-tech-label'>Technician</InputLabel>
                        <Select
                            labelId='edit-tech-label'
                            name='tech'
                            label='Technician'
                            value={data.tech}
                            onChange={onChange}
                        >
                            <MenuItem value=''>Select technician</MenuItem>
                            {techs.map(t => (
                                <MenuItem key={t._id} value={`${t.firstName} ${t.lastName}`}>
                                    {t.firstName} {t.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id='edit-status-label'>Status</InputLabel>
                            <Select
                                labelId='edit-status-label'
                                name='status'
                                label='Status'
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit} variant='contained'>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Edit;
