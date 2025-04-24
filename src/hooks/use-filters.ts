import { useSet } from 'react-use';
import React, { useState, useEffect } from 'react';

// Используем обычный интерфейс для синхронных параметров
interface FiltersParams {
	ingredients?: string;
	pizzaTypes?: string;
	sizes?: string;
	priceFrom?: string;
	priceTo?: string;
	limit?: string;
	page?: string;
}

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
}

interface ReturnProps extends Filters {
	setPrices: (prices: PriceProps) => void;
	setPizzaTypes: (id: string) => void;
	setSizes: (value: string) => void;
	setIngredients: (value: string) => void;
}

export const useFilters = (initialParams?: FiltersParams): ReturnProps => {
	// Инициализируем фильтры на основе полученных параметров
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(initialParams?.ingredients ? initialParams.ingredients.split(',') : []),
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(initialParams?.sizes ? initialParams.sizes.split(',') : []),
	);

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(initialParams?.pizzaTypes ? initialParams.pizzaTypes.split(',') : []),
	);

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: initialParams?.priceFrom ? Number(initialParams.priceFrom) : undefined,
		priceTo: initialParams?.priceTo ? Number(initialParams.priceTo) : undefined,
	});

	return {
		sizes,
		pizzaTypes,
		selectedIngredients,
		prices,
		setPrices,
		setPizzaTypes: togglePizzaTypes,
		setSizes: toggleSizes,
		setIngredients: toggleIngredients,
	};
};
