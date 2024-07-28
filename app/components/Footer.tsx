import React from 'react';
import Logo from './Logo';
import NavBar from './NavBar';
import {Box, Typography} from '@mui/material'

const Footer: React.FC = () => {
    return (
        <footer style={{display: 'flex',flexDirection: 'column', backgroundColor: '#101219' }}>
			<Box sx={{display: 'flex',paddingTop: '10px'}}>
				<Box sx={{flex: 1}}>
					<NavBar orientation={"column"}/>
				</Box>
			</Box>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px'}}>
				<Box sx={{width: '20%', height: '100%'}}>
					<Logo />
				</Box>
				<Box>
					<Typography color='primary.dark' sx={{fontSize: '14px'}}>This site is not affiliated with or endorsed by NEXON Games Co., Ltd.</Typography>
				</Box>
			</Box>
        </footer>
    );
};

export default Footer;