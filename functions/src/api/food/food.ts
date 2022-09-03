import { db } from "@utils/admin";


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

function addIngredient(ingredient: IngredientData): Promise<Ingredient> {
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

function updateIngredient(identifier: string, ingredient: IngredientData) {
    return new Promise<Ingredient>((response, reject) => {
        return db.collection(INGREDIENT_COLLECTION).doc(identifier).update(ingredient)
            .then(() => {
                response(ingredient);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { getIngredient, addIngredient, updateIngredient };