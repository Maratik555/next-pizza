import { ChoosePizzaForm } from '@/components/shared/choose-pizza-form';
import { Container } from '@/components/shared/container';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Product, ProductItem, Ingredient, Category } from '@prisma/client';

type ProductWithRelations = Product & {
	ingredients: Ingredient[];
	items: ProductItem[];
	category: Category & {
		products: (Product & {
			items: ProductItem[];
		})[];
	};
};

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = (await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
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

	return (
		<Container className='flex flex-col my-10'>
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				items={product.items}
				ingredients={product.ingredients}
			/>

			<ProductsGroupList
				className='mt-20'
				listClassName='grid-cols-4'
				key={product.category.id}
				title='Рекомендации'
				products={product.category.products}
				categoryId={product.category.id}
			/>
		</Container>
	);
}
