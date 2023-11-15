import React, { useState } from 'react';

function Login() {
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

	function onChangeIdHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setId(event.target.value);
	}

	function onChangePwHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setPw(event.target.value);
	}

	return (
		<React.Fragment>
			<h1>Login!</h1>
			<label htmlFor='id'>Input Id!</label>
			<input id='id' value={id} onChange={onChangeIdHandler}></input>
			<label htmlFor='pw'>Input Password</label>
			<input id='pw' value={pw} onChange={onChangePwHandler}></input>
		</React.Fragment>
	);
}

export default Login;
