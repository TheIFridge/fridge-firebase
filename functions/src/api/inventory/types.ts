import {Ingredient} from "@api/food/types";

export const INVENTORY_COLLECTION = "inventory";

export interface Inventory {
    ingredients: UserIngredientData[] | Ingredient[];
    reminder_enabled: boolean;
    expiry_enabled: boolean;
}

export interface InventoryData {
    reminder_enabled?: boolean;
    expiry_enabled?: boolean;
}

export interface InventoryError {
    reminder_enabled?: string;
    expiry_enabled?: string;
}

export interface UserIngredient {
    ingredient: Ingredient;
    quantity: number;
    expiry: Date;
}

export interface UserIngredientData {
    ingredient: string | Ingredient;
    quantity: number;
    expiry: Date;
}

export interface UserIngredientError {
    ingredient?: string;
    quantity?: string;
    expiry?: string;
}
