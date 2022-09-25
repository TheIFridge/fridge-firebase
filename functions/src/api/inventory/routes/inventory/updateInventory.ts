import {Request, Response} from "express";

import {InventoryError, InventoryData} from "@api/inventory/types";

import {updateInventoryData} from "../../inventory";

interface InventoryValidatorOutput {
    errors: InventoryError;
    valid: boolean;
}

const validateInventoryUpdateData = (data: InventoryData): InventoryValidatorOutput => {
  const errors: InventoryError = {};

  if (data.reminder_enabled == undefined) errors.reminder_enabled = "Must not be empty";
  if (data.expiry_enabled == undefined) errors.expiry_enabled = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
async function updateInventory(request: Request, response: Response) {
  const data: InventoryData = {
    reminder_enabled: request.body.reminder_enabled,
    expiry_enabled: request.body.expiry_enabled,
  };

  const {valid, errors} = validateInventoryUpdateData(data);
  if (!valid) return response.status(400).json(errors);

  const identifier = request.params.userId;

  return updateInventoryData(identifier, data)
      .then((inventoryData) => {
        return response.json(inventoryData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}

export {updateInventory};
