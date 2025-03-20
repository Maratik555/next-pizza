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
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className="flex items-center justify-between ">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};