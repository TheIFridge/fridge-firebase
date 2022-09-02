const USER_COLLECTION = 'users';

interface User {
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

interface UserConfig {
    isDarkMode: boolean,
}

interface UserPreference {
    requirements: string[],
}

type Tier = 'Free' | 'Light' | 'Premium' | 'Premium+';

interface UserTier {
    tier: Tier
}

interface UserError {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
}

interface UserData {
    username?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string
}