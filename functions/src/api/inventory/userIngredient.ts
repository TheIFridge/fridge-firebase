
import { Ingredient } from "@api/food/types";
import {DocumentData} from "@google-cloud/firestore";
import {UserIngredient} from "./types";

/**
 *
 * @param {DocumentData} data
 * @return {Ingredient} ingredient
 */
async function formatIngredientData(data: DocumentData) {
  return {
    ingredient: data.data().ingredient,
    quantity: data.data().quantity,
    expiry: data.data().expiry ?? 0,
  } as UserIngredient;
}

export {formatIngredientData};