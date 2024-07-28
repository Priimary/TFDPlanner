"use client";
import React from 'react';
import styles from './styles/home.module.css';
import GameStatisticsCard from './components/Home/GameStatisticsCard';
import RecentItemsCard from './components/Home/RecentItemsCard';
import RoadmapCard from './components/Home/RoadmapCard';
import recentlyAddedData from '../data/recently_added.json';
import weaponsData from '../data/weapons.json';
import descendantsData from '../data/descendants.json';
import amorphousData from '../data/amorphous.json';
import modulesData from '../data/modules.json';
import consumablesData from '../data/consumables.json';
import { RecentlyAddedItems } from './interfaces/interfaces';
import { Box } from '@mui/material';


const LandingPage: React.FC = () => {
    const recentlyAdded: RecentlyAddedItems[] = recentlyAddedData;
	const weaponsCount = weaponsData.length;
    const descendantsCount = descendantsData.length;
    const amorphousCount = amorphousData.length;
	const modulesCount = modulesData.length;
	const consumablesCount = consumablesData.length;

    return (
        <Box className={styles.main} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0'}}>
			<Box className={styles.main_content} sx={{display: 'flex', gap: '50px', width: '90%'}}>
				<Box className={styles.left_box} sx={{width: '100%'}}>
					<Box className={styles.news_feed}>

					</Box>
					<Box className={styles.recently_added}>
						<RecentItemsCard
							recentlyAdded={recentlyAdded}
						/>
					</Box>
				</Box>
				<Box className={styles.right_box} sx={{width: '80%', display: 'flex', flexDirection: 'column', gap: '50px'}}>
					<Box className={styles.roadmap}>
						<RoadmapCard />
					</Box>
					<Box className={styles.game_stats}>
						<GameStatisticsCard
							weaponsCount={weaponsCount}
							descendantsCount={descendantsCount}
							amorphousCount={amorphousCount}
							modulesCount = {modulesCount}
							consumablesCount = {consumablesCount}
						/>
					</Box>
				</Box>
			</Box>
        </Box>
    );
};

export default LandingPage;