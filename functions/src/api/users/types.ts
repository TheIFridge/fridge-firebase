export const USER_COLLECTION = 'users';

export interface User {
    identifier: string,
    username: string,
    first_name: string,
    last_name: string,
    joined: string,
    config: UserConfig,
    userTier: UserTier,
    preferences: UserPreference,
    avatar?: string
}

export interface UserConfig {
    isDarkMode: boolean,
}

export interface UserPreference {
    requirements: string[],
}

export type Tier = 'Free' | 'Light' | 'Premium' | 'Premium+';

export interface UserTier {
    tier: Tier
}

export interface UserError {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
    other?: string
}

export interface UserData {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string
}