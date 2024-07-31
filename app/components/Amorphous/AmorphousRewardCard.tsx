import React from 'react';
import { Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import { Reward } from '../../interfaces/interfaces';
import styles from '../../styles/AmorphousRewardCard.module.css';
import Image from 'next/image';

interface AmorphousRewardCardProps {
    reward: Reward;
    isSelected?: boolean;
}

const AmorphousRewardCard: React.FC<AmorphousRewardCardProps> = ({ reward, isSelected }) => {
    return (
        <Grid item xs={6} sm={4} md={4} lg={2.2}>
            <Card
                sx={{ textAlign: 'center', border: isSelected ? '1px solid #42a5f5' : null }}
            >
                <div className={styles.cardContentItem}>
                    <Typography color="tertiary.dark" className={styles.rewardName}>
                        {reward.name}
                    </Typography>
                </div>
                <CardContent>
                    <Image
                        src={`/images/consumables/${reward.name.replace(/ /g, '_').replace(/'/g, '_').toLowerCase()}.png`}
                        alt={reward.name}
                        className={styles.rewardImage}
						width={60}
						height={60}
						quality={100}
                    />
                </CardContent>
                <CardActions className={styles.rewardCardActions}>
                    <Typography color='tertiary.main' className={styles.rewardDropRate}>
                        {reward.drop_rate * 100} %
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AmorphousRewardCard;