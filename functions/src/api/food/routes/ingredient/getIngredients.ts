import { Request, Response } from "express";

import * as food from "@api/food/food";

export async function getIngredients(request: Request, response: Response) {
        return await food.getIngredients()
        .then((data) => {
            return response.json(data);
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.message });
        })
}