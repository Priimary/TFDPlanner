"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import styles from '../../styles/consumable[id].module.css';
import consumablesData from '../../../data/consumables.json';
import { Consumable } from '../../interfaces/interfaces';
import ConsumableLargeCard from '../../components/Consumables/ConsumableLargeCard';

const ConsumablePage: React.FC = () => {
    const [consumable, setConsumable] = useState<Consumable | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id){
            const consumablesDataTyped: Consumable[] = consumablesData as Consumable[];
			console.log(consumablesDataTyped)
            const fetchedConsumable = consumablesDataTyped.find((c: Consumable) => c.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/, '') === id);
            setConsumable(fetchedConsumable || null);
        }
    }, [id]);

    if (!consumable){
        return <Typography variant="h6">Loading...</Typography>;
    }

	const consumableLargeCardProps = {
		name: consumable.name,
		image_url: `/images/${consumable.type.toLowerCase().replace(/ /g, '_')}/${consumable.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '_')}.png`,
		type: consumable.type,
		tier: consumable.tier
	}

    return (
        <Box className={styles.main}>
			<Box className={styles.weapon_container}>
				<ConsumableLargeCard 
					item={consumableLargeCardProps}
				/>
			</Box>
        </Box>
    );
};

export default ConsumablePage;