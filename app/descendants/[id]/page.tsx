"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../styles/descendant[id].module.css';
import descendantsData from '../../../data/descendants.json';
import amorphousData from '../../../data/amorphous.json';
import { useParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { Descendant, Amorphous } from '../../interfaces/interfaces';
import PartObtentionCard from '../../components/PartObtentionCard';
import DescendantStatsCard from '../../components/Descendants/DescendantStatsCard';
import DescendantSkillCard from '../../components/Descendants/DescendantSkillCard';

const DescendantPage: React.FC = () => {
	const [descendant, setDescendant] = useState<Descendant | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(1);
    const [currentStats, setCurrentStats] = useState<any>([]);
	const [showDescendantPartCard, setShowDescendantPartCard] = useState<boolean>(false);
	const {id} = useParams<{id: string}>();

    useEffect(() => {
		if(id){
			const descendantsDataTyped: Descendant[] = descendantsData as Descendant[];
			const fetchedDescendant = descendantsDataTyped.find((desc: Descendant) => desc.descendant_id === id);
			setDescendant(fetchedDescendant ||null);
		}

    }, [id]);

	useEffect(() => {
        if(descendant){
            // Check if the descendant's code is present in amorphous rewards
            const descendantCode = `${descendant.descendant_name.toLowerCase()} code`;
            const hasCode = amorphousData.some((amorphous: Amorphous) =>
                amorphous.rewards.some(reward => reward.name.toLowerCase() === descendantCode)
            );
            setShowDescendantPartCard(hasCode);
        }
    }, [descendant]);

	useEffect(() => {
		if(descendant){
			const stats = descendant.descendant_stat.find(stat => stat.level === selectedLevel);
			setCurrentStats(stats ? stats.stat_detail : []);
		}
	}, [selectedLevel, descendant]);

	if(!descendant){
		return <Typography variant="h6">Loading...</Typography>;
	}

    const handleLevelChange = (event: Event, newValue: number | number[]) => {
        setSelectedLevel(newValue as number);
    };

    return (
		<Box className={styles.main}>
			{showDescendantPartCard && (
				<Box className={styles.parts_container}>
					<PartObtentionCard name={descendant.descendant_name} type={"descendant"}/>
				</Box>
			)}
			<Box className={styles.character_container}>
				<Box className={styles.skills_container}>
					<DescendantSkillCard skills={descendant.descendant_skill}/>
				</Box>
				<Box className={styles.stats_container}>
					<DescendantStatsCard
						imageUrl={descendant.descendant_image_url}
						name={descendant.descendant_name}
						stats={currentStats}
						onLevelChange={handleLevelChange}
						selectedLevel={selectedLevel}
					/>
				</Box>
			</Box>
			
		</Box>
        
    );
};

export default DescendantPage;