import React from 'react';
import {Typography, Card, CardContent } from '@mui/material';
import styles from '../../styles/WeaponAbilityCard.module.css';  // Ensure this file exists and styles are updated
import Image from 'next/image';

interface WeaponAbilityCardProps {
    ability: {
        weapon_perk_ability_name: string | null;
        weapon_perk_ability_image_url: string | null;
        weapon_perk_ability_description: string | null;
    };
}

const WeaponAbilityCard: React.FC<WeaponAbilityCardProps> = ({ ability }) => {
    if (!ability.weapon_perk_ability_name) {
        return null;
    }

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
				<Typography paragraph className={styles.ability_description} sx={{color: 'tertiary.dark'}}>
					{ability.weapon_perk_ability_description}
				</Typography>
			</CardContent>
		</Card>
    );
};

export default WeaponAbilityCard;