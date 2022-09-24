import { Request, Response } from "express";

import * as food from "@api/food/food";

import { Ingredient, IngredientError } from "@api/food/types";
import { flaggedIngredientDefaults } from "@api/food/defaults";

interface IngredientValidatorOutput {
    errors: IngredientError;
    valid: boolean;
}

const validateIngredient = (data: Ingredient): IngredientValidatorOutput => {
    let errors: IngredientError = {};

    if (data.identifier == undefined) errors.identifier = 'Must not be empty';
    if (data.name == undefined) errors.name = 'Must not be empty';
    if (data.generic_name == undefined) errors.generic_name = 'Must not be empty';
    if (data.stores == undefined) errors.stores = 'Must not be empty';
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

export async function addIngredient(request: Request, response: Response): Promise<Response<any>> {
    const ingredientData: Ingredient = {
        identifier: request.params.ingredientId,
        name: request.body.name,
        generic_name: request.body.generic_name,
        flagged: flaggedIngredientDefaults(),
        stores: request.body.stores,
        images: request.body.images,
        description: request.body.description,
        price: request.body.price,
        weight: request.body.weight,
        dietary: request.body.dietary,
    }

    const { valid, errors } = validateIngredient(ingredientData);
    if (!valid) return response.status(400).json(errors);
    // TODO: Validator

    return await food.addIngredient(ingredientData)
        .then((data) => {
            return response.json(data);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}