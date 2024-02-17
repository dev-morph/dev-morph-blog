import { PropsWithChildren } from 'react';

type FlexProps = PropsWithChildren<{
	direction?: 'column' | 'row';
	maxWidth?: string;
	flexWrap?: string;
}>;

export default function Flex({ direction = 'row', children }: FlexProps) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: direction,
				maxWidth: '90%',
				flexWrap: 'wrap',
			}}
		>
			{children}
		</div>
	);
}
