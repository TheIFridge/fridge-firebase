import {Request, Response} from "express";

import * as food from "@api/food/food";

import {Recipe} from "@api/food/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function addRecipe(request: Request, response: Response): Promise<Response<any>> {
  const recipeData: Recipe = {
    identifier: request.params.recipeId,
    title: request.body.title,
    description: request.body.description,
    ingredients: request.body.ingredients,
    instructions: request.body.instructions,
    tags: request.body.tags,
    images: request.body.images,
    nutrition: request.body.nutrition,
    mealtime: request.body.mealtime,
  };
  // TODO: Validator

  return await food.addRecipe(recipeData)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
