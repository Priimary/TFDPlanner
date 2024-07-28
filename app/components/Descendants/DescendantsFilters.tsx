"use client";
import React, { useState } from 'react';
import { Box, IconButton, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getTierColor } from '../../utils/globalVariables';
import Image from 'next/image';

interface DescendantsFiltersProps {
    onFilterChange: (filters: any) => void;
}

const elements = ['fire', 'none', 'toxic', 'chill', 'electric'];
const rarities = ['all', 'standard', 'ultimate'];

const DescendantsFilters: React.FC<DescendantsFiltersProps> = ({ onFilterChange }) => {
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const [selectedRarity, setSelectedRarity] = useState<string>('all');

    const handleElementClick = (element: string) => {
        const newElement = selectedElement === element ? null : element;
        setSelectedElement(newElement);
        onFilterChange({ element: newElement, rarity: selectedRarity });
    };

    const handleRarityChange = (event: SelectChangeEvent<string>) => {
        const newRarity = event.target.value as string;
        setSelectedRarity(newRarity);
        onFilterChange({ element: selectedElement, rarity: newRarity });
    };

    return (
        <Box display='flex' alignItems='center' gap="25px">
            <Box display="flex" flexWrap="wrap">
                {elements.map((element) => (
                    <IconButton
                        key={element}
                        onClick={() => handleElementClick(element)}
                        style={{
                            margin: 8,
                            width: 32,
                            height: 32,
                            padding: 0,
                            borderRadius: '30%',
                            backgroundColor: selectedElement === element ? '#e0f7fa' : 'transparent',
                            border: "1px solid #42a5f5",
                        }}
                    >
                        <Image
                            src={`/images/elements/${element}.png`}
                            alt={element}
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
                        value={selectedRarity}
                        onChange={handleRarityChange}
                        label="Rarity"
						sx={{
                            height: 40,
                            color: getTierColor(selectedRarity),
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
                        {rarities.map((rarity) => (
                            <MenuItem key={rarity} value={rarity} sx={{color: getTierColor(rarity)}}>
                                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default DescendantsFilters;