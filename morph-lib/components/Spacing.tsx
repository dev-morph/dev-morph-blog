export default function Spacing({ size }: { size: number | string }) {
	return (
		<div
			style={{
				flex: 'none',
				height: size,
			}}
		/>
	);
}
