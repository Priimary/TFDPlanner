"use client";
import React from 'react';
import { Weapon } from '../../interfaces/interfaces';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from '../../styles/WeaponCard.module.css';
import { getTierColor } from '../../utils/globalVariables';

interface WeaponCardProps {
    item: Weapon;
}

const WeaponCard: React.FC<WeaponCardProps> = ({ item }) => {
	const tierColor = getTierColor(item.weapon_tier);
	const boxShadowStyle = {
        boxShadow: `inset ${tierColor} 0px 0px 40px 0px,
		inset rgba(60, 70, 85, 0.5) 0px 0px 40px 0px,
		inset rgba(0, 0, 0, 1) 0px 0px 10px 0px`,
    };

	return (
        <Card className={styles.card}>
			<div className={styles.media_container} style={boxShadowStyle}>
				<CardMedia
					component="img"
					image={item.image_url}
					alt={item.weapon_name}
					className={styles.card_media}
				/>
			</div>
			
            <CardContent className={styles.card_content}>
				<Typography className={styles.card_text} style={{color: tierColor}}>{item.weapon_name}</Typography>
            </CardContent>
        </Card>
    );
};

export default WeaponCard;