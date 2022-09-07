export const INGREDIENT_COLLECTION = 'ingredient';
export const RECIPE_COLLECTION = 'recipe';
export const RECIPE_INGREDIENT_COLLECTION = 'recipeIngredient';
export const STORE_COLLECTION = 'store';

export interface Store {
    identifier: string;
    name: string;
}

export interface Recipe {
    identifier: string;
    title: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    tags: string[];
    images?: string[];
    nutrition?: number;
    mealtime?: string;
    servings?: string;
    prepDuration?: string;
    cookingDuration?: string;
}

export interface RecipeError {
    title?: string;
    description?: string;
    ingredients?: string;
    instructions?: string;
    tags?: string;
    images?: string;
    nutrition?: string;
    mealtime?: string;
    servings?: string;
    prepDuration?: string;
    cookingDuration?: string;
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    min_quantity: number;
    max_quantity?: number;
    measurement_value: string;
    measurement_unit: string;
}

export interface Ingredient {
    identifier: string;
    name: string;
    flagged: FlaggedIngredient
    stores: Store[];
    images?: string[];
    description?: string;
    price?: number;
    weight?: number;
    dietary?: string[];
}

export interface IngredientError {
    identifier?: string;
    name?: string;
    flagged?: FlaggedIngredient
    stores?: Store[];
    images?: string[];
    description?: string;
    price?: number;
    weight?: number;
    dietary?: string[];
}

export interface FlaggedIngredient {
    flagged: boolean;
    reason: string;
    date: Date;
    users: string[];
}