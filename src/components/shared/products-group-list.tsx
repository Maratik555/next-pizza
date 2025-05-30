'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '../../../store/category';
// import { CategoryProducts } from '../../../@types/prisma';
import { Ingredient, Product, ProductItem } from '@prisma/client';

type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };

interface Props {
	title: string;
	// products: CategoryProducts['products'];
	className?: string;
	listClassName?: string;
	categoryId: number;
	items: ProductWithRelations[];
}

export const ProductsGroupList = ({
	title,
	items,
	listClassName,
	categoryId,
	className,
}: Props) => {
	const setActiveId = useCategoryStore(state => state.setActiveId);
	const intersectionRef = React.useRef<HTMLDivElement>(null);
	const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveId(categoryId);
		}
	}, [intersection?.isIntersecting, categoryId, setActiveId]);

	return (
		<div
			className={className}
			id={title}>
			<Title
				text={title}
				size='lg'
				className='font-extrabold mb-5'
			/>
			<div
				ref={intersectionRef}
				className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items
					.filter(product => product.items.length > 0)
					.map(product => (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							price={product.items[0].price}
							ingredients={product.ingredients}
							productItemId={product.items[0].id}
						/>
					))}
			</div>
		</div>
	);
};
