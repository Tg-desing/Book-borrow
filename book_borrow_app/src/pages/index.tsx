import React, { useEffect, useState } from 'react';
// import Carousel from '@/components/Carousel';
import BookCard from '@/src/components/BookCard';
import classes from './index.module.css';
import apiIp from '@/assets/apiKey';

interface bookData {
	bookName: string;
	category: string;
	image: string;
	description: string;
}

interface bookJson {
	id: number;
	url: string;
	category: string;
	borrower: string;
	startDate: Date;
	endDate: Date;
	description: string;
}

interface responseJson {
	bookList: bookJson[];
}

type HomeProps = {
	bookDataList: bookData[];
};

export default function Home({ bookDataList }: HomeProps) {
	const [bookList, setBookList] = useState<bookData[]>([]);

	useEffect(() => {
		async function getBookList() {
			const response = await fetch(`${apiIp}/home`);
			const { result, bookData } = await response.json();

			if (result) {
				console.log(bookData);
				setBookList(bookData);
			}
		}

		getBookList();
	}, []);

	console.log(bookList);
	return (
		<div className='main-page'>
			<div className={classes['cart-container']}>
				{bookList.map((book, key) => {
					return (
						<BookCard
							name={book.bookName}
							url={book.image}
							key={key}
							description={book.description}
						></BookCard>
					);
				})}
			</div>
		</div>
	);
}

// export async function getStaticProps() {
// 	try {
// 		const response = await fetch(`${apiIp}/home`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 		const resultData = await response.json();

// 		const result = resultData.result;
// 		const bookData = resultData.bookData;
// 		const length = resultData.length;
// 		const bookDataList: bookData[] = [];

// 		if (result) {
// 			for (const key in bookData) {
// 				const name: string = bookData[key].bookName;
// 				const url: string = bookData[key].img;
// 				const category: string = bookData[key].category;
// 				bookDataList.push({ name: name, category: category, url: url });
// 			}
// 		} else {
// 			console.log('error happend');
// 		}

// 		// const bookList: responseJson = await res.json();

// 		return {
// 			props: {
// 				bookDataList: bookDataList || [],
// 			},
// 		};
// 	} catch (error) {
// 		console.log('Error fetching data', error);

// 		return {
// 			props: {},
// 		};
// 	}
// }
