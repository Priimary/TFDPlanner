import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Dialog, Box } from '@mui/material';
import styles from '../../styles/RoadmapCard.module.css';

const RoadmapCard: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card className={styles.card} style={{ maxWidth: '600px', margin: 'auto' }}>
				<Box className={styles.card_header}>
					<Typography sx={{color: 'tertiary.dark', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase'}}>
                        ROADMAP
                    </Typography>
				</Box>
                <CardContent className={styles.card_content}>
                    <CardMedia
                        component="img"
                        src="/images/roadmap.png"
                        alt="Roadmap"
                        style={{width: '100%', cursor: 'pointer', borderRadius: '5px' }}
                        onClick={handleClickOpen}
                    />
                </CardContent>
            </Card>
            
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <CardMedia
                    component="img"
                    src="/images/roadmap.png"
                    alt="Roadmap Large View"
                />
            </Dialog>
        </>
    );
};

export default RoadmapCard;