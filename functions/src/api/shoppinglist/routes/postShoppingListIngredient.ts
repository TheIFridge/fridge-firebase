import {Request, Response} from "express";

import * as shoppingList from "@api/shoppinglist/shoppinglist";
import {ShoppingIngredient} from "../types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function postShoppingListIngredient(request: Request, response: Response): Promise<Response> {
  const userId = request.user.userId;
  const shoppingListId = request.params.shoppingListId;
  const shoppingIngredientId = request.params.shoppingIngredientId;

  const shoppingIngredient: ShoppingIngredient = {
    ingredient: request.body.ingredient,
    quantity: request.body.quantity,
  };

  return shoppingList.updateShoppingListIngredient(userId, shoppingListId, shoppingIngredientId, shoppingIngredient)
      .then((writeResult) => {
        return response.json(writeResult);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
