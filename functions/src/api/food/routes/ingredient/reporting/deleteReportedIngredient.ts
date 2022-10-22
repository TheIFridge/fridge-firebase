import {Request, Response} from "express";

import * as food from "@api/food/ingredients";

import {FlaggedData, PartialIngredient} from "@api/food/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function updateReportedIngredient(request: Request, response: Response): Promise<Response<any>> {
  const flaggedData: FlaggedData = {
    reason: request.body.reason,
    date: Date.now(),
  };

  const ingredientData: PartialIngredient = {
    identifier: request.params.ingredientId,
    flagged: {
      flagged: request.body.flagged,
      reasons: {[request.user.userId]: flaggedData},
    },
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
