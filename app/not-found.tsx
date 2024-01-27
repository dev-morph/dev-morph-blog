import Top01 from '@/morph-lib/components/Top/Top01';
import Text from '@/morph-lib/components/Text';

export default function NotFound() {
	return (
		<>
			<Top01 textAlign="center">Not Found</Top01>
			<Text textAlign="center" size="0.75rem">
				Could not find requested resource.
			</Text>
			<Text
				textAlign="center"
				fontWeight="bold"
				size="0.75rem"
				styled={{ textDecoration: 'underline' }}
			>
				<a href="/">Return Home</a>
			</Text>
		</>
	);
}
