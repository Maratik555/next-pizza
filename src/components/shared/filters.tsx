'use client';

import React from 'react';

import { Title } from '@/components/shared/title';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group';
import { useIngredients } from '@/hooks/use-ingredients';
import { useFilters } from '@/hooks/use-filters';
import { useQueryFilters } from '@/hooks/use-query-filters';

interface FiltersParams {
	ingredients?: string;
	pizzaTypes?: string;
	sizes?: string;
	priceFrom?: string;
	priceTo?: string;
	limit?: string;
	page?: string;
}

interface Props {
	className?: string;
	initialParams?: FiltersParams;
}

export const Filters = ({ className, initialParams }: Props) => {
	const { ingredients, loading } = useIngredients();
	const filters = useFilters(initialParams);
	useQueryFilters(filters);

	const items = ingredients.map(item => ({ value: String(item.id), text: item.name }));

	const updatePrices = (prices: number[]) => {
		filters.setPrices({
			priceFrom: prices[0],
			priceTo: prices[1],
		});
	};

	return (
		<div className={className}>
			<Title
				text='Фильтрация'
				size='sm'
				className='mb-5 font-bold'
			/>

			{/*/!* Верхние чекбоксы *!/*/}

			<CheckboxFiltersGroup
				title='Тип теста'
				name='pizzaTypes'
				className='mb-5'
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				]}
			/>

			<CheckboxFiltersGroup
				title='Размеры'
				name='sizes'
				className='mb-5'
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			{/* Фильтр цен */}
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom || '0')}
						onChange={e =>
							filters.setPrices({
								...filters.prices,
								priceFrom: Number(e.target.value),
							})
						}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						value={String(filters.prices.priceTo)}
						onChange={e =>
							filters.setPrices({
								...filters.prices,
								priceTo: Number(e.target.value),
							})
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Ингредиенты'
				name='ingredients'
				className='mt-5'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selected={filters.selectedIngredients}
			/>
		</div>
	);
};
