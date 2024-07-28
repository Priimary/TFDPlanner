"use client";
import React, { useState, useCallback, useEffect } from 'react';
import ConsumablesGrid from '../components/Consumables/ConsumablesGrid';
import ConsumablesFilters from '../components/Consumables/ConsumablesFilters';
import ConsumablesSearchbar from '../components/Consumables/ConsumablesSearchbar';
import consumablesData from '../../data/consumables.json';
import { Consumable } from '../interfaces/interfaces';
import styles from '../styles/consumables.module.css';
import { consumablesTypeMapping } from '../utils/globalVariables';
import { debounce } from 'lodash';

const ConsumablesPage: React.FC = () => {
    const consumables: Consumable[] = consumablesData;
    const [filteredItems, setFilteredItems] = useState<Consumable[]>(consumables);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<any>({ consumables_type: 'Core Material', consumables_tier: 'All' });

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
        let result = consumables;

        if(filters.consumables_tier && filters.consumables_tier !== 'All'){
            result = result.filter(item => item.tier === filters.consumables_tier);
        }
        if(filters.consumables_type){
			const mappedType = consumablesTypeMapping[filters.consumables_type] || filters.consumables_type;
            result = result.filter(item => item.type === mappedType);
        }

        if(searchTerm){
            result = result.filter(item =>
                Object.values(item).some(val =>
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
        <div className={styles.main} style={{gap: '30px'}}>
            <div className={styles.filters_container} style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                <div className={styles.filters}>
                    <ConsumablesFilters onFilterChange={handleFilterChange} />
                </div>
                <div className={styles.searchbar}>
                    <ConsumablesSearchbar onSearch={handleSearch} />
				</div>
            </div>  
            <div className={styles.grid_container}>
                <ConsumablesGrid items={filteredItems} />
            </div>
        </div>
    );
};

export default ConsumablesPage;