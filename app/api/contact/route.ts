import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, res: Response) {
	return Response.json({ message: 'hoihoi' });
}

export async function POST(req: NextApiRequest, res: Response) {
	const { email, name, message } = req.body;

	console.log(email, name, message);
}
