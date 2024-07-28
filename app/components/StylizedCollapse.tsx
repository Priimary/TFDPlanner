import React, { useState } from 'react';
import { Collapse, IconButton, Typography, Card, CardContent, CardHeader } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

interface StylizedCollapseProps {
    header: string;
    children: React.ReactNode;
}
interface ExpandMoreProps {
    expand?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: React.ReactNode;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    color: theme.palette.primary.dark,
}));

const StylizedCollapse: React.FC<StylizedCollapseProps> = ({ header, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleExpandClick = () => {
        setIsOpen(!isOpen);
    };

    return (
		<Card>
			<CardHeader
				title={
					<Typography sx={{color: 'primary.dark', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '18px'}}>{header}</Typography>
				}
				action={
					<ExpandMore
						expand={isOpen}
						onClick={handleExpandClick}
						aria-expanded={isOpen}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				}
				sx={{
					backgroundColor: '#15171c',
					'& .MuiCardHeader-action': {
						alignSelf: 'center'
					}
				}}
			/>
			<Collapse in={isOpen} timeout="auto" unmountOnExit>
				<CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'30px'}}>
					{children}
				</CardContent>
			</Collapse>
		</Card>
    );
};

export default StylizedCollapse;