import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box} from '@mui/material';
import { getTierColor } from '../../utils/globalVariables';
import styles from '../../styles/WeaponLargeCard.module.css';
import Image from 'next/image'

interface WeaponLargeCardProps {
	item: {
		weapon_image_url: string;
		name: string;
		weapon_tier: string;
		weapon_type: string;
		weapon_rounds_type: string;
	}
}

const WeaponLargeCard: React.FC<WeaponLargeCardProps> = ({item}) => {
	const tierColor = getTierColor(item.weapon_tier);

	return (
        <Card className={styles.card}>
			<Box className={styles.card_header}>
				<Box className={styles.weapon_tier}>
					<Typography sx={{ color: tierColor, fontWeight: 'bold' }}>{item.weapon_tier}</Typography>
				</Box>
				<Box className={styles.weapon_type}>
					<Typography sx={{color: 'tertiary.dark', fontWeight: 'bold'}}>{item.weapon_type}</Typography>
				</Box>
				<Box className={styles.weapon_rounds_type} >
					<Image 
						src={`/images/rounds_types/${item.weapon_rounds_type.replace(' ', '_')}.png`}
                        alt={item.weapon_rounds_type}
						width={28}
						height={28}
						quality={100}
					/>
				</Box>
			</Box>
            <CardContent className={styles.card_content}>
				<CardMedia component='img' src={item.weapon_image_url} alt={item.name} className={styles.card_media} />
                <Typography className={styles.weapon_name} sx={{ color: tierColor }}>
                    {item.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WeaponLargeCard;