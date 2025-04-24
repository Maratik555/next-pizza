import { cn } from '@/lib/utils';

interface Props {
    value: number;
    className?: string;
}

export const CartItemDetailsPrice = ({ value, className }: Props) => {
    return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
