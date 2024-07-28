import React from 'react';
import Link from "next/link";
import DescendantCard from './DescendantCard';
import { Descendant } from '../../interfaces/interfaces';
import { Grid } from '@mui/material';


interface DescendantsGridProps{
	items: Descendant[];
}

const DescendantsGrid: React.FC<DescendantsGridProps> = ({ items }) => {  
	return (
		<Grid container spacing={2}>
			{items.map((item, index) => (
				<Grid item xs={6} sm={4} md={3} lg={1.7} key={index}>
					<Link href={`/descendants/${item.descendant_id}`} style={{textDecoration: 'none'}}>
              			<DescendantCard item={item} />
          			</Link>
				</Grid>
			))}
		</Grid>
	);
  };
  
  export default DescendantsGrid;