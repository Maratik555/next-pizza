import { cn } from '@/lib/utils';

interface Props {
    src: string;
    className?: string;
}

export const CartItemDetailsImage = ({ src, className }: Props) => {
    return <img className={cn('w-[60px] h-[60px]', className)} src={src} alt={''} />;
};
