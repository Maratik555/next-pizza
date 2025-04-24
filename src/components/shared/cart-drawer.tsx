'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { DrawerCartItem } from './drawer-cart-item';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Title } from './title';
import clsx from 'clsx';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ICartItem } from '../../../store/cart';

export const CartDrawer = ({ children }: React.PropsWithChildren) => {
	const [redirecting, setRedirecting] = React.useState(false);

	const { totalAmount, items, loading } = useCart(true);

	// Добавляем console.log для отладки
	React.useEffect(() => {
		if (items.length > 0) {
			console.log('Cart items:', items);
			items.forEach(item => {
				console.log(
					`Item ${item.id} - pizzaSize: ${item.pizzaSize}, type: ${item.type}, productItem:`,
					item.productItem,
				);
			});
		}
	}, [items]);

	return (
		<Sheet>
			{/* Using asChild to prevent button nesting issues */}
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				{/* Always include a SheetTitle for accessibility, even if visually hidden when cart is empty */}
				<SheetHeader>
					{totalAmount > 0 ? (
						<SheetTitle>
							В корзине <span className='font-bold'>{items.length} товара</span>
						</SheetTitle>
					) : (
						<VisuallyHidden>
							<SheetTitle>Корзина</SheetTitle>
						</VisuallyHidden>
					)}
				</SheetHeader>

				<div className={clsx('flex flex-col h-full', !totalAmount && 'justify-center')}>
					{!totalAmount && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/assets/images/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Корзина пустая'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Добавьте хотя бы одну пиццу, чтобы совершить заказ
							</p>

							{/* Using a div with onClick instead of nesting a button inside SheetClose */}
							<SheetClose asChild>
								<div>
									<Button
										className='w-56 h-12 text-base'
										size='lg'>
										<ArrowLeft className='w-5 mr-2' />
										Вернуться назад
									</Button>
								</div>
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className='-mx-6 mt-5 overflow-auto flex-1'>
								{items.map((item: ICartItem) => (
									<div
										key={item.id}
										className='mb-2'>
										<DrawerCartItem
											id={item.id}
											name={item.name}
											imageUrl={item.imageUrl}
											price={item.price}
											ingredients={item.ingredients}
											quantity={item.quantity}
											pizzaSize={item.pizzaSize}
											type={item.type}
											productItem={item.productItem}
										/>
									</div>
								))}
							</div>

							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Итого
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>{totalAmount} ₽</span>
									</div>

									<Link href='/cart'>
										<Button
											onClick={() => setRedirecting(true)}
											loading={loading || redirecting}
											type='submit'
											className='w-full h-12 text-base'>
											Оформить заказ
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
