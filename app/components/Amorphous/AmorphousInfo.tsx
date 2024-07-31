import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import voidMissionsData from '../../../data/void_missions.json';
import { Amorphous, VoidMission } from "../../interfaces/interfaces";
import { getMaterialsForAmorphous } from "../../utils/globalVariables";


interface AmorphousInfoProps {
	amorphous: Amorphous;
}

const AmorphousInfo: React.FC<AmorphousInfoProps> = ({ amorphous,}) => {
	const missionsData = voidMissionsData as VoidMission[];
	const materials = getMaterialsForAmorphous(amorphous, missionsData);
	const materialsString = materials.map(material => `${material.name}: ${material.value}`).join(', ');
	
	return(
		<Box>
			<TableContainer component={Paper} sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
				<Table aria-label="simple table">
					<TableHead  sx={{backgroundColor: '#101219'}}>
						<TableRow >
							<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}}>Drop Location</TableCell>
							<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}}>Drop Info</TableCell>
							<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}}>Open Location</TableCell>
							{materialsString && (<TableCell sx={{textTransform: 'uppercase', color: 'primary.dark', fontWeight: 'bold', fontSize: '16px', borderColor: 'primary.dark'}}>Open Materials</TableCell>)}
						</TableRow>
					</TableHead>
        			<TableBody sx={{backgroundColor: '#2b2f38'}}>
						<TableRow>
							<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark'}}>{amorphous.drop_location}</TableCell>
							<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark'}}>{amorphous.drop_location_type}</TableCell>
							<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark'}}>{amorphous.open_location}</TableCell>
							{materialsString && (<TableCell sx={{color: 'tertiary.dark', borderColor: 'primary.dark'}}>{materialsString}</TableCell>)}
						</TableRow>
        			</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default AmorphousInfo;