const INVENTORY_COLLECTION = 'inventory';

interface Inventory {
    ingredients: UserIngredient[];
    reminder_enabled: boolean;
    expiry_enabled: boolean;
}

interface InventoryData {
    reminder_enabled?: boolean;
    expiry_enabled?: boolean;
}

interface InventoryError {
    reminder_enabled?: string;
    expiry_enabled?: string;
}

interface UserIngredient {
    identifier: string;
    ingredient: Ingredient;
    quantity: number;
    expiry: Date;
}

interface UserIngredientData {
    ingredient?: Ingredient;
    quantity?: number;
    expiry?: Date;
}

interface UserIngredientError {
    ingredient?: string;
    quantity?: string;
    expiry?: string;
}