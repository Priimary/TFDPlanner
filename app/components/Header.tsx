import React from 'react';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
			<div className={styles.logo_container}>
				<Logo />
			</div>
            <div className={styles.navbar_container}>
				<NavBar orientation={"row"}/>
			</div>
            <div className={styles.searchbar_container}>
				<SearchBar />
			</div>
        </header>
    );
};

export default Header;