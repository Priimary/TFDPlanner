import {Box, Typography} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CraftDisplayProps{
	craft: any[];
}

const CraftDisplay: React.FC<CraftDisplayProps> = ({craft}) => {
	const router = useRouter();

	const handleRedirectClick = (url: string) => {
		router.push(url);
	}

	return(
		<Box sx={{display: 'flex', gap: '50px'}}>
			{craft.map((item, index) => (
				<Box
					key={index}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						border: '1px solid #42a5f5',
						borderRadius: '10px',
						flex: 1,
						cursor: 'pointer',
						boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
					}}
					onClick={() => handleRedirectClick(`/consumables/${item.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '_')}`)}
				>
					<Image 
						src={`/images/consumables/${item.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '_').replace(/:/g, '_')}.png`}
						alt={item.name}
						width={80}
						height={80}
					/>
					<Box 
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							padding: '5px',
							boxSizing: 'border-box',
							backgroundColor: '#101219',
							textAlign: 'center',
							borderRadius: '0 0 10px 10px',
							height: '50px',
						}}
					>
						<Typography sx={{color: 'tertiary.dark', fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>x{item.value} {item.name}</Typography>
					</Box>
				</Box>
			))}
		</Box>
	);
}

export default CraftDisplay;