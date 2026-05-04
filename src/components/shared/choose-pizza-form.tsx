'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { IngredientsList } from './ingredients-list';
import { Button } from '../ui/button';
import { Title } from './title';
import { PizzaSelector } from './pizza-selector';
import { IProduct, useChoosePizza } from '@/hooks/use-choose-pizza';
// import { useSet } from 'react-use';
import toast from 'react-hot-toast';

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: IProduct['ingredients'];
	items?: IProduct['items'];
	onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm = ({
													 name,
													 items,
													 imageUrl,
													 ingredients,
													 onClickAdd,
													 className,
												 }: Props) => {
	const {
		size,
		type,
		availablePizzaSizes,
		setPizzaSize,
		setPizzaType,
		textDetaills,
		loading,
		addPizza,
		selectedIngredientsIds,
		toggleAddIngredient,
	} = useChoosePizza(items);

	const totalIngredientPrice: number =
		ingredients
			?.filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
			?.reduce((acc, item) => acc + item.price, 0) || 0;

	const pizzaPrice: number = items?.find((item) => item.pizzaType === type)?.price || 0;
	const totalPrice: number = totalIngredientPrice + pizzaPrice;

	const handleClickAdd = async () => {
		try {
			await addPizza();
			onClickAdd?.();
		} catch (error) {
			toast.error('Произошла ошибка при добавлении в корзину');
			console.error(error);
		}
	};

	return (
		<div className={cn(className, 'flex flex-col lg:flex-row flex-1')}>
			<ProductImage imageUrl={imageUrl} size={size} className="flex-shrink-0 lg:flex-1 min-h-[180px] sm:min-h-[300px]" />

			<div className="w-full lg:w-[490px] bg-[#FCFCFC] p-2.5 sm:p-5 lg:p-7">
				<Title text={name} size="md" className="font-extrabold mb-0.5 text-base sm:text-xl lg:text-2xl" />

				<p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-3">{textDetaills}</p>

				<div className="mb-2 sm:mb-4 lg:mb-5">
					<PizzaSelector
						pizzaSizes={availablePizzaSizes}
						selectedSize={String(size)}
						selectedPizzaType={String(type)}
						onClickSize={setPizzaSize}
						onClickPizzaType={setPizzaType}
					/>
				</div>

				<div className="bg-gray-50 p-2 sm:p-3 lg:p-5 rounded-md h-[200px] sm:h-[280px] lg:h-[420px] overflow-auto mb-2 sm:mb-3 scrollbar-hide">
					<IngredientsList
						ingredients={ingredients}
						onClickAdd={toggleAddIngredient}
						selectedIds={selectedIngredientsIds}
					/>
				</div>
				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[40px] sm:h-[48px] lg:h-[55px] px-4 sm:px-6 lg:px-10 text-xs sm:text-sm lg:text-base rounded-[18px] w-full">
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
