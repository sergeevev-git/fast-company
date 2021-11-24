const TOKEN_KEY = "jwt-token";
const TOKEN_REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    //   время смерти токена
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(TOKEN_REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
