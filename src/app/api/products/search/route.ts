import { GetSearchParams } from '@/lib/find-pizzas';
import { getSearchParams } from '@/lib/get-searh-params';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	const params = getSearchParams<GetSearchParams>(req.url);
	const query = await params.query;

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query || '',
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json(products);
}
