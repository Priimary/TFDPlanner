import { Box, Card, CardMedia, Typography} from "@mui/material";

import { getTierColor } from "../utils/globalVariables";
interface ItemCardProps{
	header: string;
	description: string;
	type: string;
	tier: string;
	image_url: string;
	children?: React.ReactNode;
}

const ItemCard: React.FC<ItemCardProps> = ({header, description, image_url, children, type, tier}) => {
	return(
		<Card sx={{display: 'flex', padding: '15px', gap: '35px', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
			<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', width: '80%'}}>
				<Box sx={{display: 'flex', borderBottom: '1px solid #42a5f5'}}>
					<Typography variant='h1' sx={{textTransform: 'uppercase', fontSize: '36px', fontWeight: 'bold'}} color={'primary.dark'}>{header}</Typography>
				</Box>
				<Box>
					<Box>
						<Typography paragraph sx={{fontWeight: '600', color: 'tertiary.dark'}}>{description}</Typography>
					</Box>
					<Box sx={{marginTop: '50px'}}>
						{children}
					</Box>
				</Box>
			</Box>
			<Box sx={{width: '20%'}}>
				<Box sx={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(21, 23, 28)', borderRadius: '10px', padding: '15px'}}>
					<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<CardMedia
							component='img'
							src={image_url}
							alt={header}
							sx={{width: '80%'}}
						/>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '10px'}}>
						<Typography sx={{color: 'primary.dark', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{header}</Typography>
						<Typography sx={{color: 'primary.dark', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{type}</Typography>
						<Typography sx={{color: getTierColor(tier), textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{tier}</Typography>
					</Box>
				</Box>
			</Box>
		</Card>
	);
}

export default ItemCard;