"use client";
import React from 'react';
import VoidMissionsGrid from '../components/VoidMissions/VoidMissionsGrid';
import voidMissionsData from '../../data/void_missions.json';
import { VoidMission } from '../interfaces/interfaces';
import styles from '../styles/voidmissions.module.css';
import { Typography } from '@mui/material';

const transformDataForGrid = (data: VoidMission[]): any[] => {
    return data.map(item => {
        const materialsMap: { [key: string]: number | null } = {
            organic: null,
            inorganic: null,
            polymer: null,
            monomer: null
        };

        item.materials.forEach(material => {
            if (materialsMap.hasOwnProperty(material.name)) {
                materialsMap[material.name] = material.value;
            }
        });

        return {
            location: item.location,
            type: item.type,
            element: item.element,
            difficulty: item.difficulty,
            bonus: item.bonus,
            organic: materialsMap.organic,
            inorganic: materialsMap.inorganic,
            polymer: materialsMap.polymer,
            monomer: materialsMap.monomer
        };
    });
};
const VoidMissionsPage: React.FC = () => {
    const voidMissions: VoidMission[] = voidMissionsData as VoidMission[];
	const transformedDataForGrid = transformDataForGrid(voidMissions);

    return (
        <div className={styles.main}>
			<div className={styles.info_container} style={{backgroundColor: '#15171c'}}>
				<ul className={styles.info_content}>
					<li><Typography sx={{color: 'tertiary.dark'}}>Missions with the best raw income aren&apos;t necessarily the most efficient.</Typography></li>
					<li><Typography sx={{color: 'tertiary.dark'}}>Void Shards types are gated by Element, check out another element for a possible better income.</Typography></li>
					<li><Typography sx={{color: 'tertiary.dark'}}>Fragment type missions in Hard difficulty rewards you with 3x more shards, always try to farm in this difficulty.</Typography></li>
					<li><Typography sx={{color: 'tertiary.dark'}}>Basic filter presets are available to make your life easier, remember to check out other elements.</Typography></li>
				</ul>
			</div>
			<div className={styles.grid_container}>
 				<VoidMissionsGrid data={transformedDataForGrid} />
			</div>
        </div>
    );
};

export default VoidMissionsPage;