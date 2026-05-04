'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filters } from './filters';
import { Button } from '../ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  initialParams?: Record<string, string>;
}

export const FiltersDrawer = ({ initialParams }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Фильтры
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto scrollbar-hide bg-white px-6">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left">Фильтрация</SheetTitle>
        </SheetHeader>
        <div>
          <Filters initialParams={initialParams} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
