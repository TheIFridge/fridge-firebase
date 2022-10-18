import {Request, Response, NextFunction} from "express";

import {admin} from "@utils/admin";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @return {Promise<Response>}
 */
export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return response.status(401).json({error: "Unauthorized 1 "});
  }

  return admin.auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        request.user = {
          userId: decodedToken.uid,
        };
        return next();
      }).catch((error) => {
        // TODO Handle error, token may be expred etc
        console.error(error);
        return response.status(401).json({error: "Unauthorized 2"});
      });
}
