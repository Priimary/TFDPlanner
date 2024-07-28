"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

interface NavBarProps{
	orientation: 'row' | 'column';
}
const pages = [
	{name: 'Descendants', href: '/descendants'},
	{name: 'Consumables', href: '/consumables'},
	{name: 'Void Missions', href: '/void-missions'},
	{name: 'Weapons', href: '/weapons'},
];

const NavBar: React.FC<NavBarProps> = ({orientation}) => {
	const router = useRouter();

	const handleButtonNavigate = (url: string) => {
		router.push(url);
	}

    return (
        <nav className="nav" style={{display: 'flex', flexDirection: orientation}}>
			{pages.map((page, index) => (
				<Button sx={{color: 'white', fontWeight: 'bold'}} onClick={() => handleButtonNavigate(page.href)} key={index}>
					{page.name}
				</Button>
			))}
        </nav>
    );
};

export default NavBar;