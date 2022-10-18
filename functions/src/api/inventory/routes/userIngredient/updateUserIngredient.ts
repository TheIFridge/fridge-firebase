import {Request, Response} from "express";

import {updateInventoryItem} from "@api/inventory/inventory";

import {UserIngredientError, UserIngredientData} from "@api/inventory/types";
import {getIngredient} from "@api/food/ingredients";

interface UserIngredientValidatorOutput {
    errors: UserIngredientError;
    valid: boolean;
}

const validateUserIngredientUpdateData = (data: UserIngredientData): UserIngredientValidatorOutput => {
  const errors: UserIngredientError = {};

  if (data.ingredient == undefined) errors.ingredient = "Must not be empty";
  if (data.quantity == undefined) errors.quantity = "Must not be empty";
  if (data.expiry == undefined) errors.expiry = "Must not be empty";

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
async function updateUserIngredient(request: Request, response: Response) {
  const data: UserIngredientData = {
    ingredient: await getIngredient(request.params.ingredientId).then((data) => data.identifier).catch((err) => err),
    quantity: request.body.quantity,
    expiry: request.body.expiry,
  };

  const {valid, errors} = validateUserIngredientUpdateData(data);
  if (!valid) return response.status(400).json(errors);

  const userId = request.params.userId;
  const ingredientId = request.params.userId;

  return updateInventoryItem(userId, ingredientId, data)
      .then((userIngredientData) => {
        return response.json(userIngredientData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}

export {updateUserIngredient};
