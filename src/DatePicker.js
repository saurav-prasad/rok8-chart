import * as React from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const shortcutsItems = [
    {
        label: 'This Week',
        getValue: () => {
            const today = dayjs();
            return [today.startOf('week'), today.endOf('week')];
        },
    },
    {
        label: 'Last Week',
        getValue: () => {
            const today = dayjs();
            const prevWeek = today.subtract(7, 'day');
            return [prevWeek.startOf('week'), prevWeek.endOf('week')];
        },
    },
    {
        label: 'Last 7 Days',
        getValue: () => {
            const today = dayjs();
            return [today.subtract(7, 'day'), today];
        },
    },
    {
        label: 'Current Month',
        getValue: () => {
            const today = dayjs();
            return [today.startOf('month'), today.endOf('month')];
        },
    },
    {
        label: 'Next Month',
        getValue: () => {
            const today = dayjs();
            const startOfNextMonth = today.endOf('month').add(1, 'day');
            return [startOfNextMonth, startOfNextMonth.endOf('month')];
        },
    },
    { label: 'Reset', getValue: () => [null, null] },
];

export default function DatePickers({ getEndDate, getStartDate, onGenderChange,onAgeChange }) {
    const [gender, setGender] = useState("None");
    const [age, setAge] = useState("None");
    const [searchParams, setSearchParams] = useSearchParams()


    const handelSerachParams = (newParams) => {
        // console.log(newParams)
        setSearchParams({ ...Object.fromEntries(searchParams), ...newParams })
    }

    const handleGenderChange = (event) => {
        const gender = event.target.value
        if (gender !== "None") {
            setGender(gender)
            onGenderChange(gender)
        } else {
            setGender("None")
            onGenderChange()
        }
        handelSerachParams({ gender })
        // console.log(searchParams.get("gender"))
    };

    // age filter
    const handleAgeChange = (event) => {
        const age = event.target.value
        if (age !== "None") {
            setAge(age)
            onAgeChange(age)
        } else {
            setAge("None")
            onAgeChange()
        }
        handelSerachParams({ age })
        // console.log(searchParams.get("gender"))
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleShortcutClick = (getValue) => {
        const [start, end] = getValue();
        const startTime = new Date(start).getTime()
        const endTime = new Date(end).getTime()
        getStartDate(startTime)
        getEndDate(endTime)
        setStartDate(start);
        setEndDate(end);
        handelSerachParams({ endDate: endTime, startDate: startTime })
    };

    const onStartDate = (newValue) => {
        setStartDate(newValue)
        const startTime = new Date(newValue).getTime()
        console.log(startTime)
        handelSerachParams({ startDate: startTime })
        getStartDate(startTime)
    }

    const onEndDate = (newValue) => {
        setEndDate(newValue)
        const endTime = new Date(newValue).getTime()
        console.log(endTime)
        handelSerachParams({ endDate: endTime })
        getEndDate(endTime)
    }
    const onResetAll = () => {
        getEndDate()
        getStartDate()
        onGenderChange()
        setStartDate()
        setEndDate()
        setGender("None")
        setAge("None")
        setSearchParams()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 1,
                    maxWidth: 500,
                    margin: '0 auto',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Date Pickers */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={onStartDate}
                        renderInput={(params) => (
                            <TextField {...params} sx={{ flex: 1 }} />
                        )}
                    />
                    <Typography variant="body1">to</Typography>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={onEndDate}
                        renderInput={(params) => (
                            <TextField {...params} sx={{ flex: 1 }} />
                        )}
                    />
                </Box>

                {/* Shortcut Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center',
                    }}
                >
                    {shortcutsItems.map((shortcut) => (
                        <Button
                            key={shortcut.label}
                            variant="outlined"
                            size="small"
                            onClick={() => handleShortcutClick(shortcut.getValue)}
                            sx={{ flex: '1 1 auto', minWidth: '120px' }}
                        >
                            {shortcut.label}
                        </Button>
                    ))}
                </Box>

                {/* Selected Date Range */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderTop: '1px solid #ddd',
                    }}
                >
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        Selected Range:
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    {startDate && endDate ? (
                        <Typography variant="body1">
                            From: {startDate.format('YYYY-MM-DD')} To: {endDate.format('YYYY-MM-DD')}
                        </Typography>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No range selected
                        </Typography>
                    )}
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            value={gender}
                            onChange={handleGenderChange}
                            defaultValue={"None"}
                        >
                            <MenuItem value={"None"}>None</MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            value={age}
                            onChange={handleAgeChange}
                            defaultValue={"None"}
                        >
                            <MenuItem value={"None"}>None</MenuItem>
                            <MenuItem value={"15-25"}>15-25</MenuItem>
                            <MenuItem value={">25"}>&gt;25</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onResetAll}
                    sx={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                    Reset All
                </Button>
            </Box>
        </LocalizationProvider>
    );
}
