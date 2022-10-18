import {Request, Response} from "express";

import * as food from "@api/food/ingredients";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getReportedIngredients(request: Request, response: Response) {
  return await food.queryIngredients(undefined, false)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
