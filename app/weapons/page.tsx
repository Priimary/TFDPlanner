"use client";
import React, { useState, useCallback, useEffect } from 'react';
import WeaponsGrid from '../components/Weapons/WeaponsGrid';
import WeaponsFilters from '../components/Weapons/WeaponsFilters';
import WeaponsSearchbar from '../components/Weapons/WeaponsSearchbar';
import weaponsData from "../../data/weapons.json";
import { Weapon } from '../interfaces/interfaces';
import styles from '../styles/Weapons.module.css';
import { debounce } from 'lodash';

const WeaponsPage: React.FC = () => {
    const weapons: Weapon[] = weaponsData;
    const [filteredItems, setFilteredItems] = useState<Weapon[]>(weapons);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<any>({});

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            applyFiltersAndSearch(searchTerm);
        }, 300),
        []
    );

    const debouncedFilterChange = useCallback(
        debounce((filters: any) => {
            applyFiltersAndSearch(searchTerm, filters);
        }, 300),
        [searchTerm]
    );

    const applyFiltersAndSearch = (searchTerm: string = '', filters: any = {}) => {
        let result = weapons;

        if (filters.weapons_rounds_type && filters.weapons_rounds_type !== 'null Rounds') {
            result = result.filter(weapon => weapon.weapon_rounds_type === filters.weapons_rounds_type);
        }
        if (filters.weapons_tier && filters.weapons_tier !== 'All') {
            result = result.filter(weapon => weapon.weapon_tier === filters.weapons_tier);
        }
        if (filters.weapons_type && filters.weapons_type !== 'All') {
            result = result.filter(weapon => weapon.weapon_type === filters.weapons_type);
        }

        if (searchTerm) {
            result = result.filter(weapon =>
                Object.values(weapon).some(val =>
                    val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        setFilteredItems(result);
    };

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        debouncedSearch(searchTerm);
    };

    const handleFilterChange = (filters: any) => {
        setFilters(filters);
        debouncedFilterChange(filters);
    };

    useEffect(() => {
        applyFiltersAndSearch(searchTerm, filters);
    }, [searchTerm, filters]);

    return (
        <div className={styles.main}>
            <div className={styles.filters_container}>
                <div className={styles.filters}>
                    <WeaponsFilters onFilterChange={handleFilterChange} />
                </div>
                <div className={styles.searchbar}>
                    <WeaponsSearchbar onSearch={handleSearch} />
                </div>
            </div>	
            <div className={styles.grid_container}>
                <WeaponsGrid items={filteredItems} />
            </div>
        </div>
    );
};

export default WeaponsPage;