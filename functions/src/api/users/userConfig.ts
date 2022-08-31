interface UserConfig {
    isDarkMode: boolean,
}

function getDefaultConfig() {
    return {
        isDarkMode: false
    } as UserConfig;
}

export { UserConfig, getDefaultConfig };