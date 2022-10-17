import {db} from "@utils/admin";

import {RECIPE_COLLECTION, Recipe} from "./types";

/**
 *
 * @return {Promise<Recipe[]>}
 */
function getRecipes() {
  return new Promise<Recipe[]>((response, reject) => {
    return db.collection(RECIPE_COLLECTION).limit(10).get()
        .then((data) => {
          const recipes: Recipe[] = [];

          data.forEach((doc) => {
            const currentData = doc.data();

            const recipeData: Recipe = {
              identifier: currentData.identifier,
              title: currentData.title,
              description: currentData.description,
              ingredients: currentData.ingredients,
              instructions: currentData.instructions,
              tags: currentData.tags,
              images: currentData.images,
              nutrition: currentData.nutrition,
              mealtime: currentData.mealtime,
              servings: currentData.servings,
              prepDuration: currentData.prepDuration,
              cookingDuration: currentData.cookingDuration,
            };

            recipes.push(recipeData);
          });

          response(recipes);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
   *
   * @param {string} ingredients
   * @return {Promise<Recipe[]>}
   */
function queryRecipes(ingredients: string[]) {
  return new Promise<Recipe[]>((response, reject) => {
    return db.collection(RECIPE_COLLECTION).where("ingredients", "array-contains-any", ingredients).get()
        .then((data) => {
          const recipes: Recipe[] = [];

          data.forEach((doc) => {
            const currentData = doc.data();

            const recipeData: Recipe = {
              identifier: currentData.identifier,
              title: currentData.title,
              description: currentData.description,
              ingredients: currentData.ingredients,
              instructions: currentData.instructions,
              tags: currentData.tags,
              images: currentData.images,
              nutrition: currentData.nutrition,
              mealtime: currentData.mealtime,
              servings: currentData.servings,
              prepDuration: currentData.prepDuration,
              cookingDuration: currentData.cookingDuration,
            };

            recipes.push(recipeData);
          });

          response(recipes);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
   *
   * @param {Recipe} recipe
   * @return {Promise<Recipe>}
   */
function addRecipe(recipe: Recipe) {
  return new Promise<Recipe>((response, reject) => {
    return db.collection(RECIPE_COLLECTION).doc(recipe.identifier).set(recipe)
        .then(() => {
          response(recipe);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
   *
   * @param {string} identifier
   * @param {Response} response
   * @return {Promise<Response>}
   */
function getRecipe(identifier: string): Promise<Recipe> {
  return new Promise<Recipe>((response, reject) => {
    return db.collection(RECIPE_COLLECTION).doc(identifier).get()
        .then((data) => {
          const currentData = data.data();

          if (!currentData) {
            return reject(new Error(`Recipe with identifier ${identifier} not found`));
          }

          const recipeData: Recipe = {
            identifier: currentData.identifier,
            title: currentData.title,
            description: currentData.description,
            ingredients: currentData.ingredients,
            instructions: currentData.instructions,
            tags: currentData.tags,
            images: currentData.images,
            nutrition: currentData.nutrition,
            mealtime: currentData.mealtime,
            servings: currentData.servings,
            prepDuration: currentData.prepDuration,
            cookingDuration: currentData.cookingDuration,
          };

          response(recipeData);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

/**
   *
   * @param {Recipe} recipe
   * @return {Promise<Recipe>}
   */
function updateRecipe(recipe: Recipe) {
  return new Promise<Recipe>((response, reject) => {
    return db.collection(RECIPE_COLLECTION).doc(recipe.identifier).update(recipe)
        .then(() => {
          response(recipe);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export { getRecipes, addRecipe, getRecipe, updateRecipe, queryRecipes};
  