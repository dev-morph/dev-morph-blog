import Image from 'next/image';

import classes from '@/components/home-page/hero.module.css';

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src="/images/site/morph.jpeg"
					alt="An Image for Myself"
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I am Morph!</h1>
			<p>I blog about web devlopment - F.E, B.E both!</p>
		</section>
	);
}
