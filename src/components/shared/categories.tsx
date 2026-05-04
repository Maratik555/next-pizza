'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '../../../store/category';
import { Category } from '@prisma/client';

interface Props {
	items: Category[];
	className?: string;
}

export const Categories = ({ className, items }: Props) => {
	const activeId = useCategoryStore(state => state.activeId);

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl overflow-x-auto scrollbar-hide', className)}>
			{items.map(category => (
				<a
					key={category.id}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-2.5 md:px-5 whitespace-nowrap text-xs md:text-base shrink-0',
						activeId === category.id && 'bg-white shadow-md shadow-gray-200 text-primary',
					)}
					href={`/#${encodeURIComponent(category.name)}`}
                    >
					{category.name}
				</a>
			))}
		</div>
	);
};
