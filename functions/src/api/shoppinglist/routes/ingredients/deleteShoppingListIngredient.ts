import {Request, Response} from "express";

import * as shoppingList from "@api/shoppinglist/shoppinglist";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function deleteShoppingListIngredient(request: Request, response: Response): Promise<Response> {
  const userId = request.user.userId;
  const shoppingListId = request.params.shoppingListId;
  const shoppingIngredientId = request.params.shoppingIngredientId;

  return shoppingList.deleteShoppingListIngredient(userId, shoppingListId, shoppingIngredientId)
      .then((writeResult) => {
        return response.json(writeResult);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
