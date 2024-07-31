import { Box, Typography } from "@mui/material";

interface DescendantTooltipContentProps{
	title: string;
	description: string;
	arche_type: string;
	element_type: string;
	skill_type: string;
}
const DescendantTooltipContent: React.FC<DescendantTooltipContentProps> = ({description, title, arche_type, element_type, skill_type}) => {
	return(
		<Box sx={{display: 'flex', flexDirection: 'column'}}>
			<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
				<Box sx={{flex: 1}}>
					<Typography sx={{color: 'primary.dark', fontSize: '20px', fontWeight: 'bold'}}>{title}</Typography>
				</Box>
				<Box>
					<Typography sx={{color: 'tertiary.dark', fontWeight: 'bold'}}>{skill_type}</Typography>
				</Box>
			</Box>
			<Box sx={{fontSize: '14px', borderBottom: '1px solid #42a5f5'}}>
				<Typography sx={{fontSize: '14px', marginBottom: '5px'}}>{description}</Typography>
			</Box>
			<Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px'}}>
				<Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
					<Typography sx={{ fontWeight: 'bold', flex: 1}}>Element</Typography>
					<Typography sx={{ color: "tertiary.dark"}}>{element_type}</Typography>
				</Box>
				<Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
					<Typography sx={{ fontWeight: 'bold', flex: 1}}>Arche</Typography>
					<Typography sx={{ color: "tertiary.dark"}}>{arche_type || 'N/A'}</Typography>
				</Box>
			</Box>
		</Box>
	)
};

export default DescendantTooltipContent;