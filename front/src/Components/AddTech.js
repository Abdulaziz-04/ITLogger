import React, { useState, useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert
} from '@mui/material';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const AddTech = ({ open, onClose }) => {
    const { addTechs, clearAll } = useContext(LogContext);
    const [techdata, setTechdata] = useState({
        firstName: '',
        lastName: ''
    });
    const [toast, setToast] = useState('');

    const onChange = e => {
        setTechdata({ ...techdata, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        if (techdata.firstName.trim() === '' || techdata.lastName.trim() === '') {
            setToast('Please enter the required fields.');
            return;
        }
        await addTechs(techdata);
        setTechdata({
            firstName: '',
            lastName: ''
        });
        setToast('Technician added!');
        clearAll();
        onClose();
    };
    const { firstName, lastName } = techdata;
    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
                <DialogTitle>Add Technician</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label='First Name'
                            value={firstName}
                            name='firstName'
                            onChange={onChange}
                            fullWidth
                        />
                        <TextField
                            label='Last Name'
                            value={lastName}
                            name='lastName'
                            onChange={onChange}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit} variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={Boolean(toast)}
                autoHideDuration={2000}
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

export default AddTech;
