import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import styles from '../../styles/GameStatisticsCard.module.css'

interface GameStatisticsCardProps {
    weaponsCount: number;
    descendantsCount: number;
    amorphousCount: number;
	modulesCount: number;
	consumablesCount: number;
}
interface StatCardProps{
	name: string;
	value: number;
}

const StatCard: React.FC<StatCardProps> = ({ name, value }) => {
	return(
		<Card>
			<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px',backgroundColor: '#15171c'}}>
				<Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '14px', color: 'primary.dark' }}>{name}</Typography>
			</Box>
			<CardContent sx={{display: 'flex', justifyContent: 'center'}}>
				<Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '16px', color: 'tertiary.dark' }}>{value}</Typography>
			</CardContent>
		</Card>
	)
}
const GameStatisticsCard: React.FC<GameStatisticsCardProps> = ({ weaponsCount, descendantsCount, amorphousCount, modulesCount, consumablesCount }) => {
    return (
        <Card className={styles.main}>
			<Box className={styles.card_header} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px',backgroundColor: '#15171c'}}>
				<Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '18px', color: 'tertiary.dark' }}>Statistics</Typography>
			</Box>
			<CardContent className={styles.card_content} sx={{backgroundColor: '#2b2f38', display: 'flex', flexDirection: 'column', gap: '15px'}}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<StatCard name="descendants" value={descendantsCount}/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<StatCard name="weapons" value={weaponsCount}/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<StatCard name="consumables" value={consumablesCount}/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<StatCard name="amorphous" value={amorphousCount}/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<StatCard name="modules" value={modulesCount}/>
					</Grid>
				</Grid>
			</CardContent>
    	</Card>
    );
};

export default GameStatisticsCard;