"use client";
import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import weaponsData from '../../data/weapons.json';
import descendantsData from '../../data/descendants.json';
import consumablesData from '../../data/consumables.json';
import { Weapon, Descendant, Consumable } from '../interfaces/interfaces';

interface SearchResult {
    category: string;
    item: any;
}

const HeaderSearchbar: React.FC = () => {
    const weapons: Weapon[] = weaponsData;
    const descendants: Descendant[] = descendantsData as Descendant[];
    const consumables: Consumable[] = consumablesData;

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [groupedResults, setGroupedResults] = useState<{ [key: string]: SearchResult[] }>({});
    const [showDropdown, setShowDropdown] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if(debouncedSearchTerm.trim() === ''){
            setGroupedResults({});
            setShowDropdown(false);
            return;
        }
        if(debouncedSearchTerm.trim().length > 2){
            applySearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if(value.trim() === '' || value.trim().length < 3){
            setShowDropdown(false);
        } 
		else{
            setShowDropdown(true);
        }
    };

    const handleSearchFocus = () => {
        if(searchTerm.trim().length > 2){
            setShowDropdown(true);
        }
    };

    const applySearch = (searchTerm: string) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results: { [key: string]: SearchResult[] } = {};

        const searchInCategory = (data: any[], category: string) => {
            const categoryResults = data.filter(item => {
                const itemValues = Object.values(item);
                return itemValues.some(val =>
                    val && val.toString().toLowerCase().includes(lowerCaseSearchTerm)
                );
            }).map(item => ({ category, item }));

            if(categoryResults.length > 0){
                results[category] = categoryResults;
            }
        };

        searchInCategory(weapons, 'Weapons');
        searchInCategory(descendants, 'Descendants');
        searchInCategory(consumables, 'Consumables');

        setGroupedResults(results);
        if(Object.keys(results).length > 0){
            setShowDropdown(true);
        }
    };

    const getItemName = (item: any, category: string) => {
        switch (category) {
            case 'Weapons':
                return item.weapon_name || 'No Name';
            case 'Descendants':
                return item.descendant_name || 'No Name';
            case 'Consumables':
                return item.name || 'No Name';
            default:
                return 'No Name';
        }
    };

    const getItemUrl = (item: any, category: string) => {
        switch (category) {
            case 'Weapons':
                return `/weapons/${item.weapon_id}`;
            case 'Descendants':
                return `/descendants/${item.descendant_id}`;
            case 'Consumables':
                return `/consumables/${item.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/, '')}`;
            default:
                return '#';
        }
    };

    const handleClickItem = (item: any, category: string) => {
        const url = getItemUrl(item, category);
        setShowDropdown(false);
        router.push(url);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if(
            searchRef.current &&
            !searchRef.current.contains(event.target as Node) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ){
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <TextField
                inputRef={searchRef}
                id="search-input"
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
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
                        color: '#f57c00',
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
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        backgroundColor: '#101219',
                        zIndex: 10,
                    }}
                >
                    <List>
                        {Object.keys(groupedResults).map((category, index) => (
                            <div key={category}>
                                <ListItem 
									disabled 
									sx={{
										textTransform: 'uppercase',
										oppacity: 1,
										padding: '0 10px',
										"&.Mui-disabled":{
											opacity: 0.8,
											color: 'tertiary.dark'
										}
									}}
								>
                                    <ListItemText primary={category} />
                                </ListItem>
								{index < Object.keys(groupedResults).length  && <Divider sx={{borderColor: '#f57c00', opacity: 0.2}} />}
                                {groupedResults[category].map((result, resultIndex) => (
                                    <div key={resultIndex}>
                                        <ListItem button onClick={() => handleClickItem(result.item, result.category)} sx={{padding: '5px 20px'}}>
                                            <ListItemText sx={{color: 'tertiary.main'}} primary={`${getItemName(result.item, result.category)}`}/>
                                        </ListItem>
                                        
                                    </div>
                                ))}
                               
                            </div>
                        ))}
                        {Object.keys(groupedResults).length === 0 && (
                            <ListItem disabled sx={{color: 'tertiary.main'}}>No results found</ListItem>
                        )}
                    </List>
                </div>
            )}
        </div>
    );
};

export default HeaderSearchbar;