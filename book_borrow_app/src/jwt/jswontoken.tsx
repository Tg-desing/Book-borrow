function getJwtFromCookie() {
	console.log(document.cookie);
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'token') {
			return value;
		}
	}
	return null;
}

export { getJwtFromCookie };
