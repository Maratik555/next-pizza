import debounce from 'lodash.debounce';
import { ICartItem, useCartStore } from '../../store/cart';
import React from 'react';
import { CreateCartItemValues } from '../../services/dto/cart';

type ReturnProps = {
	totalAmount: number;
	items: ICartItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	removeItemsAll: () => void;
	addCartItem: (values: CreateCartItemValues) => void;
	isInitialized: boolean; // New flag to indicate if data is ready
};


export const useCart = (runFetch?: boolean): ReturnProps => {
	// Track initialization state
	const [isInitialized, setIsInitialized] = React.useState(false);

	// Use individual selectors with safe fallbacks
	const totalAmount = useCartStore(state => state?.totalAmount ?? 0);
	const items = useCartStore(state => state?.items ?? []);
	const fetchCartItems = useCartStore(state => state?.fetchCartItems);
	const loading = useCartStore(state => state?.loading ?? false);
	const addCartItem = useCartStore(state => state?.addCartItem ?? (() => {}));
	const removeCartItem = useCartStore(state => state?.removeCartItem ?? (() => {}));
	const removeItemsAll  = useCartStore(state => state?.removeItemsAll ?? (() => {}));

	// Safer memoization with explicit type checking
	const updateItemQuantity = React.useMemo(() => {
		try {
			const storeState = useCartStore.getState();
			if (storeState && typeof storeState.updateItemQuantity === 'function') {
				return debounce(storeState.updateItemQuantity, 200);
			}
			// Fallback function that does nothing
			return debounce(() => {
				console.warn('updateItemQuantity not available in store');
			}, 200);
		} catch (error) {
			console.error('Error creating updateItemQuantity function:', error);
			return debounce(() => {}, 200);
		}
	}, []);

	React.useEffect(() => {
		if (runFetch && typeof fetchCartItems === 'function') {
			const fetchData = async () => {
				try {
					await fetchCartItems();
				} catch (error) {
					console.error('Error fetching cart items:', error);
				} finally {
					setIsInitialized(true);
				}
			};

			fetchData();
		} else {
			setIsInitialized(true);
		}
	}, [fetchCartItems, runFetch]);

	return {
		totalAmount,
		items,
		loading,
		addCartItem,
		updateItemQuantity,
		removeCartItem,
		isInitialized,
		removeItemsAll,
	};
};