import { Request, Response } from "express";

import * as food from "@api/food/food";

export async function getIngredient(request: Request, response: Response): Promise<Response<any>> {
    const identifier = request.params.ingredientId;

    return food.getIngredient(identifier)
        .then((inventoryData) => {
            return response.json(inventoryData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}