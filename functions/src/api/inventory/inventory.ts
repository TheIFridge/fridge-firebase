import {getIngredient} from "@api/food/ingredients";
import {DocumentData, WriteResult} from "@google-cloud/firestore";

import {db} from "@utils/admin";

import {inventoryDefaults} from "./defaults";
import {INVENTORY_COLLECTION, Inventory, InventoryData, UserIngredientData} from "./types";

/** l
 *
 * @param {string} userId
 * @return {Promise<Inventory>}
 */
async function getInventoryData(userId: string) {
  return new Promise<Inventory>((response, reject) => {
    return db.collection(INVENTORY_COLLECTION).doc(userId).get()
        .then(async (data) => {
          const currentData = data.data();

          if (!currentData) {
            response(inventoryDefaults());
            return;
          }

          const userIngredientData: UserIngredientData[] = await getInventoryItems(userId).catch((err) => []);

          const inventoryData: Inventory = {
            ingredients: userIngredientData || [],
            reminder_enabled: currentData.reminder_enabled || false,
            expiry_enabled: currentData.expiry_enabled || false,
          };

          response(inventoryData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} identifier
 * @param {InventoryData} data
 * @return {Promise<WriteResult>}
 */
async function updateInventoryData(identifier: string, data: InventoryData) {
  return new Promise<WriteResult>((response, reject) => {
    return db.collection(INVENTORY_COLLECTION).doc(identifier).set(data, {merge: true})
        .then((result) => {
          response(result);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} userId
 * @return {Promise<UserIngredientData[]>}
 */
async function getInventoryItems(userId: string) {
  return new Promise<UserIngredientData[]>((response, reject) => {
    return db.collection(INVENTORY_COLLECTION).doc(userId).collection("ingredient").get()
        .then(async (result) => {
          const userIngredientData: UserIngredientData[] = await Promise.all(result.docs.map(async (data) => {
            return {
              ingredient: await getIngredient(data.data().ingredient).catch((err) => data.data().ingredient),
              quantity: data.data().quantity,
              expiry: data.data().expiry,
            } as UserIngredientData;
          })).catch((err) => {
            console.log(err);
            return err;
          });

          response(userIngredientData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 * @return {Promise<UserIngredientData>}
 */
async function getInventoryItem(userId: string, ingredientId: string) {
  return new Promise<UserIngredientData>((response, reject) => {
    return db.collection(`${INVENTORY_COLLECTION}\\${userId}`).where("ingredient", "==", ingredientId).get()
        .then((result) => {
          const userIngredientData: UserIngredientData = {
            ingredient: result.docs[0].data().ingredient,
            quantity: result.docs[0].data().quantity,
            expiry: result.docs[0].data().expiry,
          };

          response(userIngredientData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 * @param {UserIngredientData} data
 * @return {Promise<void>}
 */
async function addInventoryItem(userId: string, ingredientId: string, data: UserIngredientData) {
  return new Promise<void>((response, reject) => {
    return db.collection(INVENTORY_COLLECTION).doc(userId).collection("ingredient").doc(ingredientId).set(data)
        .then((result) => {
          response();
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 * @param {UserIngredientData} data
 * @return {Promise<DocumentData>}
 */
async function updateInventoryItem(userId: string, ingredientId: string, data: UserIngredientData) {
  return new Promise<DocumentData>((response, reject) => {
    return db.collection(INVENTORY_COLLECTION).doc(userId).collection("ingredient").doc(ingredientId).set(data)
        .then((result) => {
          response(result);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} userId
 * @param {string} ingredientId
 * @return {Promise<WriteResult>}
 */
export async function deleteInventoryItem(userId: string, ingredientId: string) {
  const ingredientDocs = await db.collection(INVENTORY_COLLECTION).doc(userId).collection("ingredient")
      .where("ingredient", "==", ingredientId)
      .get();

  if (ingredientDocs.empty) {
    return new Error("Ingredient not found");
  }

  return ingredientDocs.docs[0].ref.delete();
}

export {getInventoryData, updateInventoryData, getInventoryItems,
  getInventoryItem, addInventoryItem, updateInventoryItem};

