import {Request, Response} from "express";

import {getInventoryData} from "@api/inventory/inventory";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getInventory(request: Request, response: Response): Promise<Response> {
  const userId = request.user.userId;

  return getInventoryData(userId)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
