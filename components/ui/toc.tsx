'use client';

import classes from './toc.module.scss';
import ListIcon from './icons/list-icon';
import CloseIcon from './icons/close-icon';
import { useEffect, useRef, useState } from 'react';

type TocProps = {
	title?: string;
};
const levelMap: { [key: string]: string } = {
	H1: 'lv1',
	H2: 'lv2',
	H3: 'lv3',
};
type str = number[];
export default function Toc({ title }: TocProps) {
	const [tocOpened, setTocOpened] = useState(false);
	const [hTags, setHTags] = useState<HTMLElement[]>([]);
	const focusedTag = useRef<HTMLElement | null>(null);

	//처음 렌더 후, hTag 모두 찾기.
	useEffect(() => {
		const entryPoint = document.querySelector('#content__entry__point');
		const hTagEls = entryPoint?.querySelectorAll(
			'h1, h2, h3'
		) as NodeListOf<HTMLElement>;

		/**
		 * markdown에서 줄바꿈으로 사용하는 #(즉, h1태그)가 함께 잡히는 문제가 있었음.
		 * innerHTML이 있는 부분들은 모두 제외하고 실제 제목들만 추가하도록 변경
		 */
		const nonEmptyHTagEls = [] as HTMLElement[];
		hTagEls.forEach((hTag) => {
			if (hTag.innerHTML && hTag.innerHTML.length > 0) {
				nonEmptyHTagEls.push(hTag);
			}
		});
		setHTags(nonEmptyHTagEls);

		//현재 창 넓이가 1350 이하면 ToC와 메인 컴포넌트가 겹친다.
		//그 이상이라면, ToC를 처음에 열어준다.
		const width = window.innerWidth;
		if (width >= 1350) {
			setTocOpened(true);
		}
	}, []);

	//hTag를 다 찾으면, 아래 로직 실행
	useEffect(() => {
		//실제 HTag에 해당하는 TocElement를 맵핑해주는 Map
		//실제 컨텐츠의 hTag의 innerHTML을 key로, TocElement를 value로 가진다.
		const hTagToTocElMapper = new Map<String, HTMLElement>();
		const listContainer = document?.querySelector('#toc__list');

		//HTag를 돌면서, Toc에 넣을 Element를 생성해서 넣어준다.
		hTags?.forEach((hTag) => {
			const hTagText = hTag.innerHTML;
			const liEl = document.createElement('li');
			const linkEl = document.createElement('a');

			linkEl.innerHTML = hTagText;
			//linkEl를 클릭하면, 해당 Tag를 가진 곳으로 스크롤 해 준다.
			linkEl.addEventListener('click', () => {
				window.scrollTo({
					top: hTag.offsetTop - 74,
					behavior: 'smooth',
				});
			});
			liEl.appendChild(linkEl);
			const levelClass = levelMap[hTag.tagName];
			liEl.classList.add(classes[levelClass]);

			hTagToTocElMapper.set(hTagText, liEl);

			listContainer?.appendChild(liEl);
		});

		//현재 focused Element를 찾아 세팅해준다.
		setFocusedElement();

		//scroll Event가 발생할 때마다 focused Element를 찾아 세팅해준다.
		const findCurTagEvent = (window.onscroll = () => setFocusedElement());

		function setFocusedElement() {
			// window.innerHeight / 2 : 화면의 전체 뷰포트 높이를 픽셀로 나타낸 수의 절반
			// window.scrollY : 원점으로부터 문서를 수직방향으로 스크롤한 픽셀 수
			// mainContentOffset : 기준점을 화면 상단으로부터 30%인 지점으로 잡기 위한 offset
			// e.g. 화면 상단으로부터 20%를 기준점으로 잡으려면 mainContentOffset을 0.3으로 조정
			const mainContentOffset = 0.2;
			const mainContentHeight =
				window.innerHeight * (0.5 - mainContentOffset) + window.scrollY;

			const mainTag =
				getMainElementAtMainContentHeight(mainContentHeight);
			const focusedTocTag = hTagToTocElMapper.get(mainTag?.innerHTML);

			if (focusedTocTag !== focusedTag.current) {
				focusedTag.current?.classList.remove(classes.focused);
				focusedTocTag?.classList.add(classes.focused);
				focusedTag.current = focusedTocTag ?? null;
			}
		}

		/**
		 * 진짜 내가 보고 있는 컨텐츠의 헤드를 찾아주는 함수
		 * 단순히 ObserverIntersection을 이용하면, 컨텐츠가 길어지는 경우, HTag가 보이지 않으면
		 * 내가 보고 있는 컨텐츠가 아니라, 하단에 아직 읽지 않고 있는 hTag에 포커스가 가는 것을 방지하기 위함
		 * @param mainContentHeight
		 * @returns
		 */
		function getMainElementAtMainContentHeight(mainContentHeight: number) {
			// 메인 컨텐츠의 높이(mainContentHeight)
			// 이전 태그의 TOP값(PT)
			// 이후 태그의 TOP값(NT)
			// MainTag(MT)
			// 조건: 항상 PT < NT
			// 경우의 수
			// 1. PT <= mainContentHeight < NT ==> MT = PT
			// 2. mainContentHeight < PT ==> MT = PT
			// 3. PT < mainContentHeight && NT <= mainContentHeight ==>  MT = NT
			let MT = hTags[0];
			for (let i = 1; i < hTags.length; i++) {
				const PT = hTags[i];
				if (
					mainContentHeight < MT.offsetTop &&
					mainContentHeight < PT.offsetTop
				) {
					return MT;
				} else if (
					MT.offsetTop < mainContentHeight &&
					mainContentHeight <= PT.offsetTop
				) {
					return MT;
				} else {
					MT = PT;
				}
			}
			return MT;
		}

		//걸어줬던 스크롤 이벤트를 clean-up 해준다.
		return findCurTagEvent;
	}, [hTags]);

	return (
		<>
			<div
				className={`${classes.icon} ${tocOpened && classes.opened}`}
				onClick={() => setTocOpened((prev) => !prev)}
			>
				<ListIcon size="25px" />
			</div>
			{hTags.length > 0 && (
				<div
					className={`${classes.toc} ${tocOpened && classes.opened}`}
				>
					<nav>
						<header className={`${classes.title}`}>
							<div
								className={classes.close__icon}
								onClick={() => setTocOpened(false)}
							>
								<CloseIcon size="12.5px" />
							</div>
							<p>{title ? title : 'Table Of Contents'}</p>
						</header>
						<div className={`${classes.toc__body}`}>
							<ul
								className={classes.toc__list}
								id="toc__list"
							></ul>
						</div>
					</nav>
				</div>
			)}
		</>
	);
}
