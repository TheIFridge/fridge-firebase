import {Request, Response} from "express";

import * as inventory from "@api/inventory/inventory";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getUserIngredient(request: Request, response: Response): Promise<Response<any>> {
  const identifier = request.user.userId;
  const ingredientId = request.params.ingredientId;

  return inventory.getInventoryItem(identifier, ingredientId)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
