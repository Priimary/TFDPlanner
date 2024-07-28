import React from 'react';
import { Card, CardContent, Typography, Slider, Box, CardMedia } from '@mui/material';
import styles from '../../styles/DescendantStatsCard.module.css';

interface DescendantStatsCardProps {
    imageUrl: string;
    name: string;
    stats: { stat_type: string; stat_value: number }[];
    onLevelChange: (event: Event, newValue: number | number[]) => void;
    selectedLevel: number;
}

const DescendantStatsCard: React.FC<DescendantStatsCardProps> = ({
    imageUrl,
    name,
    stats,
    onLevelChange,
    selectedLevel,
}) => {
    return (
        <Card className={styles.card}>
            <CardMedia component='img' src={imageUrl} alt={name} className={styles.card_media}/>
            <CardContent className={styles.card_content}>
                <Typography className={styles.character_name} sx={{color: "tertiary.dark"}}>
                    {name}
                </Typography>
                <Slider
                    value={selectedLevel}
                    min={1}
                    max={40}
                    step={1}
                    onChange={onLevelChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="level-slider"
                />
                <Box className={styles.stats_container}>
					<Box className={styles.stats_content}>
						<Typography className={styles.stat_type} sx={{ color: "primary.dark"}}>Level: </Typography>
						<Typography className={styles.stat_value} sx={{ color: "tertiary.dark"}}>{selectedLevel}</Typography>
					</Box>
                    {stats.map((stat, index) => (
                        <Box key={index} className={styles.stats_content}>
                            <Typography className={styles.stat_type} sx={{color: "primary.dark"}}>{stat.stat_type}</Typography>
							<Typography className={styles.stat_value} sx={{color: "tertiary.dark"}}>{stat.stat_value}</Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default DescendantStatsCard;