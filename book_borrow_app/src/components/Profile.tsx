import { ReactNode, useState } from 'react';
import classes from './../styles/Profile.module.css';
import { useRouter } from 'next/router';
import { Avatar, Box, Stack } from '@mui/material';

type profileType = {
	username: string;
};

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: 50,
			height: 50,
		},
		children: `${name[0]}`,
	};
}
export default function Profile(props: profileType) {
	const [isOnMouse, setIsOnMouse] = useState<boolean>(false);
	const router = useRouter();

	const username = props.username;

	function onClickHandler() {
		router.push(`./profile/${username}`);
	}

	return (
		<Box
			onClick={onClickHandler}
			sx={{ position: 'absolute', top: '10%', right: '5%' }}
		>
			<Avatar {...stringAvatar(username as string)} />;
		</Box>
	);
}
