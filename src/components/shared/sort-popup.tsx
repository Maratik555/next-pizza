'use client';

import { cn } from "@/lib/utils";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
    { label: 'Популярное', value: 'popular' },
    { label: 'Новинки', value: 'new' },
    { label: 'Дешевле', value: 'price_asc' },
    { label: 'Дороже', value: 'price_desc' },
];

interface Props {
    className?: string;
}

export const SortPopup = ({ className }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const currentSort = searchParams.get('sortBy') || 'popular';
    const selected = SORT_OPTIONS.find(o => o.value === currentSort) || SORT_OPTIONS[0];

    const handleSelect = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sortBy', value);
        router.push(`?${params.toString()}`, { scroll: false });
        setOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative shrink-0">
            <button
                onClick={() => setOpen(prev => !prev)}
                className={cn(
                    'inline-flex items-center gap-1 bg-gray-50 px-2.5 md:px-5 h-11 rounded-2xl cursor-pointer text-xs md:text-base select-none hover:bg-gray-100 transition-colors shrink-0',
                    className
                )}
            >
                <ArrowUpDown size={13} className="md:w-4 md:h-4 shrink-0" />
                <b className="hidden sm:inline whitespace-nowrap">Сортировка:</b>
                <b className="text-primary whitespace-nowrap">{selected.label}</b>
                <ChevronDown size={13} className={cn('transition-transform duration-200 shrink-0', open && 'rotate-180')} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[160px] z-50">
                    {SORT_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={cn(
                                'w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors',
                                selected.value === option.value ? 'text-primary' : 'text-foreground'
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
