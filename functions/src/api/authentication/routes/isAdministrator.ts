import { Request, Response } from "express";

import { admin } from "@utils/admin";

export function isAdministrator(request: Request, response: Response, next: Function) {
    const token = request.headers.authorization?.split("Bearer ")[1];

    if (!token) return response.status(401).json({ error: "Unauthorized 3" });

    return admin.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            if (decodedToken.isAdmin === true) return next();
            else return response.status(401).json({ error: "Unauthorized 4" });
        }).catch((error) => {
            console.error(error);
            return response.status(401).json({ error: "Unauthorized 5" });
        });
}
