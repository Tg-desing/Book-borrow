import apiIp from '@/assets/apiKey';
import { isBoolean, isString } from '@/src/typeguard/typeguard';

function getJwtFromCookie() {
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'token') {
			console.log(value);
			return value;
		}
	}
	return '';
}

export interface isLogin {
	isLogin: boolean;
	isManager: boolean;
	username: string;
}

async function getIsJwtAuthentication(): Promise<isLogin> {
	const jwtValue = getJwtFromCookie();

	try {
		if (jwtValue === '') {
			return { isLogin: false, isManager: false, username: '' };
		}
		const response = await fetch(`${apiIp}/auth/auth`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				authentication: jwtValue,
			}),
		});

		const { result, username } = await response.json();
		if (isBoolean(result)) {
			if (username === 'comit') {
				return { isLogin: true, isManager: true, username: username };
			} else {
				return { isLogin: true, isManager: false, username: username };
			}
		} else {
			return { isLogin: false, isManager: false, username: username };
		}
	} catch (err) {
		window.alert(err);
		return { isLogin: false, isManager: false, username: '' };
	}
}

async function getRidOfAuthToken() {
	const response = await fetch(`${apiIp}/auth/auth`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			authentication: '',
		}),
	});

	const result = await response.json();
	return { isLogin: false, isManager: false, username: '' };
}

export { getJwtFromCookie, getIsJwtAuthentication, getRidOfAuthToken };
