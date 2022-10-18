import {Ingredient} from "@api/food/types";

export const SHOPPINGLIST_COLLECTION = "shoppinglist";

export interface ShoppingList {
    identifier: string;
    ingredients: ShoppingIngredient[];
}

export interface ShoppingIngredient {
    ingredient: Ingredient;
    quantity: number;
}
