import { useCart } from './use-cart';

interface ProductItem {
	id: number;
	size?: number | null;
	pizzaType?: number | null;
}

export const useCartItemQuantity = (productItemId: number) => {
	const { items } = useCart();

	const cartItem = items.find(item => (item.productItem as ProductItem)?.id === productItemId);

	return cartItem?.quantity || 0;
};
