'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';
import { Title } from './title';
import { IProduct } from '@/hooks/use-choose-pizza';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/use-cart';

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	items?: IProduct['items'];
	onClickAdd?: VoidFunction;
}

export const ChooseProductForm = ({ name, items, imageUrl, onClickAdd, className }: Props) => {
	const { addCartItem, loading } = useCart(true);

	const productItem = items?.[0];

	if (!productItem) {
		throw new Error('Продукт не найден');
	}

	const productPrice = productItem.price;

	const handleClickAdd = async () => {
		try {
			addCartItem({
				productItemId: productItem.id,
				quantity: 1,
			});
			toast.success(name + ' добавлен в корзину');
		} catch (error) {
			console.error(error);
			toast.error('Произошла ошибка при добавлении в корзину');
		}

		onClickAdd?.();
	};

	return (
		<div className={cn(className, 'flex flex-col lg:flex-row flex-1')}>
			<div className='flex items-center justify-center flex-1 relative w-full p-4'>
				<img
					src={imageUrl}
					alt={name}
					className='relative transition-all z-10 duration-300 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-contain'
				/>
			</div>

			<div className='w-full lg:w-[490px] bg-[#FCFCFC] p-4 sm:p-7'>
				<Title
					text={name}
					size='md'
					className='font-extrabold mb-1'
				/>
				<Button
					disabled={true}
					className='h-[35px] px-10 text-base rounded-[18px] w-full mt-2'>
					1шт.
				</Button>
				<Button
					loading={loading}
					onClick={handleClickAdd}
					className='h-[50px] sm:h-[55px] px-6 sm:px-10 text-sm sm:text-base rounded-[18px] w-full mt-4'>
					Добавить в корзину за {productPrice} ₽
				</Button>
			</div>
		</div>
	);
};
