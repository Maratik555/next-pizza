import { ICartItem } from '../../../../store/cart';

interface Props {
	name: string;
	pizzaSize?: number | null;
	type?: number | null;
	ingredients?: ICartItem['ingredients'];
	productItem?: {
		size?: number | null;
		pizzaType?: number | null;
	};
}

export const CartItemInfo = ({
	name,
	pizzaSize,
	type,
	ingredients,
	productItem,
}: Props) => {
	const details = [];

	// Используем pizzaSize/type если они переданы, или берем из productItem если доступны
	const actualSize = pizzaSize !== undefined && pizzaSize !== null ? pizzaSize : productItem?.size;

	const actualType = type !== undefined && type !== null ? type : productItem?.pizzaType;

	if (
		actualSize !== undefined &&
		actualSize !== null &&
		actualType !== undefined &&
		actualType !== null
	) {
		const typeName = actualType === 1 ? 'Традиционное' : 'Тонкое';
		details.push(`${typeName} ${actualSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map(ingredient => ingredient.name));
	}

	return (
		<div>
			<div className='flex items-center justify-between'>
				<h2 className='text-base font-bold flex-1 leading-6'>{name}</h2>
			</div>
			<p className='text-xs text-gray-400'>{details.join(', ')}</p>
		</div>
	);
};
