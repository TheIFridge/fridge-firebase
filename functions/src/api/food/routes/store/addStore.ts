import {Request, Response} from "express";

import * as food from "@api/food/ingredients";

import {Store} from "@api/food/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function addStore(request: Request, response: Response): Promise<Response<any>> {
  const storeData: Store = {
    identifier: request.body.identifier,
    name: request.body.name,
  };
  // TODO: Validator

  return await food.addStore(storeData)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
