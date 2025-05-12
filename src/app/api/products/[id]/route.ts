import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: any }) {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: {
				include: {
					product: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	});

	return NextResponse.json(product);
}
