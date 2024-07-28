"use client";
import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, CellClassParams } from "ag-grid-community";
import CustomHeaderGroup from "./CustomHeaderGroup";
import { getElementTextColor } from "../../utils/stylesUtils";

interface VoidMissionsGridProps {
	data: any[];
  }

const VoidMissionsGrid: React.FC<VoidMissionsGridProps> = ({ data }) => {
	const gridRef = useRef<any>(null);
	const [columnDefs, setColumnDefs] = useState([
		{
			headerName: 'Custom Header Group',
			headerGroupComponent: CustomHeaderGroup,
			headerGroupComponentParams: {
				api: () => gridRef.current.api,
			},
			children: [
				{ field: 'location', headerName: 'Location', width: 250, flex:0},
				{ field: 'type', headerName: 'Type'},
				{
					field: 'element',
					headerName: 'Element',
					cellStyle: (params: CellClassParams) => ({
						color: getElementTextColor(params.value)
					})
				},
				{ field: 'difficulty', headerName: 'Difficulty'},
				{ field: 'bonus', headerName: 'Bonus', width: 200, flex: 0 },
				{ 
					field: 'monomer', 
					headerName: 'Monomer', 
					/*floatingFilterComponent: NumberFloatingFilterComponent,
					floatingFilterComponentParams: {
						api: () => gridRef.current.api,
					},*/
				},
				{ 
					field: 'polymer', 
					headerName: 'Polymer', 
					/*floatingFilterComponent: NumberFloatingFilterComponent,
					floatingFilterComponentParams: {
						api: () => gridRef.current.api,
					},*/
				},
				{ 
					field: 'organic',
					headerName: 'Organic', 
					/*floatingFilterComponent: NumberFloatingFilterComponent,
					floatingFilterComponentParams: {
						api: () => gridRef.current.api,
					},*/
				},
				{ 
					field: 'inorganic', 
					headerName: 'Inorganic',
					/*floatingFilterComponent: NumberFloatingFilterComponent,
					floatingFilterComponentParams: {
						api: () => gridRef.current.api,
					},*/
				}
			]
		}	
	]);
	const gridStyle = useMemo(() => ({ height: "600px", width: "100%" }), []);

	const defaultColDef: ColDef = useMemo(() => ({
		filter: true,
		floatingFilter: true,
		flex: 1,
		suppressHeaderFilterButton: true,
		suppressFloatingFilterButton: true,
	}), []);

	return (
		<div style={gridStyle} className="ag-theme-quartz-dark">
			<AgGridReact
				ref={gridRef}
				rowData={data}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowSelection={undefined}
				groupHeaderHeight={60}	
			/>
		</div>
	);
};

export default VoidMissionsGrid;