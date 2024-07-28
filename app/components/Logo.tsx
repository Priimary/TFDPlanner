import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.png';
import styles from '../styles/logo.module.css';
import { Typography } from '@mui/material';

const Logo: React.FC = () => {
    return (
        <Link href="/" style={{textDecoration: 'none', height: '100%', display: 'flex', width: '100%'}}>
			<div className={styles.container}>
				<Image src={logo} alt="Logo" width={30} height={30} />
				<Typography variant="h6" className={styles.text}>FD PLANNER</Typography>
			</div>
        </Link>
    );
};

export default Logo;