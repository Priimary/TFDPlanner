import {Card, Box, Typography, CardContent} from '@mui/material';
import { weaponParts } from '../../utils/globalVariables';
import CraftDisplay from '../CraftDisplay';

interface WeaponCraftDisplayProps{
	name: string;
	type: string;
}

const WeaponCraftDisplay: React.FC<WeaponCraftDisplayProps> = ({name}) => {
	const partOptions = weaponParts.map(part => ({
		name: `${name} ${part}`,
		value: 1
	}));
	
	return(
		<Card>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					height: '40px',
					backgroundColor: '#15171c'
				}}
			>
				<Box sx={{ flex: '1', textAlign: 'center' }}>
					<Typography variant='h4' sx={{ color: 'primary.dark', fontWeight: 'bold', fontSize: '18px' }}>
						CRAFT
					</Typography>
				</Box>
			</Box>
			<CardContent>
				<CraftDisplay craft={partOptions}/>
			</CardContent>
		</Card>
	);
};

export default WeaponCraftDisplay;