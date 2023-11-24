import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { isStringObject } from 'util/types';
import { GlobalContext } from '../../_app';

function Login() {
	const router = useRouter();
	const [studentId, setStudentId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

	const context = useContext(GlobalContext);
	const setUsername = context.setUsername;
	const setIsLogin = context.setIsLogin;

	function onChangeIdHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setStudentId(event.target.value);
	}

	function onChangePwHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setPw(event.target.value);
	}

	async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:3001/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					student_id: studentId,
					password: pw,
				}),
			});

			const responseData = await response.json();
			console.log(responseData.message);
			console.log(responseData.result);
			if (!responseData.result) {
				window.alert(responseData.message);
				router.push({
					pathname: '../../',
				});
				console.log('1');
			} else {
				window.alert(responseData.message);
				const username = responseData.userData.username;
				if (typeof username === 'string') {
					// ? 은 체이닝으로 값이 undefined가 아닐 경우에만 뒤에 것을 진행한다는 의미이다. 없으면 undefined 출력
					const jwtCookie = document.cookie
						.split(': ')
						.find((row) => row.startsWith('token='))
						?.split('=')[1];
					console.log(jwtCookie);
					if (typeof setUsername !== 'undefined') {
						setUsername(username);
					}

					if (typeof setIsLogin !== 'undefined') {
						setIsLogin(true);
					}

					console.log(jwtCookie);
					console.log(document.cookie);

					router.push({
						pathname: '../../',
					});
				} else {
					console.log('username is strange! Try again');
					router.push({
						pathname: '../../',
					});
				}
			}
		} catch {
			console.log('error');
		}
	}

	return (
		<React.Fragment>
			<form onSubmit={onSubmitHandler}>
				<h1>Login!</h1>
				<label htmlFor='id'>Input Id!</label>
				<input id='id' value={studentId} onChange={onChangeIdHandler}></input>
				<label htmlFor='pw'>Input Password</label>
				<input id='pw' value={pw} onChange={onChangePwHandler}></input>
				<button>Submit</button>
			</form>
		</React.Fragment>
	);
}

export default Login;
