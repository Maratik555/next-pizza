import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';
import { CreateCartItemValues } from '../../../../services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
	try {
		const cartToken = req.cookies.get('cartToken')?.value;
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);

		if (!cartToken) {
			return NextResponse.json({ items: [] });
		}

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
		return NextResponse.json({ message: '[CART_GET] Server error' }, { status: 500 });
	}
}

async function findOrCreateCart(userId: number, cartToken: string | undefined) {
	let userCart = await prisma.cart.findFirst({
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
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				userId,
				// @ts-expect-error token может быть undefined, но prisma его обработает
				token: cartToken,
			},
		});
	}

	return userCart;
}

async function getCartTotalAmount(cartId: number): Promise<number> {
	const userCartAfterUpdate = await prisma.cart.findFirst({
		where: {
			id: cartId,
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
		orderBy: {
			createdAt: 'desc',
		},
	});

	if (
		!userCartAfterUpdate ||
		!userCartAfterUpdate.items ||
		userCartAfterUpdate.items.length === 0
	) {
		return 0;
	}

	try {
		const totalAmount = userCartAfterUpdate.items.reduce((acc, item) => {
			if (!item || !item.productItem) return acc;
			try {
				// @ts-expect-error Принудительное приведение типа для совместимости с CartItemDTO
				return acc + calcCartItemTotalAmount(item);
			} catch (err) {
				console.error('Ошибка при расчете товара:', err);
				return acc;
			}
		}, 0);

		return totalAmount ?? 0;
	} catch (error) {
		console.error('Ошибка при расчете суммы корзины:', error);
		return 0;
	}
}

async function updateCartTotalAmount(cartId: number, totalAmount: number) {
	const updatedCart = await prisma.cart.update({
		where: {
			id: cartId,
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

	return updatedCart;
}

export async function POST(req: NextRequest) {
	try {
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);
		let cartToken = req.cookies.get('cartToken')?.value;

		const rawData = await req.json();
		if (!rawData) {
			return NextResponse.json({ message: 'No data provided' }, { status: 400 });
		}

		const data = rawData as CreateCartItemValues;

		// Проверка обязательных полей
		if (!data.productItemId) {
			return NextResponse.json({ message: 'productItemId is required' }, { status: 400 });
		}

		if (!data.quantity || data.quantity <= 0) {
			return NextResponse.json({ message: 'Valid quantity is required' }, { status: 400 });
		}

		if (!cartToken) {
			cartToken = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(userId, cartToken);

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: data.ingredientsIds?.length
					? { every: { id: { in: data.ingredientsIds } } }
					: undefined,
			},
		});

		if (findCartItem) {
			const updatedCartItem = await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + data.quantity,
				},
			});

			// const updatedUserCart = await updateCartTotalAmount(cartToken)

			const resp = NextResponse.json(updatedCartItem);
			resp.cookies.set('cartToken', cartToken);
			return resp;
		}

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: data.quantity,
				ingredients: data.ingredientsIds?.length
					? { connect: data.ingredientsIds.map(id => ({ id })) }
					: undefined,
			},
		});

		const totalAmount = await getCartTotalAmount(userCart.id);
		const updatedCart = await updateCartTotalAmount(userCart.id, totalAmount);

		const resp = NextResponse.json(updatedCart);
		resp.cookies.set('cartToken', cartToken);
		return resp;
	} catch (err) {
		console.error(
			'Ошибка при добавлении в корзину:',
			err instanceof Error ? err.message : 'Неизвестная ошибка',
		);
		if (err instanceof Error) {
			console.error('Стек ошибки:', err.stack);
		}

		try {
			// Безопасное логирование
			const safeLog = { errorType: err?.constructor?.name || 'Unknown' };
			console.error('Дополнительная информация:', safeLog);
		} catch {
			console.error('Ошибка при логировании');
		}

		return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const cartToken = req.cookies.get('cartToken')?.value;
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);

		if (!cartToken) {
			return NextResponse.json({ message: 'Cart token not found' }, { status: 400 });
		}

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
		});

		if (!userCart) {
			return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
		}

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		const totalAmount = await getCartTotalAmount(userCart.id);
		const updatedCart = await updateCartTotalAmount(userCart.id, totalAmount);

		return NextResponse.json(updatedCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
	}
}
