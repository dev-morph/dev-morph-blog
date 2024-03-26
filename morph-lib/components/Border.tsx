import Spacing from './Spacing';

type BorderProps = {
	borderWidth?: string;
	borderStyle?: string;
	borderColor?: string;
	verticalPadding?: number;
};

export default function Border({
	borderWidth = '1px',
	borderStyle = 'solid',
	borderColor = '#d0d7de',
	verticalPadding = 30,
}: BorderProps) {
	return (
		<>
			<Spacing size={verticalPadding} />
			<div
				style={{
					width: '100%',
					borderWidth: borderWidth,
					borderStyle: borderStyle,
					borderColor: borderColor,
				}}
			></div>
			<Spacing size={verticalPadding} />
		</>
	);
}
