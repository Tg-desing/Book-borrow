import React, { useState } from 'react';
import apiIp from '@/assets/apiKey';

function SignUp() {
	const [name, setName] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const [studentId, setStudentId] = useState<string>('');

	function onChangeNameHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}

	function onChangePwHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setPw(event.target.value);
	}

	function onChangeStudentIdHandler(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setStudentId(event.target.value);
	}

	async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const response = await fetch(`${apiIp}/auth/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: name,
					student_id: studentId,
					password: pw,
				}),
			});
			const message = await response.json();
			console.log(message);
		} catch {
			console.log('error');
		}
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler}>
				<h1>SignUp</h1>
				<label htmlFor='name'>Input Name</label>
				<input id='name' value={name} onChange={onChangeNameHandler}></input>
				<label htmlFor='stId'>Input student Id</label>
				<input
					id='stId'
					value={studentId}
					onChange={onChangeStudentIdHandler}
				></input>
				<label htmlFor='pw'>Input student Id</label>
				<input id='pw' value={pw} onChange={onChangePwHandler}></input>
				<button type='submit'>Submit!</button>
			</form>
		</React.Fragment>
	);
}

export default SignUp;
