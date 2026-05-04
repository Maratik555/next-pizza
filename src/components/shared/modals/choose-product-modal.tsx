'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { IProduct } from '@/hooks/use-choose-pizza';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';

interface Props {
	product: IProduct;
}

export const ChooseProductModal = ({ product }: Props) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType);

	const onCloseModal = () => {
		const scrollY = window.scrollY;

		// Даём анимации закрытия отыграть (duration-200 в DialogContent)
		setTimeout(() => {
			document.documentElement.style.scrollBehavior = 'auto';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';

			router.back();

			setTimeout(() => {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				window.scrollTo({ top: scrollY, behavior: 'instant' });
				document.documentElement.style.scrollBehavior = '';
			}, 50);
		}, 180);
	};

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={onCloseModal}>
			<DialogContent className='p-0 w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1060px] h-[85vh] sm:h-auto sm:min-h-[600px] sm:max-h-[90vh] bg-white overflow-y-auto scrollbar-hide'>
					<DialogTitle style={{display: 'none'}}></DialogTitle>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						items={product.items}
						onClickAdd={onCloseModal}
						ingredients={product.ingredients}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						items={product.items}
						onClickAdd={onCloseModal}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
