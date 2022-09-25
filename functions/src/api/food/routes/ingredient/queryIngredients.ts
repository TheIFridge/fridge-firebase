import {Request, Response} from "express";

import * as food from "@api/food/food";

import {SearchIngredientQuery} from "../../types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function queryIngredients(request: Request, response: Response) {
  const queryData: SearchIngredientQuery = {
    name: request.body.name,
  };

  return await food.queryIngredients(queryData.name)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
