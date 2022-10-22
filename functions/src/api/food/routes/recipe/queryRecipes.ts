import {Request, Response} from "express";

import * as food from "@api/food/recipe";

import {SearchRecipeQuery} from "../../types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function queryRecipes(request: Request, response: Response) {
  const queryData: SearchRecipeQuery = {
    name: request.body.name,
  };

  return await food.queryRecipes(queryData.name)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
