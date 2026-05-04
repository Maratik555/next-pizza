import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    price: number;
    active?: boolean;
    onClick?: () => void;
}

export const Ingredient = ({
                                                className,
                                                active,
                                                price,
                                                name,
                                                imageUrl,
                                                onClick
                                            }: Props) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center flex-col p-1 sm:p-1.5 lg:p-2 rounded-md w-full text-center relative cursor-pointer shadow-md bg-white',
                { 'border border-primary': active },
                className,
            )}>
            {active && <CircleCheck className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 lg:top-2 lg:right-2 text-primary w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
            <img className="w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28 object-contain mb-0.5 sm:mb-1" src={imageUrl} alt={name} />
            <span className="text-[9px] sm:text-[10px] lg:text-xs mb-0.5 sm:mb-1 line-clamp-2 leading-tight">{name}</span>
            <span className="font-bold text-[10px] sm:text-xs lg:text-sm">{price} ₽</span>
        </div>
    );
};
