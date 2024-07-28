import Header from './components/Header';
import Footer from './components/Footer'
import './styles/globals.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material';


interface RootLayoutProps {
	children: React.ReactNode;
}
export const metadata = {
	title: 'TFD Planner',
	description: 'Everything you need to know about the game The First Descendant made by Nexon'
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body>
				<ThemeProvider theme={theme}>
                	<Header />
					{children}
					<Footer />
				</ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;