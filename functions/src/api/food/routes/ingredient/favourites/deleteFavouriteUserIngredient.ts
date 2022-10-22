import {Request, Response} from "express";

import * as favourites from "@api/food/favourites";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function deleteFavouriteUserIngredient(request: Request, response: Response): Promise<Response> {
  const userId = request.user.userId;
  const ingredientId = request.params.ingredientId;

  return favourites.removeFavouriteUserIngredient(userId, ingredientId)
      .then(() => {
        return response.json({message: "Successfully added ingredient to favourites"});
      })
      .catch((error) => {
        return response.status(500).json({error: error.message});
      });
}
