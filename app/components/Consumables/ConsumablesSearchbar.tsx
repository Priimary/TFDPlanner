"use client";
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ConsumablesSearchbarProps {
    onSearch: (searchTerm: string) => void;
}

const ConsumablesSearchbar: React.FC<ConsumablesSearchbarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onBlur={handleSearchSubmit}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{
                width: '100%',
                height: '40px',
                '& .MuiInputAdornment-root': {
                    '& .MuiSvgIcon-root': {
                        color: 'primary.dark',
                    },
                },
                '&:hover .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: 'primary.main',
                },
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                    color: 'white',
                    '& fieldset': {
                        borderColor: 'primary.dark',
                    },
                    '&:hover fieldset': {
                        borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                    },
                },
                '&:focus-within .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: 'primary.main',
                },
            }}
        />
    );
};

export default ConsumablesSearchbar;