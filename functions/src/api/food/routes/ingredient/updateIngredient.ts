import {Request, Response} from "express";

import * as food from "@api/food/food";

import {Ingredient} from "@api/food/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function updateIngredient(request: Request, response: Response): Promise<Response<any>> {
  const ingredientData: Ingredient = {
    identifier: request.params.ingredientId,
    name: request.body.name,
    generic_name: request.body.generic_name,
    flagged: request.body.flagged,
    stores: request.body.stores,
    images: request.body.images,
    description: request.body.description,
    price: request.body.price,
    weight: request.body.weight,
    dietary: request.body.dietary,
  };

  return food.updateIngredient(ingredientData)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
