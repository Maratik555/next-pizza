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

const DEFAULT_LIMIT = 12;
const DEFAULT_PAGE = 1;

// Вспомогательная функция для безопасного получения значения
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
	// Безопасно получаем все параметры
	const ingredients = await safelyGetValue(params.ingredients);
	const pizzaTypes = await safelyGetValue(params.pizzaTypes);
	const sizes = await safelyGetValue(params.sizes);
	const priceFrom = await safelyGetValue(params.priceFrom);
	const priceTo = await safelyGetValue(params.priceTo);
	const limit = await safelyGetValue(params.limit);
	const page = await safelyGetValue(params.page);

	// Обрабатываем полученные значения
	const ingredientsIdArr = ingredients
		? ingredients.split(',').map(Number).filter(Boolean)
		: undefined;

	const pizzaTypesArr = pizzaTypes ? pizzaTypes.split(',').map(Number).filter(Boolean) : undefined;

	const sizesArr = sizes ? sizes.split(',').map(Number).filter(Boolean) : undefined;

	const minPrice = Number(priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(priceTo) || DEFAULT_MAX_PRICE;

	const limitNum = Number(limit || DEFAULT_LIMIT);
	const pageNum = Number(page || DEFAULT_PAGE);

	// Построение запроса
	const where: Prisma.ProductWhereInput = {};

	// Добавляем условия фильтрации только если есть соответствующие параметры
	if (ingredientsIdArr && ingredientsIdArr.length > 0) {
		where.ingredients = {
			some: {
				id: {
					in: ingredientsIdArr,
				},
			},
		};
	}

	// Условия для items
	const itemsWhere: Prisma.ProductItemWhereInput = {
		price: {
			gte: minPrice,
			lte: maxPrice,
		},
	};

	if (sizesArr && sizesArr.length > 0) {
		itemsWhere.size = {
			in: sizesArr,
		};
	}

	if (pizzaTypesArr && pizzaTypesArr.length > 0) {
		itemsWhere.pizzaType = {
			in: pizzaTypesArr,
		};
	}

	where.items = {
		some: itemsWhere,
	};

	const result = await prisma.category.findMany({
		skip: (pageNum - 1) * limitNum,
		take: limitNum,
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where,
				include: {
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
					ingredients: true,
				},
			},
		},
	});

	const total = await prisma.category.count();

	return {
		data: result,
		meta: {
			total,
			page: pageNum,
			limit: limitNum,
			pageCount: Math.ceil(total / limitNum),
		},
	};
};
