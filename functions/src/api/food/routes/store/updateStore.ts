import {Request, Response} from "express";

import * as food from "@api/food/food";

import {Store} from "@api/food/types";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function updateStore(request: Request, response: Response): Promise<Response<any>> {
  const storeData: Store = {
    identifier: request.body.identifier,
    name: request.body.name,
  };

  return food.updateStore(storeData)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
