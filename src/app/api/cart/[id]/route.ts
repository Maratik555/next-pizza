import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { CartItemDTO } from '../../../../../services/dto/cart';

async function updateCartTotalAmount(userId: number, cartToken: string) {
	const userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				{
					userId,
				},
				{
					token: cartToken,
				},
			],
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calcCartItemTotalAmount(item as CartItemDTO);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart?.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});
}

export async function PATCH(req: NextRequest, { params }: { params: any}) {
	try {
		const cartToken = req.cookies.get('cartToken')?.value;
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);

		// Исправлено: убран await
		const itemId = params.id;

		if (!cartToken) {
			return NextResponse.json({ error: 'Cart token not found' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(itemId),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		const data = (await req.json()) as { quantity: number };

		await prisma.cartItem.update({
			where: {
				id: cartItem.id,
			},
			data: {
				quantity: data.quantity,
			},
		});

		await updateCartTotalAmount(userId, cartToken);

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						userId,
					},
					{
						token: cartToken,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_PATCH] Server error' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: any}) {
	try {
		const cartToken = req.cookies.get('cartToken')?.value;
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);

		const itemId = params.id;

		if (!cartToken) {
			return NextResponse.json({ error: 'Cart token not found' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(itemId),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		await prisma.cartItem.delete({
			where: {
				id: cartItem.id,
			},
		});

		await updateCartTotalAmount(userId, cartToken);

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						userId,
					},
					{
						token: cartToken,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
	}
}
