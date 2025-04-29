import { useCart } from './use-cart';

export const useCartItemQuantity = (productItemId: number) => {
	const { items } = useCart();

	const cartItem = items.find(item => item.productItem?.id === productItemId);

	return cartItem?.quantity || 0;
};
