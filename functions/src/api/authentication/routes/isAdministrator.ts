import {Request, Response, NextFunction} from "express";

import {admin} from "@utils/admin";

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @return {Promise<Response>}
 */
export function isAdministrator(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.split("Bearer ")[1];

  if (!token) return response.status(401).json({error: "Unauthorized 3"});

  return admin.auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        request.user = {
          userId: decodedToken.uid,
        };
        console.log("isAdministrator is disabled");
        if (decodedToken.email != null) return next();
        else return response.status(401).json({error: "Unauthorized 4"});
      }).catch((error) => {
        console.error(error);
        return response.status(401).json({error: "Unauthorized 5"});
      });
}
