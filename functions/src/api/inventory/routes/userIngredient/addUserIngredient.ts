import {Request, Response} from "express";

import {addInventoryItem} from "@api/inventory/inventory";
import {getIngredient} from "@api/food/ingredients";

import {UserIngredientData} from "@api/inventory/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function addUserIngredient(request: Request, response: Response): Promise<Response<any>> {
  const ingredientId = request.params.ingredientId;
  const userId = request.params.userId;

  return await getIngredient(ingredientId)
      .then((ingredient) => {
        const userIngredient: UserIngredientData = {
          ingredient: ingredient.identifier,
          quantity: request.body.quantity,
          expiry: request.body.expiry,
        };

        return addInventoryItem(userId, ingredientId, userIngredient)
            .then((data) => {
              return response.json(data);
            })
            .catch((error) => {
              // TODO: Handle error so we don't expose internal server errors to the user
              console.error(error);
              return response.status(500).json({error: error.message});
            });
      })
      .catch((error) => {
        const userIngredient: UserIngredientData = {
          ingredient: ingredientId,
          quantity: request.body.quantity,
          expiry: request.body.expiry,
        };

        return addInventoryItem(userId, ingredientId, userIngredient)
            .then((data) => {
              return response.json(data);
            })
            .catch((error) => {
              // TODO: Handle error so we don't expose internal server errors to the user
              console.error(error);
              return response.status(500).json({error: error.message});
            });
        // console.log(error);
        // return response.status(500).json({ error: error.message });
      });
}
