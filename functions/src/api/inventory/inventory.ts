import { DocumentData, WriteResult } from "@google-cloud/firestore"

import { db } from "@utils/admin";

import { inventoryDefaults } from "./defaults";
import { INVENTORY_COLLECTION, Inventory, InventoryData, UserIngredientData } from "./types";

async function getInventoryData(userId: string) {
    return new Promise<Inventory>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(userId).get()
            .then(async (data) => {
                const currentData = data.data();

                if (!currentData) {
                    response(inventoryDefaults());
                    return;
                }

                const inventoryData: Inventory = {
                    ingredients: await getInventoryItems(userId).catch((err) => []) || [],
                    reminder_enabled: currentData.reminder_enabled || false,
                    expiry_enabled: currentData.expiry_enabled || false,
                }

                response(inventoryData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function updateInventoryData(identifier: string, data: InventoryData) {
    return new Promise<WriteResult>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(identifier).set(data, { merge: true })
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function getInventoryItems(userId: string) {
    return new Promise<UserIngredientData[]>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(userId).collection('ingredient').get()
            .then((result) => {
                const userIngredientData: UserIngredientData[] = result.docs.map(data => {
                    return {
                        ingredient: data.data().ingredient,
                        quantity: data.data().quantity,
                        expiry: data.data().expiry
                    }
                });

                response(userIngredientData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function getInventoryItem(userId: string, ingredientId: string) {
    return new Promise<UserIngredientData>((response, reject) => {
        return db.collection(`${INVENTORY_COLLECTION}\\${userId}`).where("ingredient", "==", ingredientId).get()
            .then((result) => {
                const userIngredientData: UserIngredientData = {
                    ingredient: result.docs[0].data().ingredient,
                    quantity: result.docs[0].data().quantity,
                    expiry: result.docs[0].data().expiry
                }

                response(userIngredientData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function addInventoryItem(userId: string, ingredientId: string, data: UserIngredientData) {
    return new Promise<void>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(userId).collection('ingredient').doc(ingredientId).set(data)
            .then((result) => {
                response();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function updateInventoryItem(userId: string, ingredientId: string, data: UserIngredientData) {
    return new Promise<DocumentData>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(userId).collection('ingredient').doc(ingredientId).set(data)
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function deleteInventoryItem(userId: string, ingredientId: string) {
    return new Promise<WriteResult>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(userId).collection('ingredient').doc(ingredientId).delete()
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { getInventoryData, updateInventoryData, getInventoryItems, getInventoryItem, addInventoryItem, updateInventoryItem, deleteInventoryItem };