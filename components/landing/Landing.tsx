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
			<Top03 textAlign="center">Moyang</Top03>
			<Spacing size={10} />
			<Text textAlign="center" size="0.95rem">
				Blog dealing with web development and personal matters.
			</Text>
			<Lottie src="/lottie/boy.json" className="center" />
		</>
	);
}
