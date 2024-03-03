'use client';

import classes from '@morphlib/sass/BusinessCard.module.scss';
import { useRef, MouseEvent, useState } from 'react';
import Lottie from './Lottie';
import TSIcon from '@/components/ui/icons/ts-icon';
import JavaIcon from '@/components/ui/icons/java-icon';
import NextIcon from '@/components/ui/icons/next-icon';
import VueIcon from '@/components/ui/icons/vue-icon';
import SpringIcon from '@/components/ui/icons/spring-icon';
import DockerIcon from '@/components/ui/icons/docker-icon';
import AWSIcon from '@/components/ui/icons/aws-icon';
import NestIcon from '@/components/ui/icons/nest-icon';
import Text from './Text';
import Button from './Button';
import { useRouter } from 'next/navigation';

export default function BusinessCard() {
	const router = useRouter();
	const cardEl = useRef<HTMLDivElement>(null);
	const [isFront, setIsFront] = useState<Boolean>(true);
	const [isFliping, setIsFliping] = useState<Boolean>(false);
	const floatingId = useRef<number>();

	function mouseMoveHandler({
		clientX,
		clientY,
	}: MouseEvent<HTMLDivElement>) {
		if (cardEl.current) {
			const { top, bottom, left, right } =
				cardEl.current?.getBoundingClientRect();

			//event의 offsetX를 사용하면, card내부 요소의 offsetX, Y좌표가 오기 때문에, 직접 계산.
			const offsetX = clientX - left;
			const offsetY = clientY - top;

			const height = bottom - top;
			const width = right - left;

			const rotateX = (40 / height) * offsetY - 20;
			let rotateY = ((-1 * 40) / width) * offsetX + 20;

			if (!isFront) {
				rotateY = 180 + rotateY;
			}
			cardEl.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		}
	}

	function mouseClickHandler(event: MouseEvent<HTMLElement>) {
		const target = event.target as HTMLElement;
		if (target.tagName.toUpperCase() === 'BUTTON') {
			return;
		} else {
			flip();
		}
	}

	let curDeg = isFront ? 0 : 180;
	function flip() {
		//애니메이션이 끝나기전 여러번 클릭하는 경우를 방지하기 위해 isFliping 체크
		if (!isFliping) {
			setIsFliping(true);
			const degDelta = isFront ? 10 : -10;
			curDeg += degDelta;
			const degDestination = isFront ? 180 : 0;
			if (cardEl.current) {
				cardEl.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${curDeg}deg)`;
				const id = requestAnimationFrame(flip);

				if (curDeg === degDestination) {
					cancelAnimationFrame(id);
					setIsFront((prev) => !prev);
					setIsFliping(false);
				}
			}
		}
	}

	let setTimeoutId: null | NodeJS.Timeout = null;
	function mouseLeaveHandler() {
		//클릭하여 Flip할 때 mouseLeave이벤트가 발생하므로 isFliping도 함께 체크
		if (!isFliping) {
			setTimeoutId = setTimeout(() => {
				backToOriginPosition();
			}, 200000);
		}
	}

	function mouseEnterHandler() {
		if (floatingId.current) {
			cancelAnimationFrame(floatingId.current);
		}
		if (setTimeoutId) {
			clearTimeout(setTimeoutId);
			setTimeoutId = null;
		}
	}

	let curTop = 0;
	let topThreshold = 10;
	let delta = 0.2;
	function floating() {
		if (
			(delta > 0 && curTop >= topThreshold) ||
			(delta < 0 && curTop <= topThreshold)
		) {
			topThreshold *= -1;
			delta *= -1;
		}
		curTop = curTop + delta;
		if (cardEl.current) {
			cardEl.current.style.top = curTop + 'px';
		}

		floatingId.current = requestAnimationFrame(floating);
	}

	function backToOriginPosition() {
		if (cardEl.current) {
			const transformStyleString = cardEl.current.style.transform;
			const rotateXMatchedGroup = transformStyleString.match(
				/rotateX\((-?\d+(\.\d+)?)deg\)/
			);
			const rotateYMatchedGroup = transformStyleString.match(
				/rotateY\((-?\d+(\.\d+)?)deg\)/
			);

			if (rotateXMatchedGroup && rotateYMatchedGroup) {
				const rotateX = rotateXMatchedGroup[1];
				const rotateY = rotateYMatchedGroup[1];

				toOriginAnimation(+rotateX, +rotateY);
			}
		}
	}

	function toOriginAnimation(x: number, y: number) {
		const delta = isFront ? 0.5 : 3;
		const deltaX = x < 0 ? delta : -delta;
		const deltaY = y < 0 ? delta : -delta;

		if (cardEl.current) {
			const nextX = Math.abs(x + deltaX) <= delta ? 0 : x + deltaX;
			const nextY = Math.abs(y + deltaY) <= delta ? 0 : y + deltaY;
			const transformString = `perspective(1000px) rotateX(${nextX}deg) rotateY(${nextY}deg)`;
			cardEl.current.style.transform = transformString;

			const id = requestAnimationFrame(() =>
				toOriginAnimation(nextX, nextY)
			);
			if (nextX === 0 && nextY === 0) {
				cancelAnimationFrame(id);
				setIsFront(true);
				floating();
			}
		}
	}

	floating();

	return (
		<>
			<div
				className={classes.card}
				ref={cardEl}
				onMouseMove={mouseMoveHandler}
				onMouseLeave={mouseLeaveHandler}
				onMouseEnter={mouseEnterHandler}
				onClick={mouseClickHandler}
			>
				<div className={classes.front}>
					<div className={classes.front__content}>
						<div className={classes.base__info}>
							<div className={classes.profile__image}>
								<div className={classes.introduction}>
									Hello, I am a Full stack Devloper.
								</div>
								<Lottie
									src="/lottie/run.json"
									// style={{
									// 	width: '10vw',
									// 	height: '10vw',
									// 	margin: '0 auto',
									// }}
									className="runner"
								/>
							</div>
							<div>LEE Moyang</div>

							<Text textAlign="center" color="rgb(128, 128, 128)">
								3 Years Full-Stack Developer
							</Text>
						</div>
						<Button
							onClick={() => router.push('/about')}
							width="90%"
						>
							Learn more about me
						</Button>
					</div>
				</div>
				<div className={classes.back}>
					<div className={classes.content__wrapper}>
						<div className={classes.back__content}>
							<Text>Email: dev.allomorph@gmail.com</Text>
							<Text>
								github:&nbsp;
								<a
									href="https://github.com/dev-morph"
									target="_blank"
									className={classes.github}
								>
									https://github.com/dev-morph
								</a>
							</Text>
							<Text>출몰지역: 서울시 마포구</Text>
							<Text>취미: 헬스, 달리기, 코딩</Text>
						</div>
						<div className={classes.skill__wrapper}>
							<div className={classes.skills}>
								<Text
									color="black"
									className="profile__skill__title"
								>
									Language: &nbsp;
								</Text>

								<div className={classes.badges}>
									<TSIcon size={18} />
									<JavaIcon />
								</div>
							</div>
							<div className={classes.skills}>
								<Text
									color="black"
									className="profile__skill__title"
								>
									Frontend: &nbsp;
								</Text>
								<div className={classes.badges}>
									<NextIcon />
									<VueIcon />
								</div>
							</div>
							<div className={classes.skills}>
								<Text
									color="black"
									className="profile__skill__title"
								>
									Backend: &nbsp;
								</Text>

								<div className={classes.badges}>
									<SpringIcon />
									<NestIcon />
								</div>
							</div>
							<div className={classes.skills}>
								<Text
									color="black"
									className="profile__skill__title"
								>
									DevOps: &nbsp;
								</Text>

								<div className={classes.badges}>
									<AWSIcon />
									<DockerIcon />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
