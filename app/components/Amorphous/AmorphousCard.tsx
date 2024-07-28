import React from 'react';
import { Card, CardContent, CardActions, Typography, Grid, Button } from '@mui/material';
import { Reward, VoidMaterial } from '../../interfaces/interfaces';
import AmorphousRewardCard from './AmorphousRewardCard';
import Image from 'next/image';

interface AmorphousCardProps {
    amorphous: {
        id: string | number;
        drop_location_type: string;
        drop_location: string;
        open_location: string;
        rewards: Reward[];
    };
    selectedPart: string;
    onDialogOpen?: (drop_location?: string, open_location?: string) => void;
	materials?: VoidMaterial[];
}

const AmorphousCard: React.FC<AmorphousCardProps> = ({ amorphous, selectedPart, onDialogOpen, materials = [] }) => {
    return (
        <Card sx={{backgroundColor: '#2b2f38'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', backgroundColor: '#15171c', padding: '10px 0'}}>
                <div>
                    <Typography color='tertiary.dark' sx={{fontSize:'20px', fontWeight: 'bold', position: 'relative', textTransform: 'uppercase'}}>
                        Amorphous {amorphous.id}
                        <Image
                            src={`/images/amorphous_material/amorphous_material_pattern__${typeof amorphous.id === 'string' ? amorphous.id.toLowerCase() : amorphous.id}.png`} 
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
                            isSelected={reward.name.toLowerCase() === selectedPart.toLowerCase()}
                        />
                    ))}
                </Grid>
            </CardContent>
			{onDialogOpen && (
				<CardActions sx={{display: 'flex', padding: 0, backgroundColor: '#15171c'}}>
					<Button
						sx={{flex: 1, gap: '5px', borderRadius: '0 0 0 5px'}}
						onClick={() => onDialogOpen(amorphous.drop_location)}
					>
						<Typography color='primary.dark' style={{fontWeight: 'bold'}}>Drop in</Typography>
						<Typography color='tertiary.main'>{amorphous.drop_location}</Typography>
					</Button>
					<Button
						sx={{flex: 1, gap: '5px', borderRadius: '0 0 5px 0'}}
						onClick={() => onDialogOpen(undefined, amorphous.open_location)}
					>
						<div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
							<div style={{ display: 'flex', gap: '10px'}}>
								<Typography color='primary.dark' style={{fontWeight: 'bold'}}>Open in</Typography>
								<Typography color='tertiary.main'>{amorphous.open_location}</Typography>
							</div>
							{materials.length > 0 && (
								<div style={{ display: 'flex', gap:'10px'}}>
									<Typography color='primary.dark' style={{fontWeight: 'bold'}}>COST</Typography>
									<div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
										{materials.map((material, index) => (
											<Typography color='tertiary.main' key={index}>{material.value} {material.name} </Typography>
										))}
									</div>
								</div>
							)}
						</div>
					</Button>
            	</CardActions>
			)}
        </Card>
    );
};

export default AmorphousCard;