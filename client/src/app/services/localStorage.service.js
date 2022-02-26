const TOKEN_KEY = "jwt-token";
const TOKEN_REFRESH_KEY = "jwt-refresh-token";
const USERID_KEY = "user-local-id";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600
}) {
    //   время смерти токена
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_REFRESH_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(TOKEN_REFRESH_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    removeAuthData,
    getAccessToken,
    getRefreshToken,
    getUserId,
    getTokenExpiresDate
};

export default localStorageService;
