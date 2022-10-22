import {Request, Response} from "express";
import {User} from "../types";

import * as user from "../users";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Promise<Response>}
 */
export async function getUser(request: Request, response: Response): Promise<Response<User>> {
  const identifier = request.user.userId;

  return user.getUser(identifier)
      .then((data) => {
        return response.json(data);
      })
      .catch((error) => {
        // TODO: Handle error so we don't expose internal server errors to the user
        console.error(error);
        return response.status(500).json({error: error.message});
      });
}
