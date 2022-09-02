import { Request, Response } from "express";

import { updateInventoryData } from "../inventory"

interface InventoryValidatorOutput {
    errors: InventoryError;
    valid: boolean;
}

const validateInventoryUpdateData = (data: InventoryData): InventoryValidatorOutput => {
    let errors: InventoryError = {};

    // validators
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

async function updateInventory(request: Request, response: Response) {
    const data: InventoryData = {
        reminder_enabled: request.body.reminder_enabled,
        expiry_enabled: request.body.expiry_enabled,
    }
    
    const { valid, errors } = validateInventoryUpdateData(data);
    if (!valid) return response.status(400).json(errors);

    const identifier = request.params.w;

    return updateInventoryData(identifier, data)
        .then((inventoryData) => {
            return response.json(inventoryData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}

export { updateInventory };