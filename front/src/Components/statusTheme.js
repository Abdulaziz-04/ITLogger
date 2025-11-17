import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const statusPalette = {
    open: {
        key: 'open',
        label: 'Open',
        color: 'primary',
        icon: ScheduleIcon,
        variant: 'outlined',
        chipSx: theme => ({
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider
        })
    },
    in_progress: {
        key: 'in_progress',
        label: 'In Progress',
        color: 'info',
        icon: ScheduleIcon
    },
    resolved: {
        key: 'resolved',
        label: 'Resolved',
        color: 'success',
        icon: CheckCircleIcon
    }
};

export const attentionPalette = {
    key: 'attention',
    label: 'Needs Attention',
    color: 'warning',
    icon: WarningAmberIcon
};
