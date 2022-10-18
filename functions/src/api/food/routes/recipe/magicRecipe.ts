
import {getIngredient} from "@api/food/ingredients";

/**
 *
 */
export async function magicRecipe(ingredients: string[]): Promise<Recipe[]> {
  const ingredientItems = await Promise.all(ingredients.map((ingredient) => getIngredient(ingredient)));

  return new Promise<Recipe[]>((request, response) => {
    
  });
}
