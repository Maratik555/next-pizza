'use client';

import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import ReactStories from 'react-insta-stories';
import { Api } from './../../../services/api-client';
// import { Story, StoryItem } from '@prisma/client';
import { IStory } from './../../../services/stories';
import { X } from 'lucide-react';

interface Props {
	className?: string;
}

export const Stories = ({ className }: Props) => {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	if (!mounted) {
		return (
			<Container className={cn('flex items-center justify-between gap-2 my-10 overflow-x-auto', className)}>
				{[...Array(6)].map((_, index) => (
					<div
						key={index}
						className='w-[150px] sm:w-[200px] h-[200px] sm:h-[250px] bg-gray-200 rounded-md animate-pulse flex-shrink-0'
					/>
				))}
			</Container>
		);
	}

	const onClickStory = (story: IStory) => {
		console.log('Clicked story:', story);
		setSelectedStory(story);
		setOpen(true);
	};

	return (
		<>
			<Container className={cn('flex items-center justify-between gap-2 my-10 overflow-x-auto', className)}>
				{stories.length === 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='w-[150px] sm:w-[200px] h-[200px] sm:h-[250px] bg-gray-200 rounded-md animate-pulse flex-shrink-0'
						/>
					))}
				{stories.map(story => (
					<img
						key={story.id}
						onClick={() => onClickStory(story)}
						className='rounded-md cursor-pointer flex-shrink-0 w-[150px] sm:w-[200px] h-[200px] sm:h-[250px] object-cover'
						alt='Story'
						src={story.previewImageUrl}
					/>
				))}
			</Container>
			{open && (
				<div className='fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-20 p-4'>
					<div
						className='relative w-full max-w-[520px]'>
						<button
							className='absolute -right-2 -top-12 sm:-right-10 sm:-top-5 z-30'
							onClick={() => setOpen(false)}>
							<X className='w-8 h-8 text-white/50' />
						</button>
						{selectedStory && selectedStory.items && selectedStory.items.length > 0 ? (
							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={selectedStory.items.map(item => ({ url: item.sourceUrl }))}
								defaultInterval={5000}
								width='100%'
								height='auto'
							/>
						) : (
							<div className='text-white '>Нет доступных элементов для этой истории.</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
