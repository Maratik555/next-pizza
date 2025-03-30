import { CartItemDTO } from '../../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc: any, ingredient: any) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};
