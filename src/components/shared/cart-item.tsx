'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { CountButtonProps } from './count-button';

interface Props extends CartItemProps {
    onClickRemove: () => void;
    onClickCountButton: CountButtonProps['onClick'];
}

export const CartItem = ({
                                              name,
                                              price,
                                              imageUrl,
                                              quantity,
                                              className,
                                              onClickCountButton,
                                              onClickRemove
                                          }: Props) => {
    return (
        <div className={cn('flex items-center justify-between gap-3', className)}>
            <div className="flex items-center gap-3 md:gap-5 flex-1">
                <CartItemDetails.Image src={imageUrl} />
                <CartItemDetails.Info name={name} className='text-sm md:text-base' />
            </div>

            <CartItemDetails.Price value={price} className='text-sm md:text-base' />

            <div className="flex items-center gap-3 md:gap-5 ml-2 md:ml-20">
                <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
                <button onClick={onClickRemove}>
                    <X className="text-gray-400 cursor-pointer hover:text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
};
