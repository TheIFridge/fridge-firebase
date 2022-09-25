import {Request, Response} from "express";

import {deleteInventoryItem} from "@api/inventory/inventory";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function deleteUserIngredient(request: Request, response: Response): Promise<Response<any>> {
  const userId = request.params.userId;
  const ingredientId = request.params.ingredientId;

  return deleteInventoryItem(userId, ingredientId)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
