export default function CircleIcon({ size }: { size: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			width={size}
			height={size}
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
