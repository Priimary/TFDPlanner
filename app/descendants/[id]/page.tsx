"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../styles/descendant[id].module.css';
import descendantsData from '../../../data/descendants.json';
import amorphousData from '../../../data/amorphous.json';
import { descendantParts } from '../../utils/globalVariables';
import { useParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { Descendant, Amorphous } from '../../interfaces/interfaces';
import DescendantFullCard from '../../components/Descendants/DescendantFullCard';
import CraftDisplay from '../../components/CraftDisplay';

const DescendantPage: React.FC = () => {
	const [descendant, setDescendant] = useState<Descendant | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(1);
    const [currentStats, setCurrentStats] = useState<any>([]);
	const [hasPart, setHasPart] = useState<boolean>(false);
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
            setHasPart(hasCode);
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

	const partOptions = descendantParts.map(part => ({
		name: `${descendant.descendant_name} ${part}`,
		value: 1
	}));

    return (
		<Box className={styles.main}>
			<Box className={styles.descendant_card}>
				<DescendantFullCard header={descendant.descendant_name} image_url={descendant.descendant_image_url} skills={descendant.descendant_skill} stats={currentStats} selectedLevel={selectedLevel} onLevelChange={handleLevelChange}>
					{hasPart && (
						<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
							<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '10%', borderBottom: '1px solid #42a5f5'}}>CRAFT</Typography>
							<CraftDisplay craft={partOptions}/>
						</Box>
					)}
				</DescendantFullCard>
			</Box>
			
		</Box>
    );
};

export default DescendantPage;