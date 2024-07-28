import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Collapse,
    IconButton,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Amorphous, VoidMaterial, VoidMission } from '../interfaces/interfaces';
import { weaponParts, descendantParts, getMaterialsPerAmorphous } from '../utils/globalVariables';
import amorphousData from '../../data/amorphous.json';
import voidMissionsData from '../../data/void_missions.json';
import AmorphousDialog from './Amorphous/AmorphousDialog';
import AmorphousCard from './Amorphous/AmorphousCard';
import Image from 'next/image';

interface ExpandMoreProps {
    expand?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: React.ReactNode;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    color: theme.palette.primary.dark,
}));


const PartObtentionCard: React.FC<{ name: string, type: string}> = ({ name, type }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedPart, setSelectedPart] = useState<string>('');
    const [amorphousDataFiltered, setAmorphousDataFiltered] = useState<Amorphous[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogDropLocation, setDialogDropLocation] = useState<string | undefined>(undefined);
    const [dialogOpenLocation, setDialogOpenLocation] = useState<string | undefined>(undefined);
    const [dialogMaterials, setDialogMaterials] = useState<VoidMaterial[][]>([]);
    const [voidMissions, setVoidMissions] = useState<VoidMission[]>([]);

    useEffect(() => {
        setVoidMissions(voidMissionsData as VoidMission[]);
    }, []);

    useEffect(() => {
		let partOptions;
		if(type === 'descendant'){
			partOptions = descendantParts.map(part => `${name} ${part}`)
		}
		else{
			partOptions = weaponParts.map(part => `${name} ${part}`);
		}
        if (partOptions.length > 0 && !selectedPart) {
            setSelectedPart(partOptions[0]);
        }
    }, [name, weaponParts, descendantParts]);

    useEffect(() => {
        if (selectedPart) {
            // Filter amorphousData for selected part
            const filteredAmorphousData = amorphousData.filter((amorphous: Amorphous) =>
                amorphous.rewards.some(reward =>
                    reward.name.toLowerCase() === selectedPart.toLowerCase()
                )
            );

            // Sort based on drop_rate
            const sortedAmorphousData = filteredAmorphousData.sort((a, b) => {
                const getMaxDropRate = (amorphous: Amorphous) => {
                    return Math.max(...amorphous.rewards
                        .filter(reward => reward.name.toLowerCase() === selectedPart.toLowerCase())
                        .map(reward => reward.drop_rate)
                    );
                };

                return getMaxDropRate(b) - getMaxDropRate(a);
            });

            setAmorphousDataFiltered(sortedAmorphousData);
        }
    }, [selectedPart]);

    useEffect(() => {
        if(amorphousDataFiltered.length > 0){
			const materialsPerAmorphous = getMaterialsPerAmorphous(amorphousDataFiltered, voidMissions);
            setDialogMaterials(materialsPerAmorphous);
        }}, [amorphousDataFiltered, voidMissions, dialogOpenLocation]);

    const handleExpandClick = () => {
        setIsOpen(!isOpen);
    };

    const handlePartChange = (event: SelectChangeEvent<string>) => {
        setSelectedPart(event.target.value);
    };

    const handleDialogOpen = (drop_location?: string, open_location?: string) => {
        setDialogDropLocation(drop_location);
        setDialogOpenLocation(open_location);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogDropLocation(undefined);
        setDialogOpenLocation(undefined);
    };

	let partOptions;
	if(type === 'descendant'){
		partOptions = descendantParts.map(part => `${name} ${part}`);
	}
	else{
		partOptions = weaponParts.map(part => `${name} ${part}`);
	}

    return (
        <>
            <Card sx={{width: '100%'}}>
                <CardHeader
                    title={
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'primary.dark' }}>Weapon Part</InputLabel>
                            <Select
                                value={selectedPart}
                                onChange={handlePartChange}
                                inputProps={{ 'aria-label': 'Weapon Part' }}
                                label="Weapon Part"
                                renderValue={(value) => (
                                    <Typography variant="h6">
                                        {value}
                                    </Typography>
                                )}
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
                                        color: 'primary.dark',
                                    },
                                }}
                            >
                                {partOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                    avatar={
                        selectedPart && (
                            <Image
                                src={`/images/core_material/${selectedPart.replace(/ /g, '_').replace(/'/g, '_').toLowerCase()}.png`}
                                alt={selectedPart}
								width={60}
								height={60}
								quality={100}
                            />
                        )
                    }
                    action={
                        <ExpandMore
                            expand={isOpen}
                            onClick={handleExpandClick}
                            aria-expanded={isOpen}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                    sx={{
                        '& .MuiCardHeader-action': {
                            alignSelf: 'center'
                        }
                    }}
                />
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
                        {amorphousDataFiltered.map((amorphous, index) => (
                            <AmorphousCard
                                key={index}
                                amorphous={amorphous}
                                selectedPart={selectedPart}
                                onDialogOpen={handleDialogOpen}
                                materials={dialogMaterials[index] || []}
                            />
                        ))}
                    </CardContent>
                </Collapse>
            </Card>
            <AmorphousDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                drop_location={dialogDropLocation}
                open_location={dialogOpenLocation}
                selectedPart={selectedPart}
            />
        </>
    );
};

export default PartObtentionCard;