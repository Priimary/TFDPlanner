import Header from './components/Header';
import Footer from './components/Footer'
import './styles/globals.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material';


interface RootLayoutProps {
	children: React.ReactNode;
}
export const metadata = {
	title: 'The First Descendant Planner & Database - Plan your build and the resources you want in TFD',
	description: "TFD Planner provides an extensive Database for The First Descendant, including Descendants and Weapons builders, Void Shards planners, and Resources trackers. Get the most out of your game with tools designed to streamline your strategy and enhance your gaming experience.",
	icons: {
		icon: '/favicon.png'
	},
	verification: {
		google: "vfJ-Ksmzv2WzYQ361gV6vHZcH9GZSoqHhctdy7EN-IY"
	}
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body>
				<ThemeProvider theme={theme}>
                	<Header />
					<main style={{flex: '1'}}>
						{children}
					</main>
					<Footer />
				</ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;