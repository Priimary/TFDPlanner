import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Skill } from '../../interfaces/interfaces';
import styles from '../../styles/DescendantSkillCard.module.css';
import Image from 'next/image';


interface DescendantSkillCardProps {
    skills: Skill[];
}

const DescendantSkillCard: React.FC<DescendantSkillCardProps> = ({ skills }) => {
    return (
        <Box className={styles.cards_container}>
            {skills.map((skill, index) => (
                <Card key={index} className={styles.card}>
					<div
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							backgroundColor: '#15171c'
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
							{skills && (
								<Image
									src={skill.skill_image_url}
									alt={skill.skill_name}
									width={40}
									height={40}
									quality={100}
								/>
							)}
						</div>

						<div style={{ flex: '1', textAlign: 'center' }}>
							<Typography component="div" className={styles.skill_name} sx={{ color: 'primary.dark' }}>
								{skill.skill_name}
							</Typography>
						</div>

						<div style={{ display: 'flex', justifyContent: 'center', flex: '0 0 auto', width: '40px'}}>
							<Image
								src={`/images/elements/${skill.element_type.toLowerCase()}.png`}
								alt={skill.element_type}
								width={30}
								height={30}
								quality={100}
							/>
						</div>
					</div>
                    <CardContent className={styles.card_content}>
						<Typography paragraph className={styles.skill_descrption} sx={{color: 'tertiary.dark'}}>
							Arche Type: {skill.arche_type}
						</Typography>
                        <Typography paragraph className={styles.skill_description} sx={{color: 'tertiary.dark'}}>
                            {skill.skill_description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default DescendantSkillCard;