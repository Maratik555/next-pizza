import { NextResponse } from 'next/server';
import { registerUser } from '@/app/actions';

export async function POST(req: Request) {
	try {
		console.log('Received request');

		let body;
		try {
			body = await req.json();
			console.log('Parsed body:', body);
		} catch (e) {
			console.error('Failed to parse request body:', e);
			return new Response(JSON.stringify({ success: false, error: 'Неверный формат данных' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (!body || typeof body !== 'object') {
			console.error('Invalid body:', body);
			return new Response(JSON.stringify({ success: false, error: 'Неверный формат данных' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (!body.email || !body.password || !body.fullName) {
			console.error('Missing required fields:', body);
			return new Response(JSON.stringify({ success: false, error: 'Не все поля заполнены' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const result = await registerUser(body);
		console.log('Registration result:', result);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error [REGISTER]', error);
		return new Response(
			JSON.stringify({
				success: false,
				error: error instanceof Error ? error.message : 'Ошибка при регистрации',
			}),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
}
