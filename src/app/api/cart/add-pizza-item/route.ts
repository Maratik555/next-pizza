import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';
import { CreateCartItemValues } from '../../../../../services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { CartItemDTO } from '../../../../../services/dto/cart.dto';

export async function POST(req: NextRequest) {
	try {
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);
		let cartToken = req.cookies.get('cartToken')?.value;

		if (!cartToken) {
			cartToken = crypto.randomUUID();
		}

		const data = (await req.json()) as CreateCartItemValues;

		// Логи для отладки
		console.log('Received pizza data:', {
			productItemId: data.productItemId,
			pizzaSize: data.pizzaSize,
			type: data.type,
			ingredients: data.ingredientsIds,
		});

		// Поиск или создание корзины
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
					token: cartToken,
				},
			});
		}

		// Создание элемента корзины
		const cartItem = await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: data.quantity,
				pizzaSize: data.pizzaSize, // Явно указываем pizzaSize
				type: data.type, // Явно указываем type
				...(data.ingredientsIds?.length && {
					ingredients: {
						connect: data.ingredientsIds.map(id => ({ id })),
					},
				}),
			},
			include: {
				productItem: {
					include: {
						product: true,
					},
				},
				ingredients: true,
			},
		});

		// Логирование созданного элемента
		console.log('Created cart item:', {
			id: cartItem.id,
			pizzaSize: cartItem.pizzaSize,
			type: cartItem.type,
		});

		// Получение элементов корзины для расчета общей суммы
		const cartWithItems = await prisma.cart.findUnique({
			where: {
				id: userCart.id,
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

		// Расчет общей суммы корзины
		const totalAmount = cartWithItems?.items.reduce((acc, item) => {
			return acc + calcCartItemTotalAmount(item as CartItemDTO);
		}, 0);

		// Обновление общей суммы корзины
		const updatedCart = await prisma.cart.update({
			where: {
				id: userCart.id,
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

		const resp = NextResponse.json(updatedCart);
		resp.cookies.set('cartToken', cartToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
		});

		return resp;
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: 'Server error' }, { status: 500 });
	}
}
