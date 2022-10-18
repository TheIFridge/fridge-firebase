import {db} from "@utils/admin";

import {UserIngredientData} from "@api/inventory/types";
import {Recipe} from "./types";

/**
 *
 * @param {string} userId
 * @return {Promise<Ingredient[]>} ingredients
 */
export async function getFavouriteIngredients(userId: string) {

}

/**
 *
 * @param {string} userId
 * @param {UserIngredientData} ingredient
 */
export async function putFavouriteIngredient(userId: string, ingredient: UserIngredientData) {

}

/**
 *
 * @param {string} userId
 * @param {UserIngredientData} ingredientId
 */
export async function deleteFavouriteIngredient(userId: string, ingredientId: string) {

}

/**
 *
 * @param {string} userId
 * @return {Promise<Recipe[]>} recipes
 */
export async function getFavouriteRecipe(userId: string) {

}
    
/**
 *
 * @param {string} userId
 * @param {Recipe} recipe
 */
export async function putFavouriteRecipe(userId: string, recipe: Recipe) {

}

/**
 *
 * @param {string} userId
 * @param {string} recipeId
 */
export async function deleteFavouriteRecipe(userId: string, recipeId: string) {

}

