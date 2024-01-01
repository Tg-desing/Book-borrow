import React, {
	useState,
	createContext,
	SetStateAction,
	useEffect,
} from 'react';
import Layout from '@/src/components/Layout';
import type { AppContext, AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { getJwtFromCookie } from '../jwt/jswontoken';

//css
import '../tailwindcss/tailwind.css';
import '../styles/global.css';

//apikey
import apiKey from '../../assets/apiKey';
import App from 'next/app';

interface IGlobalContext {
	username?: string;
	setUsername?: React.Dispatch<SetStateAction<string>>;
	isLogin?: boolean;
	setIsLogin?: React.Dispatch<SetStateAction<boolean>>;
	isManager?: boolean;
	setIsManager?: React.Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<IGlobalContext>({});

function MyApp({ Component, pageProps }: AppProps) {
	const [username, setUsername] = useState<string>('');
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [isManager, setIsManager] = useState<boolean>(false);

	const value = {
		username: username,
		setUsername: setUsername,
		isLogin: isLogin,
		setIsLogin: setIsLogin,
		isManager: isManager,
		setIsManager: setIsManager,
	};

	return (
		<GlobalContext.Provider value={value}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GlobalContext.Provider>
	);
}

export default MyApp;
