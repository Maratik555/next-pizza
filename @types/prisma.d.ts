import type { Category, Product, ProductItem, Ingredient } from '@prisma/client';

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };

type CategoryProducts = Category & {
	products: Array<ProductWithRelations>;
};
