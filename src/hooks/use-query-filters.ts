import React from "react";
import qs from "qs";
import {Filters} from "@/hooks/use-filters";
import {useRouter} from "next/navigation";


export const useQueryFilters = (filters: Filters) =>
{
    const router = useRouter();

    React.useEffect(() => {
        const query = qs.stringify({
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients)
        }, {
            arrayFormat: 'comma'
        });

        router.push(`?${query}`, {scroll: false});
    }, [filters.prices, filters.sizes, filters.selectedIngredients, filters.pizzaTypes, router]);
};