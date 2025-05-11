import { CartItemDTO, CartResponse } from '../../services/dto/cart';
import { calcCartItemTotalAmount } from './calc-cart-item-total-amount';
import { ICartItem } from '../../store/cart';
import { Ingredient } from '@prisma/client';

type ReturnProps = {
	items: ICartItem[];
	totalAmount: number;
};

export const getCartDetails = (data: CartResponse): ReturnProps => {
	const items = (data?.items || []).map((item: CartItemDTO) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalAmount(item),
		pizzaSize: item.pizzaSize,
		type: item.type,
		productItem: {
			size: item.productItem.size,
			pizzaType: item.productItem.pizzaType,
		},
		ingredients: (item.ingredients || []).map((ingredient: Ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return { items, totalAmount: data?.totalAmount || 0 };
};
