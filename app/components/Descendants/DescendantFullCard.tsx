import { Box, Card, CardMedia, Tooltip, Typography, Slider} from "@mui/material";
import { Skill } from "../../interfaces/interfaces";
import DescendantTooltipContent from './DescendantTooltipContent';
import Image from "next/image";

interface DescendantFullCardProps{
	header: string;
	description?: string;
	image_url: string;
	children?: React.ReactNode;
	skills: Skill[];
	stats: { stat_type: string; stat_value: number }[];
	onLevelChange: (event: Event, newValue: number | number[]) => void;
    selectedLevel: number;
}

const DescendantFullCard: React.FC<DescendantFullCardProps> = ({header, description, image_url, children, skills, stats, selectedLevel, onLevelChange}) => {
	return(
		<Card sx={{display: 'flex', padding: '15px', gap: '35px', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
			<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', width: '75%'}}>
				<Box sx={{display: 'flex', borderBottom: '1px solid #42a5f5'}}>
					<Typography variant='h1' sx={{textTransform: 'uppercase', fontSize: '36px', fontWeight: 'bold'}} color={'primary.dark'}>{header}</Typography>
				</Box>
				<Box>
					{description && (
						<Box>
							<Typography paragraph sx={{fontWeight: '600', color: 'tertiary.dark'}}>{description}</Typography>
						</Box>
					)}
					<Box sx={{marginTop: '50px'}}>
						{children}
					</Box>
				</Box>
			</Box>


			<Box sx={{width: '25%'}}>
				<Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(21, 23, 28)', borderRadius: '10px', padding: '15px', gap: '10px'}}>
					<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<CardMedia
							component='img'
							src={image_url}
							alt={header}
							sx={{width: '80%'}}
						/>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
						<Typography sx={{color: 'primary.dark', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '20px'}}>{header}</Typography>
					</Box>
					<Box sx={{display: 'flex', gap:'10px', justifyContent: 'center'}}>
						{skills && skills.map((skill, index) => (
							<Tooltip
								key={index}
								title={
									<DescendantTooltipContent 
										title={skill.skill_name} 
										description={skill.skill_description} 
										element_type={skill.element_type} 
										skill_type={skill.skill_type}
										arche_type={skill.arche_type}
									/>
								}
								arrow
								placement='top'
							>
								<Box sx={{display: 'flex',border:'1px solid white', borderRadius: '5px'}}>
									<Image src={skill.skill_image_url} alt={skill.skill_name} width={40} height={40}/>
								</Box>
							</Tooltip>
						))}
					</Box>
					<Box>
						<Slider
							value={selectedLevel}
							min={1}
							max={40}
							step={1}
							onChange={onLevelChange}
							valueLabelDisplay="auto"
							aria-labelledby="level-slider"
							sx={{color: 'tertiary.dark'}}
						/>
					</Box>
					<Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
						<Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
							<Typography sx={{ color: "primary.dark", fontWeight: 'bold', textTransform: 'uppercase', flex: 1}}>Level</Typography>
							<Typography sx={{ color: "tertiary.dark"}}>{selectedLevel}</Typography>
						</Box>
						{stats.map((stat, index) => (
							<Box key={index} sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
								<Typography sx={{ color: "primary.dark", fontWeight: 'bold', textTransform: 'uppercase', flex: 1}}>{stat.stat_type}</Typography>
								<Typography sx={{color: "tertiary.dark"}}>{stat.stat_value}</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Card>
	);
}

export default DescendantFullCard;