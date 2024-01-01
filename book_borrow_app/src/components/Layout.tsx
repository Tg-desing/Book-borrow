import { ReactNode, useContext, useEffect } from 'react';
import classes from '../styles/layout.module.css';
import { GlobalContext } from '../pages/_app';
import { useRouter } from 'next/router';
import { getIsJwtAuthentication, getRidOfAuthToken } from '../jwt/jswontoken';
import Profile from './Profile';
import { styled } from '@mui/material/styles';

import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
	Paper,
	Stack,
} from '@mui/material';

type layoutType = {
	children: ReactNode;
};

function Layout(props: layoutType) {
	const context = useContext(GlobalContext);
	const router = useRouter();
	const setIsLogin = context.setIsLogin!;
	const setUsername = context.setUsername!;
	const isLogin = context.isLogin!;
	const username = context.username!;
	const isManager = context.isManager!;
	const setIsManager = context.setIsManager!;

	useEffect(() => {
		async function getAuthentication() {
			const result = await getIsJwtAuthentication();

			setIsLogin(result.isLogin);
			setIsManager(result.isManager);
			setUsername(result.username);
		}

		getAuthentication();
	}, [isLogin]);

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

	async function onClickLogoutHandler() {
		const result = await getRidOfAuthToken();
		setIsLogin(result.isLogin);
		setIsManager(result.isManager);
		setUsername(result.username);
		console.log('log out');
	}

	const pages = ['login', 'signup'];

	return (
		<>
			<AppBar position='static'>
				<Container
					maxWidth='x1'
					sx={
						{
							// backgroundColor: '#87CEEB',
						}
					}
				>
					<Toolbar disableGutters>
						<Typography
							variant='h3'
							noWrap
							component='a'
							href='#app-bar-with-responsive-menu'
							sx={{
								mr: 2,
								display: {
									xs: 'none',
									md: 'flex',
									position: 'relative',
									height: '100%',
								},
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
							onClick={() => {
								router.push('/');
							}}
						>
							CoMit Books!
						</Typography>
						{!isLogin && (
							<Box
								sx={{
									flexGrow: 1,
									display: { xs: 'none', md: 'flex' },
								}}
							>
								<Button
									key={'login'}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
									onClick={onClickLoginHandler}
								>
									Login
								</Button>
								<Button
									key={'login'}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
									onClick={onClickSignupHandler}
								>
									Sign up
								</Button>
							</Box>
						)}
						{isLogin && !isManager && (
							<>
								<Paper
									variant='elevation'
									sx={{
										position: 'absolute',
										width: '10%',
										height: '90%',
										right: 10,
										borderRadius: '30px',
									}}
								>
									<Stack direction='row'>
										<Button
											key={'logout'}
											sx={{
												my: 2,
												color: 'black',
												display: 'block',
												varinat: 'outlined',
												position: 'absolute',
												left: '10%',
											}}
											onClick={onClickLogoutHandler}
										>
											Log out
										</Button>
										<Profile username={username}></Profile>
									</Stack>
								</Paper>
							</>
						)}
						{isLogin && isManager && (
							<>
								<Paper
									variant='elevation'
									sx={{
										position: 'absolute',
										width: '10%',
										height: '90%',
										right: 10,
										borderRadius: '30px',
									}}
								>
									<Stack direction='row'>
										<Button
											key={'logout'}
											sx={{
												my: 2,
												color: 'black',
												display: 'block',
												varinat: 'outlined',
												position: 'absolute',
												left: '10%',
											}}
											onClick={onClickAddBookHandler}
										>
											Add
										</Button>
										<Profile username={username}></Profile>
									</Stack>
								</Paper>
							</>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<main>{props.children}</main>
		</>
	);
}

export default Layout;
