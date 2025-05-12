import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';
import { useCartItemQuantity } from '@/hooks/use-cart-item-quantity';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl?: string;
	className?: string;
	ingredients?: Ingredient[];
	productItemId: number;
}

export const ProductCard = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
	productItemId,
}: Props) => {
	const quantity = useCartItemQuantity(productItemId);

	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img
						className='w-[215px] h-[215px]'
						src={imageUrl || './path/to/default/image.jpg'}
						alt='Logo'
					/>
				</div>

				<Title
					text={name}
					size='sm'
					className='mb-1 mt-3 font-bold'
				/>

				<p className='text-sm text-gray-400'>
					{ingredients?.map(ingredient => ingredient.name).join(', ') || 'Нет ингредиентов'}{' '}
				</p>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

					{quantity > 0 ? (
						<span className='text-base font-bold'>{quantity} шт.</span>
					) : (
						<Button
							variant='secondary'
							className='text-base font-bold'>
							<Plus className='w-5 h-5 mr-1' />
							Добавить
						</Button>
					)}
				</div>
			</Link>
		</div>
	);
};
