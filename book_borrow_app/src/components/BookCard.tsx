import { useRouter } from 'next/router';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { getIsJwtAuthentication, getJwtFromCookie } from '../jwt/jswontoken';

import { isBoolean, isString } from '../typeguard/typeguard';
import apiIp from '@/assets/apiKey';
import { GlobalContext } from '../pages/_app';

type cardProps = {
	name: string;
	url: string;
	key: number;
	description: string;
};

enum ButtonType {
	Borrow,
	LookMore,
}

export default function BookCard(props: cardProps) {
	const name = props.name;
	const url = props.url;
	const key = props.key;
	const description = props.description;
	const router = useRouter();

	const context = React.useContext(GlobalContext);
	const isLogin = context.isLogin;

	function onClickButtonHandler(type: ButtonType) {
		if (isLogin) {
			if (type === ButtonType.Borrow) {
				router.push(`/borrow/borrow-book/${name}`);
			} else {
				router.push(`/borrow/book/${name}`);
			}
		} else {
			window.alert('You have to login first!');
			router.push('/auth/login');
		}
	}

	return (
		<Card
			sx={{
				maxWidth: 345,
				maxHeight: 500,
				width: 345,
				margin: '10px',
				position: 'relative',
			}}
			key={key}
		>
			<CardMedia sx={{ height: 380 }} image={url} title={name} />
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{name}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Box sx={{ position: 'absolute', bottom: 10 }}>
					<Button
						size='small'
						onClick={onClickButtonHandler.bind(null, ButtonType.LookMore)}
					>
						Look More
					</Button>
					<Button
						size='small'
						onClick={onClickButtonHandler.bind(null, ButtonType.Borrow)}
					>
						Borrow
					</Button>
				</Box>
			</CardActions>
		</Card>
	);
}
