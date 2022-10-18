import {Request, Response} from "express";

import * as shoppingList from "@api/shoppinglist/shoppinglist";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getShoppingList(request: Request, response: Response): Promise<Response<any>> {
  const userId = request.user.userId;

  return shoppingList.getShoppingList(userId)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
