import { Request, Response } from "express";

import { addInventoryItem } from "@api/inventory/inventory";
import { getIngredient } from "@api/food/food";

import { UserIngredientData } from "@api/inventory/types";

export async function addUserIngredient(request: Request, response: Response): Promise<Response<any>> {
    const userId = request.params.userId;

    return await getIngredient(request.body.ingredient)
        .then((ingredient) => {
            const userIngredient: UserIngredientData = {
                ingredient: ingredient,
                quantity: request.body.quantity,
                expiry: request.body.expiry                                    
            }
            
            return addInventoryItem(userId, userIngredient)
                    .then((data) => {
                        return response.json(data);
                    })
                    .catch((error) => {
                        // TODO: Handle error so we don't expose internal server errors to the user
                        console.error(error);
                        return response.status(500).json({ error: error.message });
                    });
        })
        .catch((error) => {
            console.log(error);
            return response.status(500).json({ error: error.message });
        });
}