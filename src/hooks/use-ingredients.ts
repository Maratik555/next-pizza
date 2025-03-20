import React from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "../../services/api-client";


export const useIngredients = () => {
    const [loading, setLoading] = React.useState(true);
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchIngredients();
    }, []);

    return {
        ingredients,
        loading
    }
};