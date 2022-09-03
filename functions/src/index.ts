import * as functions from "firebase-functions";
import express, { Express} from "express";
import { initializeApp } from "firebase/app";

import config from "@utils/config";

import * as auth from "@api/authentication/routes";
import { isAuthenticated } from "@api/authentication/routes";
import * as users from "@api/users/routes";
import * as inventory from "@api/inventory/routes";

initializeApp(config);

const app: Express = express();

app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

app.post("/users/:userId", isAuthenticated, users.updateUser);
app.get("/users/:userId", isAuthenticated, users.getUser);

app.get('/users/:userId/inventory', isAuthenticated, inventory.getInventory);
app.post('/users/:userId/inventory', isAuthenticated, inventory.updateInventory);

app.get('/users/:userId/inventory/:ingredientId', isAuthenticated, inventory.getInventory)
app.post('/users/:userId/inventory/:ingredientId', isAuthenticated)
app.put('/users/:userId/inventory/:ingredientId', isAuthenticated)
app.delete('/users/:userId/inventory/:ingredientId', isAuthenticated)

exports.api = functions.https.onRequest(app);