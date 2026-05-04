import { PizzaSize } from '@/lib/pizza-details-to-text';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	imageUrl: string;
	size: PizzaSize;
}


export const ProductImage = ({ className, imageUrl, size }: Props) => {
	return (
		<div className={cn('flex items-center justify-center flex-1 relative w-full min-h-[180px] sm:min-h-[300px] lg:min-h-[500px]', className)}>
			<img
				src={imageUrl}
				alt="Logo"
				style={{ left: '0.3rem', top: '0.3rem' }}
				className={cn('relative transition-all z-10 duration-300 object-contain', {
					'w-[160px] h-[160px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]': size === 20,
					'w-[190px] h-[190px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]': size === 30,
					'w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px]': size === 40,
				})}
			/>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] lg:w-[370px] lg:h-[370px]" />
		</div>
	);
};
