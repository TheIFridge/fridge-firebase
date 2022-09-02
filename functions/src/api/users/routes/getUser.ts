import { Request, Response } from "express";

import { getUserData } from "../users"

export async function getUser(request: Request, response: Response): Promise<Response<any>> {
    const identifier = request.params.userId;

    return getUserData(identifier)
        .then((userData) => {
            return response.json(userData);
        })
        .catch((error) => {
            // TODO: Handle error so we don't expose internal server errors to the user
            console.error(error);
            return response.status(500).json({ error: error.message });
        });
}