import React, { useState } from 'react';
import { Button, Menu, MenuList, ListSubheader, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomHeaderGroup: React.FC = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectPreset, setSelectPreset] = useState<string>('');

    const presets = [
        { name: 'chill', options: ['Monomer', 'Polymer', 'Organic', 'Inorganic'] },
        { name: 'fire', options: ['Monomer', 'Polymer', 'Organic', 'Inorganic'] },
        { name: 'toxic', options: ['Monomer', 'Polymer', 'Organic', 'Inorganic'] },
        { name: 'electric', options: ['Monomer', 'Polymer', 'Organic', 'Inorganic'] },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const applyPreset = (preset: string) => {
        const [name, option] = preset.split(' ');
        const api = props.api();

        if (name && option) {
            api.setFilterModel({
                type: { filterType: 'text', type: 'equals', filter: 'Fragment' },
                element: { filterType: 'text', type: 'equals', filter: name }
            });
            api.applyColumnState({
                state: [{ colId: option.toLowerCase(), sort: 'desc' }],
                defaultState: { sort: null },
            });
        }
    };

    const handlePresetChange = (preset: string) => {
        setSelectPreset(preset);
        applyPreset(preset);
        handleClose();
    };

    return (
        <div className="custom-header-group" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button variant="outlined" color="warning" onClick={handleClick} style={{ paddingRight: '5px', fontWeight: 'bold', }}>
                {selectPreset ? selectPreset : 'filter Presets'}
                <ArrowDropDownIcon />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#182230',
                        color: 'white',
                        border: '1px solid grey'
                    },
                }}
            >
                <MenuList style={{ display: 'flex', minWidth: '200px', justifyContent: 'center' }}>
                    {presets.map((preset, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ListSubheader style={{display: 'flex', alignItems: 'center', backgroundColor: "#182230" }}>
                                <img
                                    src={`/images/elements/${preset.name}.png`}
                                    alt={preset.name}
                                    style={{ width: '30px', height: '30px'}}
                                />
                            </ListSubheader>
                            {preset.options.map((option, idx) => (
                                <MenuItem key={idx} onClick={() => handlePresetChange(preset.name + ' ' + option)} style={{ lineHeight: '15px', fontSize: '16px' }}>
                                    {option}
                                </MenuItem>
                            ))}
                        </div>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
};

export default CustomHeaderGroup;