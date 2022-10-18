
import {db} from "@utils/admin";

import {ShoppingIngredient, ShoppingList} from "@api/shoppinglist/types";
import {USER_COLLECTION} from "@api/users/types";

/**
 *
 * @param {string} userId
 * @return {Promise<Inventory>}
 */
export async function getShoppingList(userId: string): Promise<ShoppingList[]> {
  const shopingListCollection = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist");
  const shoppingListData = await shopingListCollection.get();

  const shoppingList = shoppingListData.docs.map(async (data) => {
    return {
      identifier: data.id,
      ingredients: await formatShoppingIngredients(userId, data.id),
    };
  });

  return Promise.all(shoppingList);
}

/**
 *
 * @param {string} userId
 * @param {string} shoppingListId
 * @param {ShoppingIngredient} ingredient
 * @return {WriteResult} write result
 */
export async function addShoppingListIngredient(
    userId: string,
    shoppingListId: string,
    ingredient: ShoppingIngredient
) {
  const shoppingList = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist").doc(shoppingListId);
  return shoppingList.create(ingredient);
}

/**
 *
 * @param {string} userId
 * @param {string} shoppingListId
 * @param {string} shoppingIngredientId
 * @param {ShoppingIngredient} ingredient
 * @return {WriteResult} write result
 */
export async function updateShoppingListIngredient(
    userId: string,
    shoppingListId: string,
    shoppingIngredientId: string,
    ingredient: ShoppingIngredient
) {
  const shoppingIngredient = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist")
      .doc(shoppingListId).collection("ingredients").doc(shoppingIngredientId);
  return shoppingIngredient.update(ingredient);
}

/**
 *
 * @param {string} userId
 * @param {string} shoppingListId
 * @param {string} shoppingIngredientId
 * @return {WriteResult} write result
 */
export async function deleteShoppingListIngredient(
    userId: string,
    shoppingListId: string,
    shoppingIngredientId: string,
) {
  const shoppingIngredient = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist")
      .doc(shoppingListId).collection("ingredients").doc(shoppingIngredientId);
  return shoppingIngredient.delete();
}


/**
 *
 * @param {string} userId
 * @param {string} shoppingListId
 * @param {string} shoppingIngredientId
 * @return {WriteResult} write result
 */
export async function deleteShoppingList(
    userId: string,
    shoppingListId: string,
) {
  const shoppingList = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist").doc(shoppingListId);
  return shoppingList.delete();
}

/**
 *
 * @param {string} userId
 * @param {string} shoppingListId
 * @return {Promise<ShoppingIngredient[]>}
 */
export async function formatShoppingIngredients(userId: string, shoppingListId: string): Promise<ShoppingIngredient[]> {
  const shopingListCollection = db.collection(USER_COLLECTION).doc(userId).collection("shoppinglist");
  const ingredientData = await shopingListCollection.doc(shoppingListId).collection("ingredients").get();

  const shoppingIngredients = ingredientData.docs.map(async (data) => {
    return {
      ingredient: data.data().ingredient,
      quantity: data.data().quantity,
    };
  });

  return Promise.all(shoppingIngredients);
}
