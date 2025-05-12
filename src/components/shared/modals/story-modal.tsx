'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React from 'react';
import Stories from 'react-insta-stories';
import 'stories-react/dist/index.css';
import { IStory } from './../../../../services/stories';


// interface StoryItem {
// 	id: string;
// 	title: string;
// 	// добавь другие поля, если нужно
// }

interface Props {
	items: IStory[];
	activeIndex: number;
	className?: string;
}

export const StoryModal = ({ className, items, activeIndex }: Props) => {
	return (
		<div
			className={cn(
				className,
				'flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/90 py-10',
			)}>
			<div className='h-full relative w-[540px] overflow-hidden rounded'>
				<button className='w-8 h-8 bg-white rounded-full flex items-center justify-center absolute top-4 right-4 z-10'>
					<X className='w-5 h-5 text-gray-400' />
				</button>
				<Stories
					currentIndex={activeIndex}
					width='540px'
					height='100%' stories={[]}					// stories={items}
				/>
			</div>
		</div>
	);
};
