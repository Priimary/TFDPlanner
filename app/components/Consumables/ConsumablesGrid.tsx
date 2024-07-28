import React from 'react';
import ConsumableCard from './ConsumableCard';
import Link from "next/link";
import { Consumable } from '../../interfaces/interfaces';
import { Grid, Box } from '@mui/material';

interface ConsumablesGridProps{
	items: Consumable[];
}

const ConsumablesGrid: React.FC<ConsumablesGridProps> = ({ items }) => {
  
	return (
		<Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
			<Grid container spacing={4} sx={{justifyContent: 'center', width: '80%',}}>
				{items.map((item, index) => (
					<Grid item xs={10} sm={6} md={4} lg={3} key={index}>
						<Link href={`/consumables/${item.name.toLowerCase().replace(/ /g,'_').replace(/'/,'_')}`} style={{textDecoration: 'none'}}>
							<ConsumableCard index={index} item={item}/>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
  };
  
  export default ConsumablesGrid;