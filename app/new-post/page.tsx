import NewPostForm from '@/components/new-post-form/NewPostForm';
import Top02 from '@/morph-lib/components/Top/Top02';

export default function NewPost() {
	return (
		<>
			<Top02>제목 입력</Top02>
			<NewPostForm />
		</>
	);
}
