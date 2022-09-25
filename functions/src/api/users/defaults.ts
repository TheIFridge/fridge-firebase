import {UserConfig, UserPreference, UserTier, User} from "./types";

export const userConfigDefaults: UserConfig = {
  isDarkMode: false,
};

export const userPreferenceDefaults: UserPreference = {
  requirements: [],
};

export const userTierDefaults: UserTier = {
  tier: "Free",
};

export const userDefaults = (
    identifier: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
): User => {
  return {
    identifier,
    username,
    first_name: firstName,
    last_name: lastName,
    email,
    joined: new Date().toISOString(),
    config: userConfigDefaults,
    userTier: userTierDefaults,
    preferences: userPreferenceDefaults,
  };
};
