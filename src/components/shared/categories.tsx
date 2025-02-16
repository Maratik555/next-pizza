import {cn} from "@/lib/utils";


interface Props {
    // items: Category[];
    className?: string;
}

export const Categories = ({className}: Props) => {
    // const activeId = useCategoryStore((state) => state.activeId);

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>{

        }
        </div>

    )
};