"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Box, Slider } from '@mui/material';
import styles from '../../styles/weapon[id].module.css';
import weaponsData from '../../../data/weapons.json';
import amorphousData from '../../../data/amorphous.json';
import { Weapon, Amorphous } from '../../interfaces/interfaces';
import PartObtentionCard from '../../components/PartObtentionCard';
import WeaponStatsCard from '../../components/Weapons/WeaponStatsCard';
import WeaponAbilityCard from '../../components/Weapons/WeaponAbilityCard';
import WeaponLargeCard from '../../components/Weapons/WeaponLargeCard';

const WeaponPage: React.FC = () => {
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(1);
    const [showWeaponPartCard, setShowWeaponPartCard] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id){
            const weaponsDataTyped: Weapon[] = weaponsData as Weapon[];
            const fetchedWeapon = weaponsDataTyped.find((w: Weapon) => w.weapon_id === id);
            setWeapon(fetchedWeapon || null);
        }
    }, [id]);

    useEffect(() => {
        if (weapon) {
            const weaponBlueprint = `${weapon.weapon_name.toLowerCase()} blueprint`;
            const hasBlueprint = amorphousData.some((amorphous: Amorphous) =>
                amorphous.rewards.some(reward => reward.name.toLowerCase() === weaponBlueprint)
            );
            setShowWeaponPartCard(hasBlueprint);
        }
    }, [weapon]);

    if (!weapon) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const handleLevelChange = (event: Event, newValue: number | number[]) => {
        setSelectedLevel(newValue as number);
    };

    const ability = {
        weapon_perk_ability_name: weapon.weapon_perk_ability_name || null,
        weapon_perk_ability_image_url: weapon.weapon_perk_ability_image_url || null,
        weapon_perk_ability_description: weapon.weapon_perk_ability_description || null
    };

    const baseStats = weapon.base_stat.map(stat => ({
        stat_type: stat.stat_id,
        stat_value: stat.stat_value,
    }));
	const weaponLargeCardProps = {
		weapon_image_url: weapon.image_url,
		name: weapon.weapon_name,
		weapon_tier: weapon.weapon_tier,
		weapon_type: weapon.weapon_type,
		weapon_rounds_type: weapon.weapon_rounds_type
	}

    return (
        <Box className={styles.main}>
            {showWeaponPartCard && (
                <Box className={styles.parts_container}>
                    <PartObtentionCard name={weapon.weapon_name} type={"weapon"}/>
                </Box>
            )}
            <Box className={styles.weapon_stats_container}>
				<Box className={styles.weapon_info_container}>
					<Box className={styles.weapon_container}>
						<WeaponLargeCard 
							item={weaponLargeCardProps}
						/>
					</Box>
					<Box className={styles.ability_container}>
						{ability.weapon_perk_ability_name && (
							<Box className={styles.ability_container}>
								<WeaponAbilityCard
									ability={ability}
								/>
							</Box>
						)}
                	</Box>
				</Box>
                <Box className={styles.stats_container}>
					<Box>
						<Slider
							value={selectedLevel}
							min={1}
							max={100}
							step={1}
							onChange={handleLevelChange}
							valueLabelDisplay="auto"
							aria-labelledby="level-slider"
							sx={{color: 'tertiary.dark'}}
						/>
					</Box>
					<Box>
						<WeaponStatsCard
							baseStats={baseStats}
							firearmAtk={weapon.firearm_atk}
							selectedLevel={selectedLevel}
                    	/>
					</Box>
                    
                </Box>
            </Box>
        </Box>
    );
};

export default WeaponPage;