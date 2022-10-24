import {Request, Response} from "express";

import * as shoppingList from "@api/shoppinglist/shoppinglist";
/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function putShoppingList(request: Request, response: Response): Promise<Response> {
  const userId = request.user.userId;
  const shoppingListId = request.params.shoppingListId;

  return shoppingList.createShoppingList(userId, shoppingListId)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
