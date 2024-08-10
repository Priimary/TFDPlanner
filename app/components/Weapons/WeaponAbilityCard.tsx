import React, {useState} from 'react';
import {Typography, Card, CardContent, Box, Slider, List, ListItem, ListItemText } from '@mui/material';
import { WeaponAbility } from '../../interfaces/interfaces';
import weaponUniqueAbilityData from '../../../data/weapons_unique_ability.json';
import styles from '../../styles/WeaponAbilityCard.module.css';
import Image from 'next/image';

interface WeaponAbilityCardProps {
    ability: {
        weapon_perk_ability_name: string | null;
        weapon_perk_ability_image_url: string | null;
        weapon_perk_ability_description: string | null;
    },
	weapon_id: string;
}

const WeaponAbilityCard: React.FC<WeaponAbilityCardProps> = ({ ability, weapon_id }) => {
	const [selectedLevel, setSelectedLevel] = useState<number>(1);
	const abilityDetails = (weaponUniqueAbilityData as WeaponAbility[]).find((item) => item.weapon_id === weapon_id);

    if (!ability.weapon_perk_ability_name) {
        return null;
    }
	const handleLevelChange = (event: Event, newValue: number | number[]) => {
        setSelectedLevel(newValue as number);
    };

	const renderAbilityDetails = (details: { [key: string]: string }) => {
        return (
            <List>
                {Object.entries(details).map(([key, value], index) => (
                    <ListItem key={index} sx={{padding: '0 20px'}}>
                        <ListItemText
                            primary={<Typography sx={{textTransform: 'capitalize', color: 'primary.dark', fontWeight: 'bold'}}>{key.replace(/_/g, ' ')} :</Typography>}
                            secondary={<Typography sx={{color: 'tertiary.dark'}}>{value}</Typography>}
							sx={{display: 'flex', gap: '5px'}}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
		<Card className={styles.card}>
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					height: '40px',
					backgroundColor: '#15171c'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', width: '10%'}}>
					{ability.weapon_perk_ability_image_url && (
						<Image
							src={ability.weapon_perk_ability_image_url}
							alt={ability.weapon_perk_ability_name}
							width={30}
							height={30}
							quality={100}
						/>
					)}
				</div>

				<div style={{ flex: '1', textAlign: 'center' }}>
					<Typography component="div" className={styles.ability_name} sx={{ color: 'primary.dark' }}>
						{ability.weapon_perk_ability_name}
					</Typography>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', flex: '0 0 auto', width: '10%'}}>
					
				</div>
			</div>
			<CardContent className={styles.card_content}>
				<Box>
					<Typography paragraph className={styles.ability_description} sx={{color: 'tertiary.dark'}}>
						{ability.weapon_perk_ability_description}
					</Typography>
				</Box>
				{abilityDetails && (
					<Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
							<Slider
								value={selectedLevel}
								min={1}
								max={5}
								step={1}
								onChange={handleLevelChange}
								valueLabelDisplay="auto"
								aria-labelledby="level-slider"
								sx={{color: 'tertiary.dark',width: '70%'}}
							/>
						</Box>
						<Box sx={{overflowY: 'auto', maxHeight: '300px'}}>
							{abilityDetails.ability_effects?.map((effect, index) => (
								<Box key={index}>
									<Typography variant="h4" className={styles.dynamic_border_container} sx={{ color: 'primary.dark'}}>
										{effect.name}
									</Typography>
									{renderAbilityDetails(effect.levels[selectedLevel] || {})}
								</Box>
							))}
						</Box>
					</Box>
				)}
			</CardContent>
		</Card>
    );
};

export default WeaponAbilityCard;