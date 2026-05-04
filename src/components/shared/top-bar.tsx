import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import {Categories} from "@/components/shared/categories";
import {SortPopup} from "@/components/shared/sort-popup";
import {Category} from "@prisma/client";


interface Props {
    categories: Category[];
    className?: string;
}

export const TopBar = ({className, categories }: Props) => {
    return (
        <div className={cn('sticky top-0 bg-white shadow-lg shadow-black/5 z-10', className)}>
            {/* Категории — скролл на мобильных */}
            <div className="mx-auto max-w-[1280px] px-4 pt-3 pb-2 md:py-5 flex items-center gap-2">
                <Categories items={categories} className="min-w-0 flex-1" />
                <SortPopup className="shrink-0" />
            </div>
        </div>
    );
};