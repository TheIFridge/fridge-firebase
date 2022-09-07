import { Request, Response } from "express";

import { updateInventoryItem } from "@api/inventory/inventory";

import { UserIngredientError, UserIngredientData } from "@api/inventory/types";

interface UserIngredientValidatorOutput {
    errors: UserIngredientError;
    valid: boolean;
}

const validateUserIngredientUpdateData = (data: UserIngredientData): UserIngredientValidatorOutput => {
    let errors: UserIngredientError = {};

    // validators
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

async function updateUserIngredient(request: Request, response: Response) {
    const data: UserIngredientData = {
        ingredient: request.body.ingredient,
        quantity: request.body.quantity,
        expiry: request.body.expiry,
    }
    
    const { valid, errors } = validateUserIngredientUpdateData(data);
    if (!valid) return response.status(400).json(errors);

    const identifier = request.params.w;

    return updateInventoryItem(identifier, data)
        .then((userIngredientData) => {
            return response.json(userIngredientData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}

export { updateUserIngredient };