"use client"
import { createTheme} from '@mui/material/styles';

interface CustomPalette {
	tertiary: {
		main: string;
		light: string;
		dark: string;
		contrastText: string;
	};
}

declare module '@mui/material/styles' {
	interface Palette extends CustomPalette {}
	interface PaletteOptions extends CustomPalette {}
}

const theme = createTheme({
	components:{
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#242a39',
					color: 'white'
				}
			}
		}
	},
	palette: {
		primary: {
			main: '#1976d2',
			light: '#e3f2fd',
			dark: '#42a5f5',
			contrastText: '#fff',
		},
		secondary: {
			main: '#ab47bc',
			light: '#f3e5f5',
			dark: '#ce93d8',
			contrastText: '#fff',
		},
		tertiary: {
			main: '#ffa726',
			light: '#ffb74d',
			dark: '#f57c00',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: "'Nunito Variable', sans-serif", 
	},
});

export default theme;