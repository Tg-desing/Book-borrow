import Image from 'next/image';
import classes from '../styles/BookCard.module.css';
import { useRouter } from 'next/router';

type cardProps = {
	name: string;
	url: string;
	key: number;
};

function BookCard({ name, url, key }: cardProps) {
	const router = useRouter();
	function onClickHandler() {
		const bookName = name;
		router.push(`/borrow/book/${name}`);
	}

	return (
		<div className={classes['book-card']} onClick={onClickHandler}>
			<img
				className={classes['book-cover']}
				src={url}
				alt={`bookImage ${key}`}
			/>
			<div className={classes['book-info']}>
				<div className={classes['book-title']}>
					<h1>{name}</h1>
				</div>
			</div>
		</div>
	);
}

export default BookCard;
