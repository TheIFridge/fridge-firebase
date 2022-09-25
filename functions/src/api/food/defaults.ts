import {FlaggedIngredient} from "./types";

export const flaggedIngredientDefaults = (): FlaggedIngredient => {
  return {
    flagged: false,
    reason: undefined,
    date: undefined,
    users: undefined,
  };
};
