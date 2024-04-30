export default function DocSearchHitIcon({ size = '20' }: { size?: string }) {
	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			<path
				d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"
				stroke="currentColor"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
}
