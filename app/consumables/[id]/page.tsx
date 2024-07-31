"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Box, Grid } from '@mui/material';
import styles from '../../styles/consumable[id].module.css';
import consumablesData from '../../../data/consumables.json';
import consumablesDetailsData from '../../../data/consumables_details.json';
import amorphousData from '../../../data/amorphous.json';
import { Consumable, ConsumableDetail, Amorphous, ExtendedConsumable} from '../../interfaces/interfaces';
import ItemCard from '../../components/ItemCard';
import ObtentionDisplay from '../../components/ObtentionDisplay';
import CraftDisplay from '../../components/CraftDisplay';
import AmorphousInfo from '../../components/Amorphous/AmorphousInfo';
import AmorphousRewardCard from '../../components/Amorphous/AmorphousRewardCard';
import AmorphousCard from '../../components/Amorphous/AmorphousCard';


const ConsumablePage: React.FC = () => {
    const [consumable, setConsumable] = useState<ExtendedConsumable | null>(null);
	const [amorphous, setAmorphous] = useState<Amorphous | null>(null);
	const [amorphousDataForItemPart, setAmorphousDataForItemPart] = useState<any>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id){
            const consumablesDataTyped: Consumable[] = consumablesData as Consumable[];
            const fetchedConsumable = consumablesDataTyped.find((c: Consumable) => 
				c.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/, '') === id
			) as ExtendedConsumable;	
            if(fetchedConsumable){
				if(['Basic Material', 'Miscellaneous', 'Enhancement Material'].includes(fetchedConsumable.type)){
					const details = consumablesDetailsData.find((d: ConsumableDetail) =>
						d.name.toLowerCase().replace(/ /g, '_').replace(/'/g, ' ').replace(/:/, '') === id
					);
					if(details && details.drop_location){
						fetchedConsumable.drop_location = details.drop_location;
					}
					if(details && details.craft){
						fetchedConsumable.craft = details.craft;
					}
				}
				if(['Amorphous Material'].includes(fetchedConsumable.type)){
					if(!fetchedConsumable.name.includes('Shape Stabilizer Form')){
						const idMatch = id.match(/\d+/);
						const numericId = idMatch ? idMatch[0] : '';
						const amorphousDetails = amorphousData.find((a: Amorphous) => 
							a.id == numericId
						);
						if(amorphousDetails){
							setAmorphous(amorphousDetails);
						}
					}
				}
				if(['Core Material'].includes(fetchedConsumable.type)){
					if(fetchedConsumable.name.includes('Blueprint') || fetchedConsumable.name.includes('Code')){
						const filteredAmorphousData = amorphousData.filter((amorphous: Amorphous) =>
							amorphous.rewards.some(reward =>
								reward.name.toLowerCase() === fetchedConsumable.name.toLowerCase()
							)
						);
						if(filteredAmorphousData.length > 1){
							// Sort based on drop_rate
							const sortedAmorphousData = filteredAmorphousData.sort((a, b) => {
								const getMaxDropRate = (amorphous: Amorphous) => {
									return Math.max(...amorphous.rewards
										.filter(reward => reward.name.toLowerCase() === fetchedConsumable.name.toLowerCase())
										.map(reward => reward.drop_rate)
									);
								};

								return getMaxDropRate(b) - getMaxDropRate(a);
							});

							setAmorphousDataForItemPart(sortedAmorphousData);
						}
					}
				}
			}
			setConsumable(fetchedConsumable || null);
        }
    }, [id]);

    if (!consumable){
        return <Typography variant="h6">Loading...</Typography>;
    }

	const props = {
		name: consumable.name,
		description: consumable.description,
		image_url: `/images/consumables/${consumable.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '_')}.png`,
		type: consumable.type,
		tier: consumable.tier
	}

    return (
        <Box className={styles.main}>
			<Box sx={{display: 'flex', flexDirection: 'column', width: '80%'}}>
				<ItemCard header={props.name} description={props.description} image_url={props.image_url} tier={consumable.tier} type={consumable.type}>
					<Box>
						{consumable.craft && (
							<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
								<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '10%', borderBottom: '1px solid #42a5f5'}}>CRAFT</Typography>
								<CraftDisplay 
									craft={consumable.craft}
								/>
							</Box>
						)}
						{consumable.drop_location && (
							<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
								<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '20%', borderBottom: '1px solid #42a5f5'}}>OBTAINED FROM</Typography>
								<ObtentionDisplay 
									obtention={consumable.drop_location}
								/>
							</Box>
						)}
						{amorphous && (
							<Box sx={{display: 'flex', flexDirection: 'column', gap:'20px'}}>
								<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
									<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '10%', borderBottom: '1px solid #42a5f5'}}>INFO</Typography>
									<AmorphousInfo amorphous={amorphous}/>
								</Box>
								<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
									<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '15%', borderBottom: '1px solid #42a5f5'}}>REWARDS</Typography>
									<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
										{amorphous.rewards.map((reward, index) => (
											<AmorphousRewardCard reward={reward} key={index}/>
										))}
									</Grid>
								</Box>
							</Box>
						)}
						{amorphousDataForItemPart && (
							<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
								<Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold', color: 'primary.dark', width: '20%', borderBottom: '1px solid #42a5f5'}}>OBTAINED FROM</Typography>
								{amorphousDataForItemPart.map((amorphous: Amorphous, index: number) => (
									<AmorphousCard amorphous={amorphous} selectedPart={consumable.name} key={index}/>
								))}
							</Box>
						)}
					</Box>
				</ItemCard>
			</Box>
        </Box>
    );
};

export default ConsumablePage;