import { ConsumableDrop } from "../interfaces/interfaces";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


interface ObtentionDisplayProps{
	obtention: ConsumableDrop[];
}
const ObtentionDisplay: React.FC<ObtentionDisplayProps> = ({obtention}) => {
	const sortedObtention = [...obtention].sort((a, b) => {
		if(a.recommended && !b.recommended){
		  return -1;
		}
		if(!a.recommended && b.recommended){
		  return 1;
		}
		return 0;
	});

	return(
		<Box>
			<TableContainer component={Paper} sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
				<Table aria-label="simple table">
					<TableHead  sx={{backgroundColor: '#101219'}}>
						<TableRow >
							<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}}>Location</TableCell>
							<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}} align="right">Info Drop</TableCell>
						</TableRow>
					</TableHead>
        			<TableBody sx={{backgroundColor: '#2b2f38'}}>
						{sortedObtention.map((item) => (
							<TableRow
								key={item.location}
								sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
							>
								<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark', textTransform: 'uppercase', fontWeight: 'bold'}}>{item.recommended ? <Badge title={"Recommended"}><StarIcon sx={{width: '18px'}}/></Badge> : null}{item.location}</TableCell>
								<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark'}} align="right">{item.type}</TableCell>
							</TableRow>
						))}
        			</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ObtentionDisplay;

