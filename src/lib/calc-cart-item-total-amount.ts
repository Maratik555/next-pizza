import { CartItemDTO } from '../../services/dto/cart.dto';

interface Ingredient {
	id: number;
	price: number;
	name?: string;
	createdAt?: Date;
	updatedAt?: Date;
	imageUrl?: string;
}

export const calcCartItemTotalAmount = (item: CartItemDTO): number => {
	const ingredientsPrice =
		item.ingredients?.reduce(
			(acc: number, ingredient: Ingredient) => acc + (ingredient.price || 0),
			0,
		) || 0;

	return (ingredientsPrice + item.productItem.price) * item.quantity;
};
