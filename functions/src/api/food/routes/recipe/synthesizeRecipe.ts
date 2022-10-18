import {Request, Response} from "express";

import * as food from "@api/food/recipe";

import {SearchRecipeQuery} from "../../types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function synthesizeRecipes(request: Request, response: Response) {
  const queryData: SearchRecipeQuery = {
    ingredients: request.body.ingredients,
  };

  return await food.synthesizeRecipe(queryData.ingredients as string[])
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
