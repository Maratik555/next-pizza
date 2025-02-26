'use client';
import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from "@/lib/utils"
import { ProductCard } from './product-card';
import { useCategoryStore } from '../../../store/category';
// import { ProductWithRelations } from '@/@types/prisma';

interface Props {
    title: string;
    items: any[];
    categoryId?: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList = ({
                                                       title,
                                                       items,
                                                       listClassName,
                                                       categoryId,
                                                       className,
                                                   }: Props) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef(null);

    // @ts-ignore
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                        // ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};
