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
				{ field: 'type', headerName: 'Type', flex: 1, minWidth: 100},
				{
					field: 'element',
					headerName: 'Element',
					minWidth: 100,
					flex: 1,
					cellStyle: (params: CellClassParams) => ({
						color: getElementTextColor(params.value)
					})
				},
				{ field: 'difficulty', headerName: 'Difficulty', flex: 1, minWidth: 100},
				{ field: 'bonus', headerName: 'Bonus', width: 200, flex: 0},
				{ 
					field: 'monomer', 
					headerName: 'Monomer', 
					flex: 1,
					minWidth: 100
				},
				{ 
					field: 'polymer', 
					headerName: 'Polymer', 
					flex: 1,
					minWidth: 100
				},
				{ 
					field: 'organic',
					headerName: 'Organic', 
					flex: 1,
					minWidth: 100
				},
				{ 
					field: 'inorganic', 
					headerName: 'Inorganic',
					flex: 1,
					minWidth: 100
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
		suppressMovable: true,
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