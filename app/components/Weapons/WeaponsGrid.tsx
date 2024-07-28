import React from 'react';
import WeaponCard from './WeaponCard';
import Link from "next/link";
import { Weapon } from '../../interfaces/interfaces';
import { Grid, Box } from '@mui/material';

interface WeaponsGridProps{
	items: Weapon[];
}

const WeaponsGrid: React.FC<WeaponsGridProps> = ({ items }) => {
  
	return (
		<Box>
			<Grid container spacing={4}>
				{items.map((item, index) => (
					<Grid item xs={6} sm={6} md={4} lg={2.4} key={index}>
						<Link href={`/weapons/${item.weapon_id}`} style={{textDecoration: 'none'}}>
							<WeaponCard item={item} />
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
  };
  
  export default WeaponsGrid;