import { NewCommentType } from '@/types/comment_types';
import axios from 'axios';

export async function postComment(comment: NewCommentType) {
	const result = await axios.post('/api/comment', comment);
	console.log('posted comment! ', result);
	return result;
}
