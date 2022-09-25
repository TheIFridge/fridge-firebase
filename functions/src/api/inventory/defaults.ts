import {Inventory} from "./types";

export const inventoryDefaults = (): Inventory => {
  return {
    ingredients: [],
    reminder_enabled: false,
    expiry_enabled: false,
  };
};
