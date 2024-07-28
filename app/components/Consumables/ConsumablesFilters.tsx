"use client";
import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTierColor, filterTiers, consumablesTypes } from '../../utils/globalVariables';

interface ConsumablesFiltersProps {
    onFilterChange: (filters: any) => void;
}

const ConsumablesFilters: React.FC<ConsumablesFiltersProps> = ({ onFilterChange }) => {
    const [selectedTier, setSelectedTier] = useState<string>('All');
	const [selectedType, setSelectedType] = useState<string>('Core Materials');

    const handleTierChange = (event: SelectChangeEvent<string>) => {
        const newTier = event.target.value as string;
        setSelectedTier(newTier);
        onFilterChange({
			consumables_tier: newTier,
			consumables_type: selectedType
		});
    };

	const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const newType = event.target.value as string;
        setSelectedType(newType);
        onFilterChange({ 
			consumables_tier: selectedTier,
			consumables_type: newType 
		});
    };

    return (
        <Box display='flex' alignItems='center' gap="25px">
            <Box>
                <FormControl variant="outlined">
                    <InputLabel sx={{color: 'primary.dark'}}>Rarity</InputLabel>
                    <Select
                        value={selectedTier}
                        onChange={handleTierChange}
                        label="Rarity"
						sx={{
                            height: 40,
                            color: getTierColor(selectedTier),
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.dark',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.dark',
                            },
                            '.MuiSvgIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        {filterTiers.map((tier) => (
                            <MenuItem key={tier} value={tier} sx={{color: getTierColor(tier)}}>
                                {tier}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
			<Box>
				<FormControl fullWidth>
					<InputLabel sx={{color: 'primary.dark'}}>Type</InputLabel>
					<Select
						value={selectedType}
						onChange={handleTypeChange}
						label="Type"
						sx={{
                            height: 40,
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.dark',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.dark',
                            },
                            '.MuiSvgIcon-root': {
                                color: 'white',
                            },
                        }}
					>
						{consumablesTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
        </Box>
    );
};

export default ConsumablesFilters;