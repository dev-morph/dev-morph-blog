import Spacing from '@/morph-lib/components/Spacing';
import Top03 from '@/morph-lib/components/Top/Top03';
import Top05 from '@/morph-lib/components/Top/Top05';
import Text from '@morphlib/components/Text';
import Lottie from '@/morph-lib/components/Lottie';
import classes from './Landing.module.scss';
import Section from '@/morph-lib/components/Section';

export default function Landing() {
	return (
		<>
			<Top03 textAlign="center">Welcome to my Blog.</Top03>
			<Spacing size={20} />
			<Text textAlign="center" size="0.95rem">
				Click or hover below the card to see what will happen. 🤪
			</Text>
			<Spacing size={30} />
		</>
	);
}
