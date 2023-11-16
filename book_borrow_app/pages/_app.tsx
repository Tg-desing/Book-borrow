import React, { useState, createContext, SetStateAction } from 'react';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';

interface IGlobalContext {
	username: string;
	setUsername: React.Dispatch<SetStateAction<string>>;
	accessToken: string;
	setAccessToken: React.Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<IGlobalContext>({});

function MyApp({ Component, pageProps }: AppProps) {
	const [username, setUsername] = useState<string>('');
	const [accessToken, setAccessToken] = useState<string>('');
	const value = {
		username: username,
		setUsername: setUsername,
		accessToken: accessToken,
		setAccessToken: setAccessToken,
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
