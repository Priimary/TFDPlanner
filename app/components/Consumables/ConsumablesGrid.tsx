import React from 'react';
import ConsumableCard from './ConsumableCard';
import Link from "next/link";
import { Consumable } from '../../interfaces/interfaces';
import { Grid, Box, Pagination } from '@mui/material';

interface ConsumablesGridProps {
    items: Consumable[];
    onPageChange: (page: number) => void;
    currentPage: number;
    totalItems: number;
}

const ITEMS_PER_PAGE = 12; // Should match the number in ConsumablesPage

const ConsumablesGrid: React.FC<ConsumablesGridProps> = ({ items, onPageChange, currentPage, totalItems }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center', width: '80%' }}>
                {items.map((item, index) => (
                    <Grid item xs={10} sm={6} md={4} lg={3} key={index}>
                        <Link href={`/consumables/${item.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '')}`} style={{ textDecoration: 'none' }}>
                            <ConsumableCard index={index} item={item} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
					marginTop: '20px',
					'.MuiPaginationItem-root': {
						color: 'tertiary.dark', // Change text color
						'&.Mui-selected': {
							backgroundColor: '#15171c', // Change background color of selected page
							color: 'tertiary.dark', // Change text color of selected page
						},
					},
					'.MuiPagination-ul': {
						justifyContent: 'center', // Center align pagination items
					},
				}}
            />
        </Box>
    );
};

export default ConsumablesGrid;