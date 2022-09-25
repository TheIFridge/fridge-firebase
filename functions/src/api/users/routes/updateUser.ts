import {Request, Response} from "express";

import {isEmpty} from "@utils/validators";

import * as users from "../users";
import {UserError, UserData} from "../types";

interface UserValidatorOutput {
    errors: UserError;
    valid: boolean;
}

const validateUserUpdateData = (data: UserData, userId: string): UserValidatorOutput => {
  const errors: UserError = {};

  if (isEmpty(data.username)) errors.username = "Must not be empty";
  if (isEmpty(data.first_name)) errors.first_name = "Must not be  empty";
  if (isEmpty(data.last_name)) errors.last_name = "Must not be  empty";
  if (isEmpty(data.avatar)) errors.avatar = "Must not be  empty";

  if (isEmpty(userId)) errors.other = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<WriteResult>}
 */
async function updateUser(request: Request, response: Response) {
  const data: UserData = {
    username: request.body.username,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    avatar: request.body.avatar,
  };

  const identifier = request.params.userId;

  const {valid, errors} = validateUserUpdateData(data, identifier);
  if (!valid) return response.status(400).json(errors);

  return users.updateUser(identifier, data)
      .then((userData) => {
        return response.json(userData);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}

export {updateUser};
