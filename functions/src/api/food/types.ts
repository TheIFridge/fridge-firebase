const INGREDIENT_COLLECTION = 'ingredient';

interface Store {
    identifier: string;
    name: string;
}

interface Recipe {
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

interface RecipeIngredient {
    ingredient: Ingredient;
    min_quantity: number;
    max_quantity?: number;
    measurement_value: string;
    measurement_unit: string;
}

interface Ingredient {
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

interface IngredientData {
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

interface IngredientError {
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

interface FlaggedIngredient {
    flagged: boolean;
    reason: string;
    date: Date;
    users: string[];
}