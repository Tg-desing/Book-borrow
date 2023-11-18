import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '@/pages/_app';
import { isStringObject } from 'util/types';

function Login() {
	const router = useRouter();
	const [studentId, setStudentId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

	const { username, setUsername, accessToken, setAccessToken } =
		useContext(GlobalContext);

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
			if (!responseData.result) {
				window.alert(responseData.message);
				router.push({
					pathname: '../../',
				});
			} else {
				window.alert(responseData.message);
				const username = responseData.userData.username;
				if (typeof username === 'string') {
					// ? 은 체이닝으로 값이 undefined가 아닐 경우에만 뒤에 것을 진행한다는 의미이다. 없으면 undefined 출력
					const jwtCookie = document.cookie
						.split(': ')
						.find((row) => row.startsWith('token='))
						?.split('=')[1];
					setUsername(username);

					console.log(jwtCookie);

					if (jwtCookie) {
						setAccessToken(jwtCookie);
					} else {
						console.log("There's no token");
						router.push({
							pathname: '../../',
						});
					}

					router.push({
						pathname: '../../borrow',
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
