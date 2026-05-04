import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';
import { useCartItemQuantity } from '@/hooks/use-cart-item-quantity';
import { AnimatedCard } from './animated-card';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl?: string;
	className?: string;
	ingredients?: Ingredient[];
	productItemId: number;
	index?: number;
}

export const ProductCard = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
	productItemId,
	index = 0,
}: Props) => {
	const quantity = useCartItemQuantity(productItemId);

	return (
		<AnimatedCard 
			className={cn(className)}
			delay={index * 0.05}
		>
			<Link href={`/product/${id}`} className='block px-2 sm:px-0'>
				<div className='flex justify-center p-4 md:p-6 bg-secondary rounded-lg h-[200px] md:h-[260px]'>
					<img
						className='w-[160px] h-[160px] md:w-[215px] md:h-[215px] object-contain'
						src={imageUrl || './path/to/default/image.jpg'}
						alt='Logo'
					/>
				</div>

				<Title
					text={name}
					size='sm'
					className='mb-1 mt-2 md:mt-3 font-bold text-sm md:text-base px-1'
				/>

				<p className='text-xs md:text-sm text-gray-400 line-clamp-2 px-1'>
					{ingredients?.map(ingredient => ingredient.name).join(', ') || 'Нет ингредиентов'}{' '}
				</p>

				<div className='flex justify-between items-center mt-3 md:mt-4 px-1'>
					<span className='text-base md:text-[20px]'>
						от <b>{price} ₽</b>
					</span>

					{quantity > 0 ? (
						<span className='text-sm md:text-base font-bold'>{quantity} шт.</span>
					) : (
						<Button
							variant='secondary'
							className='text-sm md:text-base font-bold h-9 md:h-10'>
							<Plus className='w-4 h-4 md:w-5 md:h-5 mr-1' />
							Добавить
						</Button>
					)}
				</div>
			</Link>
		</AnimatedCard>
	);
};
