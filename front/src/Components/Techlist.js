import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Typography,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Techlist = ({ open, onClose }) => {
    const { techs, deleteTechs } = useContext(LogContext);
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Technician roster</DialogTitle>
            <DialogContent dividers>
                {techs.length === 0 ? (
                    <Typography variant='body1' color='text.secondary'>
                        Please add technicians to get started.
                    </Typography>
                ) : (
                    <List>
                        {techs.map(tech => (
                            <React.Fragment key={tech._id}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge='end' onClick={() => deleteTechs(tech)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${tech.firstName} ${tech.lastName}`}
                                        secondary='On-call'
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Techlist;
