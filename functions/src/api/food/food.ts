import { db } from "@utils/admin";

import { INGREDIENT_COLLECTION, RECIPE_COLLECTION, STORE_COLLECTION, Ingredient, Recipe, Store } from "./types";

function getIngredients() {
    return new Promise<Ingredient[]>((response, reject) => {
        return db.collection(INGREDIENT_COLLECTION).limit(10).get()
            .then((data) => {
                const ingredients: Ingredient[] = [];

                data.forEach((doc) => {
                    const currentData = doc.data();

                    const ingredientData: Ingredient = {
                        identifier: currentData.identifier,
                        name: currentData.name,
                        stores: currentData.stores,
                        description: currentData.description,
                        images: currentData.images
                    }

                    ingredients.push(ingredientData);
                });

                response(ingredients);
            }).catch((error) => {
                reject(error);
            });
    });
}

function queryIngredients(name: string): Promise<Ingredient[]> {
    return new Promise<Ingredient[]>((response, reject) => {
        return db.collection(INGREDIENT_COLLECTION).orderBy(`name/${name}`).get()
            .then((data) => {
                const ingredients: Ingredient[] = [];

                data.forEach((doc) => {
                    const currentData = doc.data();

                    const ingredientData: Ingredient = {
                        identifier: currentData.identifier,
                        name: currentData.name,
                        stores: currentData.stores,
                        description: currentData.description,
                        images: currentData.images
                    }

                    ingredients.push(ingredientData);
                });

                response(ingredients);
            }).catch((error) => {
                reject(error);
            });
    });
}

function getIngredient(identifier: string): Promise<Ingredient> {
    return new Promise<Ingredient>((response, reject) => {
       return db.collection(INGREDIENT_COLLECTION).doc(identifier).get()
            .then((data) => {
                const currentData = data.data();

                if (!currentData) {
                    return reject(`Ingredient with identifier ${identifier} not found`);
                }

                const ingredientData: Ingredient = {
                    identifier: currentData.identifier,
                    name: currentData.name,
                    flagged: currentData.flagged,
                    stores: currentData.stores,
                    images: currentData.images,
                    description: currentData.description,
                    price: currentData.price,
                    weight: currentData.weight,
                    dietary: currentData.dietary,
                }

                response(ingredientData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

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

function updateIngredient(ingredient: Ingredient) {
    return new Promise<Ingredient>((response, reject) => {
        return db.collection(INGREDIENT_COLLECTION).doc(ingredient.identifier).update(ingredient)
            .then(() => {
                response(ingredient);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

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
                    }

                    recipes.push(recipeData);
                });

                response(recipes);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

function queryRecipes(ingredients: string[]) {
    return new Promise<Recipe[]>((response, reject) => {
        return db.collection(RECIPE_COLLECTION).where('ingredients', 'array-contains-any', ingredients).get()
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
                    }

                    recipes.push(recipeData);
                });

                response(recipes);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

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
                }

                response(recipeData);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

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
                }

                response(storeData);

            })
            .catch((error) => {
                reject(error);
            });
    });
}

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

export { getIngredients, queryIngredients, getIngredient, addIngredient, updateIngredient, getRecipes, addRecipe, getRecipe, updateRecipe, addStore, getStore, updateStore, queryRecipes };