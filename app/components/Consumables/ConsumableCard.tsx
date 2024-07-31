"use client";
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import styles from '../../styles/ConsumableCard.module.css';
import { Consumable } from '../../interfaces/interfaces';
import { getTierColor } from '../../utils/globalVariables';

interface ConsumableCardProps{
	index: number;
	item: Consumable;
}

const ConsumableCard: React.FC<ConsumableCardProps> = ({index, item}) => {
    const tierColor = getTierColor(item.tier);
	const boxShadowStyle = {
        boxShadow: `inset ${tierColor} 0px 0px 40px 0px,
		inset rgba(60, 70, 85, 0.5) 0px 0px 40px 0px,
		inset rgba(0, 0, 0, 1) 0px 0px 10px 0px`
    };
	const image_url = `/images/consumables/${item.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '_')}.png`;
	
    return (
		<Card key={index} className={styles.card}>
			<Box className={styles.card_media} sx={boxShadowStyle}>
				<CardMedia
					component="img"
					image={image_url || "/images/default.png"}
					alt={item.name}
					sx={{width: '40%'}}
				/>
			</Box>
			<CardContent className={styles.card_content}>
				<Typography className={styles.card_text} style={{color: tierColor, fontSize: '12px'}}>{item.name}</Typography>
			</CardContent>
		</Card>      
    );
};

export default ConsumableCard;