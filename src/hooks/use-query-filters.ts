import React from 'react';
import qs from 'qs';
import { Filters } from '@/hooks/use-filters';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
	// Используем useRef для хранения предыдущего значения запроса
	const prevQueryRef = React.useRef<string>('');

	// Используем useCallback, чтобы функция не создавалась заново при каждом рендере
	const updateUrl = React.useCallback(
		(query: string) => {
			if (prevQueryRef.current === query) {
				return;
			}

			prevQueryRef.current = query;

			// Очищаем предыдущий таймер если он есть
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Устанавливаем новый таймер
			timeoutRef.current = setTimeout(() => {
				router.push(`?${query}`, { scroll: false });
			}, 300);
		},
		[router],
	);

	React.useEffect(() => {
		const query = qs.stringify(
			{
				...filters.prices,
				pizzaTypes: Array.from(filters.pizzaTypes).join(','),
				sizes: Array.from(filters.sizes).join(','),
				ingredients: Array.from(filters.selectedIngredients).join(','),
			},
			{
				skipNulls: true,
				arrayFormat: 'comma',
				addQueryPrefix: false,
				encode: true,
				filter: (prefix, value) => {
					// Если значение пустое, не включаем его в запрос
					if (
						value === '' ||
						value === '0' ||
						(Array.isArray(value) && value.length === 0) ||
						(typeof value === 'string' && value.length === 0)
					) {
						return;
					}
					return value;
				},
			},
		);

		updateUrl(query);

		// Очищаем таймер при размонтировании
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [filters, updateUrl]);
};
