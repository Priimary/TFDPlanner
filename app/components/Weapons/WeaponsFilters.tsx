"use client";
import React, { useState } from 'react';
import { Box, IconButton, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTierColor, filterTiers, weaponTypes, weaponsRoundsTypes} from '../../utils/globalVariables';
import Image from 'next/image';

interface WeaponsFiltersProps {
    onFilterChange: (filters: any) => void;
}

const WeaponsFilters: React.FC<WeaponsFiltersProps> = ({ onFilterChange }) => {
    const [selectedWeaponsRoundsType, setSelectedWeaponsRoundsType] = useState<string | null>(null);
    const [selectedWeaponsTier, setSelectedWeaponsTier] = useState<string>('All');
	const [selectedWeaponsType, setSelectedWeaponsType] = useState<string>('All');

    const handleWeaponsRoundsTypeClick = (weapons_rounds_type: string) => {
        const newWeaponsRoundsType = selectedWeaponsRoundsType === weapons_rounds_type ? null : weapons_rounds_type;
        setSelectedWeaponsRoundsType(newWeaponsRoundsType);
        onFilterChange({ 
			weapons_rounds_type: newWeaponsRoundsType, 
			weapons_tier: selectedWeaponsTier,
			weapons_type: selectedWeaponsType 
		});
    };

    const handleWeaponsTierChange = (event: SelectChangeEvent<string>) => {
        const newWeaponsTier = event.target.value as string;
        setSelectedWeaponsTier(newWeaponsTier);
        onFilterChange({ 
			weapons_rounds_type: selectedWeaponsRoundsType, 
			weapons_tier: newWeaponsTier,
			weapons_type: selectedWeaponsType 
		});
    };

	const handleTypeChange = (event: SelectChangeEvent<string>) => {
        const newWeaponsType = event.target.value as string;
        setSelectedWeaponsType(newWeaponsType);
        onFilterChange({ 
			weapons_rounds_type: selectedWeaponsRoundsType, 
			weapons_tier: selectedWeaponsTier,
			weapons_type: newWeaponsType 
		});
    };

    return (
        <Box display='flex' alignItems='center' gap="25px">
            <Box display="flex" flexWrap="wrap">
                {weaponsRoundsTypes.map((weapons_rounds_type) => (
                    <IconButton
                        key={weapons_rounds_type}
                        onClick={() => handleWeaponsRoundsTypeClick(weapons_rounds_type)}
                        style={{
                            margin: 8,
                            width: 32,
                            height: 32,
                            padding: 0,
                            borderRadius: '30%',
                            backgroundColor: selectedWeaponsRoundsType === weapons_rounds_type ? '#e0f7fa' : 'transparent',
                            border: "1px solid #42a5f5",
                        }}
                    >
                        <Image
                            src={`/images/rounds_types/${weapons_rounds_type.replace(' ', '_')}.png`}
                            alt={weapons_rounds_type}
							width={26}
							height={26}
							quality={100}
                        />
                    </IconButton>
                ))}
            </Box>
            <Box>
                <FormControl variant="outlined">
                    <InputLabel sx={{color: 'primary.dark'}}>Rarity</InputLabel>
                    <Select
                        value={selectedWeaponsTier}
                        onChange={handleWeaponsTierChange}
                        label="Rarity"
						sx={{
                            height: 40,
                            color: getTierColor(selectedWeaponsTier),
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
						value={selectedWeaponsType}
						onChange={handleTypeChange}
						label="Weapon Type"
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
						{weaponTypes.map((type) => (
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

export default WeaponsFilters;