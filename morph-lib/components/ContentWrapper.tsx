type ContentWrapperProps = {
	className?: string;
	children: React.ReactNode;
};

export default function ContentWrapper({ children }: ContentWrapperProps) {
	return (
		<div
			style={{
				paddingTop: '4.5rem',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<section
				style={{
					width: '90%',
					maxWidth: '60rem',
					margin: 'var(--size-8) auto',
				}}
			>
				{children}
			</section>
		</div>
	);
}
