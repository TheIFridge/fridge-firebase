import * as functions from "firebase-functions";
import express, { Express} from "express";
import { initializeApp } from "firebase/app";

import config from "@utils/config";

import * as auth from "@api/authentication/routes";
import { isAdministrator, isAuthenticated } from "@api/authentication/routes";
import * as users from "@api/users/routes";
import * as inventory from "@api/inventory/routes";
import * as food from "@api/food/routes";

import middleware from "@middleware";

initializeApp(config);

const app: Express = express();

app.use(middleware());

app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

app.post("/users/:userId", isAuthenticated, users.updateUser);
app.get("/users/:userId", isAuthenticated, users.getUser);

app.get('/users/:userId/inventory', isAuthenticated, inventory.getInventory);
app.post('/users/:userId/inventory', isAuthenticated, inventory.updateInventory);

app.get('/users/:userId/inventory/:ingredientId', isAuthenticated, inventory.getInventory);
app.post('/users/:userId/inventory/:ingredientId', isAuthenticated, inventory.updateUserIngredient);
app.put('/users/:userId/inventory/:ingredientId', isAuthenticated, inventory.addUserIngredient);
app.delete('/users/:userId/inventory/:ingredientId', isAuthenticated, inventory.deleteUserIngredient);

app.get('/ingredient/:ingredientId', isAdministrator, food.getIngredient);
app.post('/ingredient/:ingredientId', isAdministrator, food.updateIngredient);
app.put('/ingredient/:ingredientId', isAdministrator, food.addIngredient);

app.get('/recipe/:recipeId', isAdministrator, food.getRecipe);
app.post('/recipe/:recipeId', isAdministrator, food.updateRecipe);
app.put('/recipe/:recipeId', isAdministrator, food.addRecipe);

app.get('/store/:storeId', isAdministrator, food.getStore);
app.post('/store/:storeId', isAdministrator, food.updateStore);
app.put('/store/:storeId', isAdministrator, food.addStore);


exports.api = functions.https.onRequest(app);