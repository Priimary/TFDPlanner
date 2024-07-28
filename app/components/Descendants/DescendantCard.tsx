"use client";
import React from 'react';
import { Descendant } from '../../interfaces/interfaces';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import styles from '../../styles/DescendantCard.module.css';
import { getTierColor } from '../../utils/globalVariables';

interface DescendantCardProps {
    item: Descendant;
}
const determineTier = (name: string): string => {
    if (name.includes('Ultimate')) return 'Ultimate';
    return 'Standard';
};
const DescendantCard: React.FC<DescendantCardProps> = ({ item }) => {
	const tier = determineTier(item.descendant_name);
	const tierColor = getTierColor(tier);
	const boxShadowStyle = {
        boxShadow: `inset ${tierColor} 0px 0px 40px 0px,
		inset rgba(60, 70, 85, 0.5) 0px 0px 40px 0px,
		inset rgba(0, 0, 0, 1) 0px 0px 10px 0px`
    };
    return (
        <Card className={styles.card} sx={boxShadowStyle}>
			<CardMedia
				component="img"
				image={item.descendant_image_url}
				alt={item.descendant_name}
			/>
            <CardContent className={styles.card_content}>
				<Typography className={styles.card_text} sx={{color: tierColor}}>{item.descendant_name}</Typography>
            </CardContent>
        </Card>
    );
};

export default DescendantCard;