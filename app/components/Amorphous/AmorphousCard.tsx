import React from 'react';
import { Card, CardContent, CardActions, Typography, Grid, Box } from '@mui/material';
import { VoidMission, Amorphous } from '../../interfaces/interfaces';
import voidMissionsData from '../../../data/void_missions.json';
import { getMaterialsForAmorphous } from '../../utils/globalVariables';
import AmorphousRewardCard from './AmorphousRewardCard';
import Image from 'next/image';

interface AmorphousCardProps {
    amorphous: Amorphous;
    selectedPart?: string;
}

const AmorphousCard: React.FC<AmorphousCardProps> = ({ amorphous, selectedPart}) => {
	const missionsData = voidMissionsData as VoidMission[];
	const materials = getMaterialsForAmorphous(amorphous, missionsData);
	const materialsString = materials.map(material => `${material.name}: ${material.value}`).join(', ');

    return (
        <Card sx={{backgroundColor: '#2b2f38'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', backgroundColor: '#15171c', padding: '10px 0'}}>
                <div>
                    <Typography color='tertiary.dark' sx={{fontSize:'20px', fontWeight: 'bold', position: 'relative', textTransform: 'uppercase'}}>
                        Amorphous {amorphous.id}
                        <Image
                            src={`/images/consumables/amorphous_material_pattern__${typeof amorphous.id === 'string' ? amorphous.id.toLowerCase() : amorphous.id}.png`} 
                            alt={`amorphous ${amorphous.id}`}
							width={45}
							height={45}
							quality={100}
                            style={{position: 'absolute', top: '-25%', left:'-30%'}}
                        />
                    </Typography>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#15171C', display: 'flex', justifyContent: 'center', borderRadius: '0 0 10px 10px', padding: '0 10px' }}>
                    <Typography sx={{ color: 'tertiary.dark', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px' }}>
                        {amorphous.drop_location_type}
                    </Typography>
                </div>
            </div>
            <CardContent>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    {amorphous.rewards.map((reward, index) => (
                        <AmorphousRewardCard
                            key={index}
                            reward={reward}
                            isSelected={reward.name.toLowerCase() === selectedPart?.toLowerCase()}
                        />
                    ))}
                </Grid>
            </CardContent>
			
			<CardActions sx={{display: 'flex', flexDirection: 'column', padding: 0, backgroundColor: '#15171c'}}>
				<Box
					sx={{display: 'flex', gap: '5px', borderRadius: '0 0 0 5px'}}
				>
					<Typography color='primary.dark' style={{fontWeight: 'bold'}}>Drop on</Typography>
					<Typography color='tertiary.main'>{amorphous.drop_location}</Typography>
				</Box>
				<Box
					sx={{display: 'flex', gap: '5px', borderRadius: '0 0 5px 0'}}
				>
					<div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
						<div style={{ display: 'flex', gap: '10px'}}>
							<Typography color='primary.dark' style={{fontWeight: 'bold'}}>Open on</Typography>
							<Typography color='tertiary.main'>{amorphous.open_location}</Typography>
						</div>
						{materialsString && (
							<div style={{ display: 'flex', gap:'10px'}}>
								<Typography color='primary.dark' style={{fontWeight: 'bold'}}>Material Cost</Typography>
								<div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
									<Typography color='tertiary.main' sx={{textTransform: 'capitalize'}}>{materialsString}</Typography>
								</div>
							</div>
						)}
					</div>
				</Box>
			</CardActions>
			
        </Card>
    );
};

export default AmorphousCard;