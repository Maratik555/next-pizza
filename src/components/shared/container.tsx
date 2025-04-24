import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

export const Container = ({ className, children }: React.PropsWithChildren<Props>) => {
    return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};
