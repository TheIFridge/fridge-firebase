import {Request, Response} from "express";

import * as food from "@api/food/food";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getRecipes(request: Request, response: Response): Promise<Response<any>> {
  return food.getRecipes()
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
