import apiIp from '@/assets/apiKey';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function AddBookPage() {
	const [bookname, setBookname] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [image, setImage] = useState<string>('');

	const router = useRouter();

	function onChangeBooknameHandler(e: ChangeEvent<HTMLInputElement>) {
		setBookname(e.target.value);
	}

	function onChangeCategoryHandler(e: ChangeEvent<HTMLInputElement>) {
		setCategory(e.target.value);
	}

	function onChangeImageHandler(e: ChangeEvent<HTMLInputElement>) {
		setImage(e.target.value);
	}

	async function onSubmitHandler(e: FormEvent) {
		e.preventDefault();

		const response = await fetch(`${apiIp}/book/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bookName: bookname,
				category: category,
				image: image,
			}),
		});

		const { result, err } = await response.json();

		if (result) {
			console.log('Adding book success');
			router.push('../../');
		} else {
			console.log('Adding book failed. Try again', err);
		}
	}

	return (
		<form onSubmit={onSubmitHandler}>
			<label htmlFor='name'>book name</label>
			<input id='name' onChange={onChangeBooknameHandler}></input>
			<label htmlFor='category'>category</label>
			<input id='category' onChange={onChangeCategoryHandler}></input>
			<label htmlFor='image'>image url</label>
			<input id='image' onChange={onChangeImageHandler}></input>
			<button>submit</button>
		</form>
	);
}
