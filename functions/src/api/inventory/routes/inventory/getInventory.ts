import { Request, Response } from "express";

import { getInventoryData } from "@api/inventory/inventory";

export async function getInventory(request: Request, response: Response): Promise<Response<any>> {
    const userId = request.params.userId;

    return getInventoryData(userId)
        .then((inventoryData) => {
            return response.json(inventoryData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}