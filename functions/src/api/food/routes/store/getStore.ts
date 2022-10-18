import {Request, Response} from "express";

import * as food from "@api/food/ingredients";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getStore(request: Request, response: Response): Promise<Response<any>> {
  const identifier = request.params.userId;

  return food.getStore(identifier)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
