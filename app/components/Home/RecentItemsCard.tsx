import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RecentlyAddedItems } from '../../interfaces/interfaces';
import styles from '../../styles/RecentItemsCard.module.css';

interface RecentItemsCardProps {
	recentlyAdded: RecentlyAddedItems[]
}

const RecentItemsCard: React.FC<RecentItemsCardProps> = ({ recentlyAdded }) => {
    const router = useRouter();

    const handleClick = (url: string) => {
        router.push(url);
    };

    return (
        <Card className={styles.main} sx={{display: 'flex', flexDirection: 'column'}}>
            <Box className={styles.main_card_header} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px',backgroundColor: '#15171c'}}>
                <Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '18px', color: 'tertiary.dark' }}>Recently Added</Typography>
            </Box>
            <CardContent className={styles.main_card_content} sx={{backgroundColor: '#2b2f38', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {recentlyAdded.map((item, index) => (
                    <Card key={index} className={styles.version_card}>
						<Box className={styles.version_card_header} sx={{display: 'flex', alignItems: 'center', height: '40px', paddingLeft: '15px', backgroundColor: '#15171c'}}>
							<Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '18px', color: 'primary.dark'}}>
                            	{item.version}
                        	</Typography>
						</Box>
						<CardContent className={styles.version_card_content} sx={{ display: 'flex', flexDirection: 'column'}}>
							<Grid container spacing={2}>
								{item.news.map((newsItem, newsIndex) => (
									<Grid item xs={12} sm={6} md={4} lg={2} key={newsIndex}>
										<Card
											className={styles.new_item_card}
											style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
											onClick={() => handleClick(newsItem.link_url || '')}
										>
											<Box className={styles.new_item_card_header} sx={{backgroundColor: '#2b2f38'}}>
												<CardMedia
													component="img"
													src={newsItem.image_url || '/images/default.png'}
													alt={newsItem.name}
													style={{width: '100%', height: 'auto'}}
												/>
											</Box>
											<CardContent className={styles.new_item_card_content} style={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#15171c', height: '40px', padding: '5px', boxSizing: 'border-box'}}>
												<Typography sx={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px', color: 'primary.dark', }}>
													{newsItem.name}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								))}
                        	</Grid>
						</CardContent>
                        
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

export default RecentItemsCard;