// import {db} from "@utils/admin";

// import {INGREDIENT_COLLECTION, Ingredient, FlaggedData} from "./types";

// /**
//  *
//  * @param {string} identifier
//  * @param {FlaggedData} data
//  * @return {Promise<Ingredient>}
//  */
// function addIngredientReport(identifier: string, data: FlaggedData) {
//   return new Promise<Ingredient>((response, reject) => {
//     return db.collection(INGREDIENT_COLLECTION).doc(identifier).update()
//         .then(() => {
//           response(ingredient);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//   });
// }
