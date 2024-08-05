"use client";
import React, { useState, useCallback, useEffect } from 'react';
import DescendantsGrid from '../components/Descendants/DescendantsGrid';
import DescendantsFilters from '../components/Descendants/DescendantsFilters';
import DescendantsSearchbar from '../components/Descendants/DescendantsSearchbar';
import descendantsData from "../../data/descendants.json";
import { Descendant } from '../interfaces/interfaces';
import styles from '../styles/Descendants.module.css';
import { debounce } from 'lodash';

const DescendantsPage: React.FC = () => {
    const descendants: Descendant[] = descendantsData as Descendant[];
    const [filteredItems, setFilteredItems] = useState<Descendant[]>(descendants);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<any>({});

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            applyFiltersAndSearch(searchTerm, filters);
        }, 300),
        [filters]
    );

    const debouncedFilterChange = useCallback(
        debounce((filters: any) => {
            applyFiltersAndSearch(searchTerm, filters);
        }, 300),
        [searchTerm]
    );

    const applyFiltersAndSearch = (searchTerm: string = '', filters: any = {}) => {
        let result = descendants;

        if(filters.element){
            result = result.filter(descendant => descendant.descendant_element === filters.element);
        }
        if(filters.rarity && filters.rarity !== 'all'){
            const isUltimate = filters.rarity === 'ultimate';
            result = result.filter(descendant =>
                isUltimate ? descendant.descendant_name.toLowerCase().includes('ultimate') : !descendant.descendant_name.toLowerCase().includes('ultimate')
            );
        }

        if(searchTerm){
            result = result.filter(descendant =>
                Object.values(descendant).some(val =>
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
                    <DescendantsFilters onFilterChange={handleFilterChange} />
                </div>
                <div className={styles.searchbar}>
                    <DescendantsSearchbar onSearch={handleSearch} />
                </div>
            </div>
            <div className={styles.grid_container}>
                <DescendantsGrid items={filteredItems} />
            </div>
        </div>
    );
};

export default DescendantsPage;