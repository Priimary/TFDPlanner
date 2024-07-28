import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { FirearmAtk, Stat} from '../../interfaces/interfaces';
import styles from '../../styles/WeaponStatsCard.module.css';
import statsData from '../../../data/stats.json';
import { measureTypes } from '../../utils/globalVariables';

interface WeaponStatsCardProps {
    baseStats: { stat_type: string; stat_value: number | string }[];
    firearmAtk: { level: number; firearm: FirearmAtk[] }[];
    selectedLevel: number;
}

const getStatDetails = (statId: string): { name: string; measure: string } => {
    const stat = statsData.find((s: Stat) => s.stat_id === statId);
    const name = stat ? stat.stat_name : statId; // Default to statId if not found
    const measure = measureTypes[name] || ''; // Use the stat name to get measure type
    return { name, measure };
};

// Helper function to determine if the stat is a base stat
const isBaseStat = (stat: FirearmAtk | { stat_type: string; stat_value: number | string }): stat is { stat_type: string; stat_value: number | string } => {
    return (stat as { stat_type: string; stat_value: number | string }).stat_type !== undefined;
};

const WeaponStatsCard: React.FC<WeaponStatsCardProps> = ({
    baseStats,
    firearmAtk,
    selectedLevel,
}) => {
    // Find the firearm attack stats for the selected level
    const currentFirearmAtk = firearmAtk.find(levelData => levelData.level === selectedLevel)?.firearm || [];

    // Combine both stats arrays
    const stats: (FirearmAtk | { stat_type: string; stat_value: number | string })[] = [...currentFirearmAtk, ...baseStats];

    return (
        <Card className={styles.card}>
            <CardContent className={styles.card_content}>
				<Box sx={{display: 'flex', justifyContent:'space-between',marginBottom: '10px', alignSelf: 'flex-start', width:'100%'}}>
					<Typography className={styles.stat_type} sx={{ color: "primary.dark"}}>Level: </Typography>
					<Typography className={styles.stat_value} sx={{ color: "tertiary.dark"}}>{selectedLevel}</Typography>
				</Box>
                <Box className={styles.stats_container}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
                        {stats.map((stat, index) => (
                            <Grid 
                                item 
                                xs={12}
								sm={12}
								md={12}
								lg={12} 
                                key={index} 
                            >
                                <Box className={styles.stats_content}>
                                    <Typography className={styles.stat_type} sx={{ color: "primary.dark"}}>
                                        {isBaseStat(stat) ? getStatDetails(stat.stat_type).name : getStatDetails(stat.firearm_atk_type).name}
                                    </Typography>
                                    <Typography className={styles.stat_value} sx={{ color: "tertiary.dark"}}>
                                        {isBaseStat(stat) ? stat.stat_value : stat.firearm_atk_value}
										{isBaseStat(stat) ? getStatDetails(stat.stat_type).measure : getStatDetails(stat.firearm_atk_type).measure}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default WeaponStatsCard;