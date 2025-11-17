import React, { useContext, useMemo } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Stack,
    TextField,
    InputAdornment,
    FormControl,
    MenuItem,
    Select,
    Button,
    IconButton,
    Tooltip,
    Divider,
    FormHelperText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogContext from '../ContextAPI/LogsAPI/LogContext';

const Search = ({ mode, onToggleMode }) => {
    const { searchLogs, updateFilters, resetFilters, filters, techs, logs } = useContext(LogContext);

    const categories = useMemo(() => {
        const unique = new Set();
        logs.forEach(log => {
            if (log.category) unique.add(log.category);
        });
        return ['all', ...Array.from(unique)];
    }, [logs]);

    const handleFilterChange = (field, value) => {
        if (field === 'query') {
            searchLogs(value);
        } else {
            updateFilters({ [field]: value });
        }
    };

    return (
        <Box sx={{ mb: 3, boxShadow: 3 }}>
            <AppBar position='static' color='primary' enableColorOnDark>
                <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant='h6' sx={{ flexGrow: 1, fontWeight: 700 }}>
                        OpsDesk
                    </Typography>
                    <Tooltip title='Toggle light/dark mode'>
                        <IconButton color='inherit' onClick={onToggleMode}>
                            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    px: { xs: 2, md: 3 },
                    py: 2.5,
                    borderBottom: theme => `1px solid ${theme.palette.divider}`
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            lg: '2fr repeat(4, 1fr) auto'
                        },
                        columnGap: 2,
                        rowGap: 2,
                        alignItems: 'end'
                    }}
                >
                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Search
                        </Typography>
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder='Message, technician, or ID'
                            value={filters.query}
                            onChange={e => handleFilterChange('query', e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            helperText={
                                <Box component='span' sx={{ display: 'block', minHeight: 20, mt: 0.5 }}>
                                    Free text search across message, tech, and ticket ID
                                </Box>
                            }
                        />
                    </Stack>

                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Status
                        </Typography>
                        <FormControl
                            fullWidth
                            sx={{
                                height: '100%',
                                '& .MuiInputBase-root': { minHeight: 56 }
                            }}
                        >
                            <Select
                                value={filters.status}
                                onChange={e => handleFilterChange('status', e.target.value)}
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <FilterAltIcon fontSize='small' />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value='all'>All status</MenuItem>
                                <MenuItem value='open'>Open</MenuItem>
                                <MenuItem value='in_progress'>In progress</MenuItem>
                                <MenuItem value='resolved'>Resolved</MenuItem>
                            </Select>
                            <FormHelperText sx={{ minHeight: 20, mt: 0.5 }}>
                                Filter by ticket status
                            </FormHelperText>
                        </FormControl>
                    </Stack>

                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Attention
                        </Typography>
                        <FormControl
                            fullWidth
                            sx={{
                                height: '100%',
                                '& .MuiInputBase-root': { minHeight: 56 }
                            }}
                        >
                            <Select
                                value={filters.attention}
                                onChange={e => handleFilterChange('attention', e.target.value)}
                            >
                                <MenuItem value='all'>Any attention</MenuItem>
                                <MenuItem value='true'>Needs attention</MenuItem>
                                <MenuItem value='false'>Normal</MenuItem>
                            </Select>
                            <FormHelperText sx={{ minHeight: 20, mt: 0.5 }}>
                                Highlight incident priority
                            </FormHelperText>
                        </FormControl>
                    </Stack>

                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Technician
                        </Typography>
                        <FormControl
                            fullWidth
                            sx={{
                                height: '100%',
                                '& .MuiInputBase-root': { minHeight: 56 }
                            }}
                        >
                            <Select
                                value={filters.tech}
                                onChange={e => handleFilterChange('tech', e.target.value)}
                            >
                                <MenuItem value='all'>All techs</MenuItem>
                                {techs.map(tech => (
                                    <MenuItem key={tech._id} value={tech.firstName + ' ' + tech.lastName}>
                                        {tech.firstName} {tech.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText sx={{ minHeight: 20, mt: 0.5 }}>
                                Show tickets owned by a specific tech
                            </FormHelperText>
                        </FormControl>
                    </Stack>

                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Category
                        </Typography>
                        <FormControl
                            fullWidth
                            sx={{
                                height: '100%',
                                '& .MuiInputBase-root': { minHeight: 56 }
                            }}
                        >
                            <Select
                                value={filters.category}
                                onChange={e => handleFilterChange('category', e.target.value)}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat === 'all' ? 'All categories' : cat}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText sx={{ minHeight: 20, mt: 0.5 }}>
                                Network, hardware, access, etc.
                            </FormHelperText>
                        </FormControl>
                    </Stack>

                    <Stack spacing={1} sx={{ height: '100%' }}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Reset
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', lg: 'flex-end' }
                            }}
                        >
                            <Tooltip title='Reset all filters'>
                                <Button
                                    variant='outlined'
                                    startIcon={<RefreshIcon />}
                                    onClick={resetFilters}
                                    color='primary'
                                    sx={{ minHeight: 56, width: { xs: 'auto', lg: '100%' } }}
                                >
                                    Reset
                                </Button>
                            </Tooltip>
                        </Box>
                        <Typography variant='caption' color='text.disabled' sx={{ minHeight: 20, mt: 0.5 }}>
                            Clear all filters
                        </Typography>
                    </Stack>
                </Box>
                <Divider sx={{ mt: 2 }} />
            </Box>
        </Box>
    );
};

export default Search;
