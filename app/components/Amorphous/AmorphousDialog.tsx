"use client";
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VoidMissionsGrid from '../VoidMissions/VoidMissionsGrid';
import StylizedCollapse from '../StylizedCollapse';
import { parseLocation } from '../../utils/globalVariables';
import { Amorphous, VoidMaterial, VoidMission } from '../../interfaces/interfaces';
import voidMissionsData from '../../../data/void_missions.json';
import amorphousData from '../../../data/amorphous.json';
import AmorphousCard from './AmorphousCard';

interface AmorphousDialogProps {
    open: boolean;
    onClose: () => void;
    drop_location?: string;
    open_location?: string;
	selectedPart?: string;
}

const AmorphousDialog: React.FC<AmorphousDialogProps> = ({ open, onClose, drop_location, open_location, selectedPart }) => {
    const [filteredAmorphous, setFilteredAmorphous] = useState<Amorphous[]>([]);
	const [materials, setMaterials] = useState<VoidMaterial[]>([]);
	const [title, setTitle] = useState<string>('');
	const [rewardTitle, setRewardTitle] = useState<string>('');
	const voidMissions: VoidMission[] = voidMissionsData as VoidMission[];

	const transformDataForGrid = (data: VoidMission[]): any[] => {
		return data.map(item => {
			// Create a map with null values for all materials
			const materialsMap: { [key: string]: number | null } = {
				organic: null,
				inorganic: null,
				polymer: null,
				monomer: null
			};
	
			// Populate the map with actual values from the materials array
			item.materials.forEach(material => {
				if (materialsMap.hasOwnProperty(material.name)) {
					materialsMap[material.name] = material.value;
				}
			});
	
			// Return the transformed data with material fields
			return {
				location: item.location,
				type: item.type,
				element: item.element,
				difficulty: item.difficulty,
				bonus: item.bonus,
				organic: materialsMap.organic,
				inorganic: materialsMap.inorganic,
				polymer: materialsMap.polymer,
				monomer: materialsMap.monomer
			};
		});
	};
	const transformedDataForGrid = transformDataForGrid(voidMissions);
	const flatMaterials = materials.flat();
    const materialString = flatMaterials
        .map(material => `${material.name}: ${material.value}`)
        .join(', ');
	
    useEffect(() => {
        if(open){
            // Determine the type of location and filter accordingly
            let filtered: Amorphous[] = [];
            if (drop_location) {
				setTitle('Drop Location');
				setRewardTitle(`Drop available in ${drop_location}`);
                filtered = amorphousData.filter(amorphous => amorphous.drop_location === drop_location);
				setMaterials([]);
            } 
			else if (open_location) {
				const { location, difficulty } = parseLocation(open_location);
				setTitle('Open Location');
				setRewardTitle(`Amorphous to open in ${open_location}`);
                filtered = amorphousData.filter(amorphous => amorphous.open_location === open_location);
				// Find matching void missions based on parsed location and difficulty
                const matchingMissions = voidMissionsData.filter(mission => 
                    mission.location === location && mission.difficulty === difficulty && mission.type === 'Reactor'
                );
				
                // Collect materials for the current open_location
                const collectedMaterials = matchingMissions.flatMap(mission => mission.materials);
				console.log(collectedMaterials)
                setMaterials(collectedMaterials);
            }
            setFilteredAmorphous(filtered);
        }
    }, [open, drop_location, open_location]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{backgroundColor: '#15171c', display: 'flex', justifyContent: 'center', padding: '5px'}}>
                <Typography sx={{color: 'tertiary.dark', fontWeight: 'bold', fontSize: '24px', textTransform: 'uppercase'}}>{title}</Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 20, top: 2, color: 'tertiary.dark' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{paddingTop: '20px!important'}}>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px',}}>
					{materials.length > 1 && (
						<StylizedCollapse header={`void shards obtention (${materialString})`}>
							<Box sx={{width:'100%'}}>
								<VoidMissionsGrid 
									data={transformedDataForGrid} 
								/>
							</Box>
						</StylizedCollapse>
					)}
					<StylizedCollapse header={rewardTitle}>
						<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', width: '80%'}}>
							{filteredAmorphous.map((amorphous, index) => (
								<AmorphousCard key={index} amorphous={amorphous} selectedPart={selectedPart}/>
							))}
						</Box>
					</StylizedCollapse>
				</Box>
            </DialogContent>
        </Dialog>
    );
};

export default AmorphousDialog;