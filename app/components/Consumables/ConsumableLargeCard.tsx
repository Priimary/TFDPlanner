import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box} from '@mui/material';
import { getTierColor } from '../../utils/globalVariables';
import styles from '../../styles/ConsumableLargeCard.module.css';
import Image from 'next/image';

interface ConsumableLargeCardProps {
	item: {
		name: string;
		image_url: string;
		tier: string;
		type: string;
	}
}

const ConsumableLargeCard: React.FC<ConsumableLargeCardProps> = ({item}) => {
	const tierColor = getTierColor(item.tier);

	return (
        <Card className={styles.card}>
			<Box className={styles.card_header}>
				<Box className={styles.weapon_tier}>
					<Typography sx={{ color: tierColor, fontWeight: 'bold' }}>{item.tier}</Typography>
				</Box>
				<Box className={styles.weapon_type}>
					<Typography sx={{color: 'tertiary.dark', fontWeight: 'bold'}}>{item.type}</Typography>
				</Box>
				<Box className={styles.weapon_rounds_type} >
					<Image 
						src={`/images/consumables_type_icons/${item.type.replace(' ', '_').toLowerCase()}.png`}
                        alt={item.type}
						width={28}
						height={28}
						quality={100}
					/>
				</Box>
			</Box>
            <CardContent className={styles.card_content}>
				<CardMedia component='img' src={item.image_url} alt={item.name} className={styles.card_media} />
                <Typography className={styles.weapon_name} sx={{ color: tierColor }}>
                    {item.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ConsumableLargeCard;