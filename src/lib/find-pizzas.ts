import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export interface GetSearchParams {
	query?: string | Promise<string>;
	sortBy?: string | Promise<string>;
	sizes?: string | Promise<string>;
	pizzaTypes?: string | Promise<string>;
	ingredients?: string | Promise<string>;
	priceFrom?: string | Promise<string>;
	priceTo?: string | Promise<string>;
	limit?: string | Promise<string>;
	page?: string | Promise<string>;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

async function safelyGetValue<T>(value: T | Promise<T> | undefined): Promise<T | undefined> {
	if (value === undefined) return undefined;
	try {
		return await value;
	} catch (error) {
		console.error('Ошибка получения значения:', error);
		return undefined;
	}
}

export const findPizzas = async (params: GetSearchParams = {}) => {
	const ingredients = await safelyGetValue(params.ingredients);
	const pizzaTypes  = await safelyGetValue(params.pizzaTypes);
	const sizes       = await safelyGetValue(params.sizes);
	const priceFrom   = await safelyGetValue(params.priceFrom);
	const priceTo     = await safelyGetValue(params.priceTo);
	const sortBy      = await safelyGetValue(params.sortBy);

	const ingredientsIdArr = ingredients?.split(',').map(Number).filter(Boolean);
	const pizzaTypesArr    = pizzaTypes?.split(',').map(Number).filter(Boolean);
	const sizesArr         = sizes?.split(',').map(Number).filter(Boolean);

	const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(priceTo)   || DEFAULT_MAX_PRICE;

	// Фильтр продуктов
	const where: Prisma.ProductWhereInput = {};

	if (ingredientsIdArr && ingredientsIdArr.length > 0) {
		where.ingredients = { some: { id: { in: ingredientsIdArr } } };
	}

	const itemsWhere: Prisma.ProductItemWhereInput = {
		price: { gte: minPrice, lte: maxPrice },
	};
	if (sizesArr && sizesArr.length > 0)           itemsWhere.size      = { in: sizesArr };
	if (pizzaTypesArr && pizzaTypesArr.length > 0) itemsWhere.pizzaType = { in: pizzaTypesArr };

	where.items = { some: itemsWhere };

	// Получаем все продукты глобально
	const allProducts = await prisma.product.findMany({
		where,
		include: {
			items: {
				where: { price: { gte: minPrice, lte: maxPrice } },
				orderBy: { price: 'asc' },
			},
			ingredients: true,
			category: true,
		},
	});

	// Глобальная сортировка по всем продуктам
	allProducts.sort((a, b) => {
		const aPrice = a.items[0]?.price ?? 0;
		const bPrice = b.items[0]?.price ?? 0;
		switch (sortBy) {
			case 'price_asc':  return aPrice - bPrice;
			case 'price_desc': return bPrice - aPrice;
			case 'new':        return b.id - a.id;
			case 'popular':
			default:           return a.id - b.id;
		}
	});

	// Группируем по категориям, сохраняя глобальный порядок сортировки
	const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
	const categoryById = new Map(categories.map(c => [c.id, { ...c, products: [] as typeof allProducts }]));

	for (const product of allProducts) {
		categoryById.get(product.categoryId)?.products.push(product);
	}

	const data = Array.from(categoryById.values()).filter(c => c.products.length > 0);

	return {
		data,
		meta: {
			total: allProducts.length,
			page: 1,
			limit: allProducts.length,
			pageCount: 1,
		},
	};
};
