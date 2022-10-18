import * as functions from "firebase-functions";
import express, {Express} from "express";

import * as auth from "@api/authentication/routes";
import {isAdministrator, isAuthenticated} from "@api/authentication/routes";
import * as users from "@api/users/routes";
import * as inventory from "@api/inventory/routes";
import * as food from "@api/food/routes";
import * as shoppingList from "@api/shoppinglist/routes";

import middleware from "@middleware";

const app: Express = express();

app.use(middleware());

/* AUTHENTICATION ENDPOINTS */

app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);

/* USER ENDPOINTS */

app.post("/users/:userId", isAuthenticated, users.updateUser);
app.get("/users/:userId", isAuthenticated, users.getUser);

app.get("/inventory", isAuthenticated, inventory.getInventory);
app.post("/inventory", isAuthenticated, inventory.updateInventory);

app.get("/inventory/:ingredientId", isAuthenticated, inventory.getInventory);
app.post("/inventory/:ingredientId", isAuthenticated, inventory.updateUserIngredient);
app.put("/inventory/:ingredientId", isAuthenticated, inventory.addUserIngredient);
app.delete("/inventory/:ingredientId", isAuthenticated, inventory.deleteUserIngredient);

app.get("/shoppinglist", isAuthenticated, shoppingList.getShoppingList);

app.post("/shoppinglist/:shoppingListId/:shoppingIngredientId", isAuthenticated,
    shoppingList.postShoppingListIngredient);
app.delete("/shoppinglist/:shoppingListId/:shoppingIngredientId", isAuthenticated,
    shoppingList.deleteShoppingListIngredient);
app.put("/shoppinglist/:shoppingListId", isAuthenticated, shoppingList.putShoppingListIngredient);
app.delete("/shoppinglist/:shoppingListId", isAuthenticated, shoppingList.deleteShoppingList);

app.get("/favourite/recipe", );
app.post("/favourite/recipe/:recipeId", );
app.put("/favourite/recipe/:recipeId", );
app.delete("/favourite/recipe/:recipeId", );

app.get("/favourite/ingredient", );
app.post("/favourite/ingredient/:ingredientId", );
app.put("/favourite/ingredient/:ingredientId", );
app.delete("/favourite/ingredient/:ingredientId", );

app.get("/pricewatch", );
app.post("/pricewatch/:ingredientId", );
app.put("/pricewatch/:ingredientId", );
app.delete("/pricewatch/:ingredientId", );

/* GLOBAL ENDPOINTS */

app.get("/ingredient/:ingredientId", isAuthenticated, food.getIngredient);
app.post("/ingredient/:ingredientId", isAdministrator, food.updateIngredient);
app.put("/ingredient/:ingredientId", isAdministrator, food.addIngredient);

app.get("/ingredient/reports", isAdministrator, food.getReportedIngredients);
app.put("/ingredient/:ingredientId/report", isAdministrator, food.updateReportedIngredient);
app.post("/ingredient/:ingredientId/report", isAdministrator, food.updateReportedIngredient);

app.get("/ingredient/reports", isAuthenticated, food.getIngredient);
app.get("/ingredient/:ingredientId/reports", isAuthenticated, food.getIngredient);
app.post("/ingredient/:ingredientId/reports", isAdministrator, food.updateIngredient);

app.get("/ingredients", isAuthenticated, food.getIngredients);
app.get("/ingredients/query", isAuthenticated, food.queryIngredients);

app.get("/recipe/:recipeId", isAuthenticated, food.getRecipe);
app.post("/recipe/:recipeId", isAdministrator, food.updateRecipe);
app.put("/recipe/:recipeId", isAdministrator, food.addRecipe);

app.get("/recipes", isAuthenticated, food.getIngredients);
app.get("/recipes/synthesize", isAuthenticated, food.synthesizeRecipes);
app.put("/recipe/magic", isAdministrator, food.magicRecipe);

app.get("/store/:storeId", isAuthenticated, food.getStore);
app.post("/store/:storeId", isAdministrator, food.updateStore);
app.put("/store/:storeId", isAdministrator, food.addStore);

exports.api = functions.https.onRequest(app);
