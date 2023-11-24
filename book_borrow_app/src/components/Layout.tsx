import { ReactNode, useContext, useEffect } from 'react';
import classes from '../styles/layout.module.css';
import { GlobalContext } from '../pages/_app';
import { useRouter } from 'next/router';
import { getJwtFromCookie } from '../jwt/jswontoken';
import apiIp from '@/assets/apiKey';

type layoutType = {
	children: ReactNode;
};

function isBoolean(result: any): result is boolean {
	return typeof result === 'boolean';
}

function Layout(props: layoutType) {
	const context = useContext(GlobalContext);
	const router = useRouter();
	const setIsLogin = context.setIsLogin;
	const setUsername = context.setUsername;
	const isLogin = context.isLogin;
	const username = context.username;

	// useEffect(() => {
	// 	async function getAuthentication() {
	// 		try {
	// 			const jwtValue = getJwtFromCookie();
	// 			const response = await fetch(`${apiIp}/auth/auth`, {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({
	// 					authentication: jwtValue,
	// 				}),
	// 			});

	// 			const { result, username } = await response.json();
	// 			console.log(result);
	// 			if (isBoolean(result)) {
	// 				setIsLogin(result);
	// 			}

	// 			if (typeof username === 'string') {
	// 				setUsername(username);
	// 			}
	// 		} catch (err) {
	// 			window.alert(err);
	// 		}
	// 	}

	// 	getAuthentication();
	// }, [isLogin]);

	function onClickLoginHandler() {
		router.push({
			pathname: '/auth/login',
		});
	}

	function onClickSignupHandler() {
		router.push({
			pathname: '/auth/signup',
		});
	}

	function onClickAddBookHandler() {
		router.push({
			pathname: '/book/add',
		});
	}

	return (
		<>
			<header className={classes.header}>
				<div className={classes.logo}>
					<h1>Book Share</h1>
					<span>Borrow any book!</span>
				</div>
				{!isLogin && (
					<div className={classes.menu}>
						<button className={classes.button} onClick={onClickLoginHandler}>
							Login
						</button>
						<button className={classes.button} onClick={onClickSignupHandler}>
							Sign up!
						</button>
					</div>
				)}

				{isLogin && (
					<div className={classes.profile}>
						<h1>{username}</h1>
						<button className={classes.button} onClick={onClickAddBookHandler}>
							Add
						</button>
					</div>
				)}
			</header>
			<main>{props.children}</main>
		</>
	);
}

export default Layout;
