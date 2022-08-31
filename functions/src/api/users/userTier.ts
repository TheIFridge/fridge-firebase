type Tier = 'Free' | 'Light' | 'Premium' | 'Premium+';

interface UserTier {
    tier: Tier
}

function getDefaultUserTier() {
    return {
        tier: 'Free'
    } as UserTier
}

export { UserTier, getDefaultUserTier };