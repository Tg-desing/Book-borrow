import apiIp from '@/assets/apiKey';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function BookPage() {
	const router = useRouter();
	const { id } = router.query;

	const [bookName, setBookName] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [startDate, setStartDate] = useState<Date>(new Date(0));
	const [endDate, setEndDate] = useState<Date>(new Date(0));

	useEffect(() => {
		async function getBookData() {
			const response = await fetch(`${apiIp}/book/load`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					bookName: id,
				}),
			});

			const { result, bookData, err } = await response.json();

			const bookName: string = bookData.bookName;
			const category: string = bookData.category;
			const image: string = bookData.image;
			const startDate: string = bookData.start_date;
			const endDate: string = bookData.end_date;

			// let isDatePossible = alse;

			// if (!startDate) {
			//   isDatePossible = false;
			// }
			if (result) {
				setBookName(bookName);
				setCategory(category);
				setImage(image);
				setStartDate(new Date(startDate));
				setEndDate(new Date(endDate));
			} else {
				window.alert('Error occured during fetching data');
				console.log(err);
			}
		}

		getBookData();
	}, []);

	return (
		<div>
			<h1>{bookName}</h1>
			<h1>{category}</h1>
			<img src={image}></img>
		</div>
	);
}
