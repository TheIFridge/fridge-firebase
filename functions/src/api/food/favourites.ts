import {admin, db} from "@utils/admin";

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 */
export async function addFavouriteUserIngredient(userId: string, ingredientId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  return await favouritesDoc.set({"ingredients": ingredientId}, {merge: true});
}

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 */
export async function removeFavouriteUserIngredient(userId: string, ingredientId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  return await favouritesDoc.update({
    "ingredients": admin.firestore.FieldValue.arrayRemove(ingredientId),
  });
}

/**
 *
 * @param {string} userId
 */
export async function getFavouriteUserIngredients(userId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  const data = await (await favouritesDoc.get()).data();

  if (!data) return [];

  return data.data().ingredients;
}

/**
 *
 * @param {string} userId
 * @param {string} recipeId
 */
export async function addFavouriteRecipe(userId: string, recipeId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  return await favouritesDoc.set({"recipes": recipeId}, {merge: true});
}

/**
   *
   * @param {string} userId
   * @param {string} recipeId
   */
export async function removeFavouriteRecipe(userId: string, recipeId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  return await favouritesDoc.update({
    "recipes": admin.firestore.FieldValue.arrayRemove(recipeId),
  });
}

/**
   *
   * @param {string} userId
   */
export async function getFavouriteRecipe(userId: string) {
  const favouritesDoc = db.collection("users").doc(userId).collection("data").doc("favourites");
  const data = await (await favouritesDoc.get()).data();

  if (!data) return [];

  return data.data().recipes;
}

