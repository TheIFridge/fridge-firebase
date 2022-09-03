import { WriteResult } from "@google-cloud/firestore"

import { db } from "@utils/admin";

async function getInventoryData(identifier: string) {
    return new Promise<Inventory>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(identifier).get()
            .then((data) => {
                const currentData = data.data();

                if (!currentData) {
                    return reject(new Error(`Inventory with identifier ${identifier} not found`));
                }

                const inventoryData: Inventory = {
                    ingredients: currentData.ingredients || [],
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
        return db.collection(INVENTORY_COLLECTION).doc(identifier).update(data)
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function addInventoryItem(userId: string, data: UserIngredientData) {
    return new Promise<void>((response, reject) => {
        return db.collection(`${INVENTORY_COLLECTION}\\${userId}`).add(data)
            .then((result) => {
                response();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function updateInventoryItem(identifier: string, data: UserIngredientData) {
    return new Promise<WriteResult>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(identifier).update(data)
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function deleteInventoryItem(identifier: string) {
    return new Promise<WriteResult>((response, reject) => {
        return db.collection(INVENTORY_COLLECTION).doc(identifier).delete()
            .then((result) => {
                response(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { getInventoryData, updateInventoryData, addInventoryItem, updateInventoryItem, deleteInventoryItem };