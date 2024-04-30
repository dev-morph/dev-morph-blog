export default function DocSearchHitSelectIcon({
	size = '20',
}: {
	size?: string;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			width={size}
			height={size}
			viewBox={`0 0 ${20} ${20}`}
			strokeWidth="1.5"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m8.25 4.5 7.5 7.5-7.5 7.5"
			/>
		</svg>
	);
}
