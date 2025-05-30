import { ChoosePizzaForm } from '@/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/components/shared/choose-product-form';
import { Container } from '@/components/shared/container';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Product, ProductItem, Ingredient, Category } from '@prisma/client';
import React from 'react';
import { NextPage } from 'next';

type ProductWithRelations = Product & {
	ingredients: Ingredient[];
	items: ProductItem[];
	category: Category & {
		products: (Product & {
			items: ProductItem[];
			ingredients: Ingredient[];
		})[];
	};
};

const ProductPage: NextPage<{ params: Promise<{ id: string }> }> = async ({ params }) => {
	const { id } = await params; // Ждем разрешения промиса

	const productId = Number(id);

	const product = (await prisma.product.findFirst({
		where: {
			id: productId,
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						where: {
							id: {
								not: productId,
							},
						},
						include: {
							items: true,
							ingredients: true,
						},
					},
				},
			},
			items: {
				orderBy: {
					id: 'desc',
				},
				include: {
					product: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	})) as ProductWithRelations | null;

	if (!product) {
		return notFound();
	}

	const recommendedProducts = product.category.products.filter(p => p.items.length > 0);
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	return (
		<Container className='flex flex-col my-10'>
			{isPizzaForm ? (
				<ChoosePizzaForm
					imageUrl={product.imageUrl}
					name={product.name}
					items={product.items}
					ingredients={product.ingredients}
				/>
			) : (
				<ChooseProductForm
					imageUrl={product.imageUrl}
					name={product.name}
					items={product.items}
				/>
			)}
			{recommendedProducts.length > 0 && (
				<ProductsGroupList
					className='mt-20'
					listClassName='grid-cols-4'
					title='Рекомендации'
					items={recommendedProducts}
					categoryId={product.category.id}
				/>
			)}
		</Container>
	);
};

export default ProductPage;
