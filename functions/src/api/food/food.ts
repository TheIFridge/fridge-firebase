import {db} from "@utils/admin";

import {INGREDIENT_COLLECTION, STORE_COLLECTION, Ingredient, Store, PartialIngredient} from "./types";

/**
 *
 * @return {Promise<Ingredient[]>}
 */
function getIngredients() {
  return new Promise<Ingredient[]>((response, reject) => {
    return db.collection(INGREDIENT_COLLECTION).get()
        .then((data) => {
          const ingredients: Ingredient[] = [];

          data.forEach((doc) => {
            const currentData = doc.data();

            const ingredientData: Ingredient = {
              identifier: currentData.identifier,
              name: currentData.name,
              generic_name: currentData.generic_name,
              stores: currentData.stores,
              description: currentData.description,
              images: currentData.images,
            };

            ingredients.push(ingredientData);
          });

          response(ingredients);
        }).catch((error) => {
          reject(error);
        });
  });
}


/**
 *
 * @param {string} name
 * @param {boolean} flagged
 * @return {Promise<Ingredint[]>}
 */
function queryIngredients(name: string | undefined = undefined, flagged = false): Promise<Ingredient[]> {
  return new Promise<Ingredient[]>((response, reject) => {
    const data = db.collection(INGREDIENT_COLLECTION);
    if (name) data.orderBy(`name/${name}`);
    if (flagged) data.where("flagged.flagged", "==", true);
    return data.get()
        .then((data) => {
          const ingredients: Ingredient[] = [];

          data.forEach((doc) => {
            const currentData = doc.data();

            const ingredientData: Ingredient = {
              identifier: currentData.identifier,
              name: currentData.name,
              generic_name: currentData.generic_name,
              stores: currentData.stores,
              description: currentData.description,
              images: currentData.images,
            };

            ingredients.push(ingredientData);
          });

          response(ingredients);
        }).catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} identifier
 * @return {Promise<Ingredient>}
 */
function getIngredient(identifier: string): Promise<Ingredient> {
  return new Promise<Ingredient>((response, reject) => {
    return db.collection(INGREDIENT_COLLECTION).doc(identifier).get()
        .then((data) => {
          const currentData = data.data();

          if (!currentData) {
            return reject(new Error(`Ingredient with identifier ${identifier} not found`));
          }

          const ingredientData: Ingredient = {
            identifier: currentData.identifier,
            name: currentData.name,
            generic_name: currentData.generic_name,
            flagged: currentData.flagged,
            stores: currentData.stores,
            images: currentData.images,
            description: currentData.description,
            price: currentData.price,
            weight: currentData.weight,
            dietary: currentData.dietary,
          };

          response(ingredientData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {Ingredient} ingredient
 * @return {Promise<Ingredient>}
 */
function addIngredient(ingredient: Ingredient): Promise<Ingredient> {
  return new Promise<Ingredient>((response, reject) => {
    return db.collection(INGREDIENT_COLLECTION).doc(ingredient.identifier).set(ingredient)
        .then(() => {
          response(ingredient);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {Ingredient} ingredient
 * @return {Promise<Ingredient>}
 */
function updateIngredient(ingredient: Ingredient | PartialIngredient) {
  return new Promise<Ingredient | PartialIngredient>((response, reject) => {
    return db.collection(INGREDIENT_COLLECTION).doc(ingredient.identifier).update(ingredient)
        .then(() => {
          response(ingredient);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {Store} store
 * @return {Promise<Store>}
 */
function addStore(store: Store) {
  return new Promise<Store>((response, reject) => {
    return db.collection(STORE_COLLECTION).doc(store.identifier).set(store)
        .then(() => {
          response(store);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {string} identifier
 * @return {Promise<Store>}
 */
function getStore(identifier: string): Promise<Store> {
  return new Promise<Store>((response, reject) => {
    return db.collection(STORE_COLLECTION).doc(identifier).get()
        .then((data) => {
          const currentData = data.data();

          if (!currentData) {
            return reject(new Error(`Store with identifier ${identifier} not found`));
          }

          const storeData: Store = {
            identifier: currentData.identifier,
            name: currentData.name,
          };

          response(storeData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
 *
 * @param {Store} store
 * @return {Promise<Store>}
 */
function updateStore(store: Store) {
  return new Promise<Store>((response, reject) => {
    return db.collection(STORE_COLLECTION).doc(store.identifier).update(store)
        .then(() => {
          response(store);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export {getIngredients, queryIngredients, getIngredient, addIngredient, 
  updateIngredient, addStore, getStore, updateStore};
