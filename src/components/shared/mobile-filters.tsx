'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { Filters } from './filters';

interface FiltersParams {
	ingredients?: string;
	pizzaTypes?: string;
	sizes?: string;
	priceFrom?: string;
	priceTo?: string;
	limit?: string;
	page?: string;
}

interface Props {
	initialParams?: FiltersParams;
}

export const MobileFilters = ({ initialParams }: Props) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" className="w-full flex items-center gap-2">
					<SlidersHorizontal className="w-4 h-4" />
					Фильтры
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[300px] overflow-y-auto bg-white">
				<SheetHeader>
					<SheetTitle>Фильтры</SheetTitle>
				</SheetHeader>
				<div className="mt-4">
					<Filters initialParams={initialParams} />
				</div>
			</SheetContent>
		</Sheet>
	);
};
