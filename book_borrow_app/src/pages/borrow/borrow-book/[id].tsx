import { getIsJwtAuthentication } from '@/src/jwt/jswontoken';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Container,
	Box,
	Paper,
	Stack,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../_app';
import { useRouter } from 'next/router';
import apiIp from '@/assets/apiKey';

interface Book {
	bookName: string;
	category: string;
	url: string;
	borrower: string;
	startDate: Date;
	endDate: Date;
	description: string;
}
export default function BookBorrow() {
	const context = useContext(GlobalContext);
	const isLogin = context.isLogin;
	const isManager = context.isManager;
	const setIsLogin = context.setIsLogin!;
	const setIsManager = context.setIsManager!;
	const username = context.username;
	const setUsername = context.setUsername!;
	const router = useRouter();

	const { id } = router.query;
	const decodedId = id ? decodeURIComponent(id as string) : ' ';

	const [bookData, setBookData] = useState<Book>();

	const [isRented, setIsRented] = useState<boolean>(false);

	useEffect(() => {
		async function loadingData() {
			const authResult = await getIsJwtAuthentication();
			if (authResult.isLogin) {
				if (isLogin !== authResult.isLogin) {
					setIsLogin(authResult.isLogin);
				}
				if (isManager !== authResult.isManager) {
					setIsManager(authResult.isManager);
				}
				if (username === authResult.username) {
					setUsername(authResult.username);
				}
				const response = await fetch(`${apiIp}/book/load`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						bookName: decodedId,
					}),
				});
				const result = await response.json();

				if (result.result) {
					const bookName: string = result.bookData?.bookName;
					const category: string = result.bookData?.category;
					const url: string = result.bookData?.image;
					const borrower: string = result.bookData?.borrower;
					const startDate: Date = new Date(result.bookData?.start_date);
					const endDate: Date = new Date(result.bookData?.end_date);
					const description: string = result.bookData?.description;
					setIsRented(borrower ? true : false);
					console.log(isRented);
					setBookData({
						bookName: bookName,
						category: category,
						url: url,
						borrower: borrower,
						startDate: startDate,
						endDate: endDate,
						description: description,
					});
				} else {
					window.alert('Error happend loading bookData' + result.err);
				}
			} else {
				setIsLogin(authResult.isLogin);
				setIsManager(authResult.isManager);
				window.alert('You have no access!');
				router.push('/');
			}
		}

		loadingData();

		async function writingBorrower() {
			const response = await fetch(`${apiIp}/book/borrow`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: username,
					bookName: bookData?.bookName,
				}),
			});

			const { result } = await response.json();
			if (result) {
				window.alert('Rent success');
				router.push('/');
			} else {
				window.alert('Error happend. failed to rent. Try again');
				setIsRented(false);
			}
		}

		async function returningBook() {
			const response = await fetch(`${apiIp}/book/return`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					bookName: bookData?.bookName,
				}),
			});

			const { result } = await response.json();
			if (result) {
				window.alert('Return success');
				router.push('/');
			} else {
				window.alert('Error happend. failed to return. Try again');
				setIsRented(true);
			}
		}

		if (isRented && !bookData?.borrower) {
			writingBorrower();
		}

		if (!isRented && bookData?.borrower) {
			returningBook();
		}
	}, [isLogin, isManager, isRented]);

	function onClickBorrowHandler() {
		setIsRented(true);
	}

	function onClickReturnHandler() {
		setIsRented(false);
	}

	const referenceDate = new Date('Thu Jan 01 1970 09:00:00 GMT+0900');
	return (
		<>
			<Container maxWidth='xl' sx={{ position: 'relative', mt: 10 }}>
				<Box
					sx={{
						bgcolor: '#cfe8fc',
						height: '90vh',
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							top: '10%',
							left: '5%',
							width: '90%',
							height: '80%',
						}}
					>
						<Paper role='dialog' variant='outlined' sx={{ height: '20%' }}>
							<Typography
								variant='h2'
								sx={{ textAlign: 'center', paddingTop: '30px' }}
							>
								{bookData?.bookName}
							</Typography>
						</Paper>
						<Paper
							role='dialog'
							variant='outlined'
							sx={{ height: '80%', position: 'relative' }}
						>
							<Box
								sx={{
									position: 'absolute',
									top: '5%',
									left: '5%',
									width: '90%',
								}}
							>
								<Stack direction='row'>
									<Paper
										variant='outlined'
										sx={{ width: '40%', heigth: '80%' }}
									>
										<CardMedia
											component='img'
											style={{ width: '100%', objectFit: 'cover' }}
											image={bookData?.url}
											alt={bookData?.bookName}
										></CardMedia>
									</Paper>
									<CardContent sx={{ width: '60%', height: '80%' }}>
										<Card role='dialog' sx={{ mb: '50px' }}>
											<Typography variant='h3' component='div' align='center'>
												카테고리
											</Typography>
											<Typography variant='h5' component='div' align='center'>
												{bookData?.category}
											</Typography>
										</Card>
										<Card role='dialog' sx={{ mb: '50px' }}>
											<Typography variant='h3' component='div' align='center'>
												설명
											</Typography>
											<Typography variant='h5' component='div' align='center'>
												{bookData?.description}
											</Typography>
										</Card>
										<Card role='dialog' sx={{ mb: '50px' }}>
											<Typography variant='h3' component='div' align='center'>
												대여 시작일
											</Typography>
											<Typography variant='h4' component='div' align='center'>
												{bookData?.startDate?.getTime() !==
												referenceDate.getTime()
													? bookData?.startDate?.toString()
													: '-'}
											</Typography>
										</Card>
										<Card role='dialog' sx={{ mb: '50px' }}>
											<Typography variant='h3' component='div' align='center'>
												반납 예정일
											</Typography>
											<Typography variant='h4' component='div' align='center'>
												{bookData?.endDate?.getTime() !==
												referenceDate.getTime()
													? bookData?.endDate?.toString()
													: '-'}
											</Typography>
										</Card>
										<Box role='dialog'>
											<Stack direction='row' sx={{ position: 'relative' }}>
												<Button
													onClick={onClickBorrowHandler}
													sx={{ position: 'absolute', top: '10%', left: '10%' }}
													disabled={isRented}
													size='large'
													variant='outlined'
												>
													대여하기
												</Button>
												<Button
													onClick={onClickReturnHandler}
													sx={{
														position: 'absolute',
														top: '10%',
														right: '10%',
													}}
													variant='outlined'
													size='large'
													disabled={!isRented}
												>
													반납하기
												</Button>
											</Stack>
										</Box>
									</CardContent>
								</Stack>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Container>
		</>
	);
}
