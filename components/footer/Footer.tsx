import Border from '@/morph-lib/components/Border';
import Spacing from '@/morph-lib/components/Spacing';
import Text from '@/morph-lib/components/Text';
export default function Footer() {
	return (
		<>
			<Border withOutSpacing={true} />
			<Spacing size={15} />
			<footer
				style={{ paddingLeft: '1rem', color: 'var(--fontColor-muted)' }}
			>
				<Text>ⓒ 2023. moyang. All rights reserved.</Text>
			</footer>
			<Spacing size={15} />
		</>
	);
}
