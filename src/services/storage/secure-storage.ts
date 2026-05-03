import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'auth.access-token';
const REFRESH_TOKEN_KEY = 'auth.refresh-token';

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function setAccessToken(token: string) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function removeAccessToken() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function setRefreshToken(token: string) {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function removeRefreshToken() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export async function clearAuthTokens() {
  await removeAccessToken();
  await removeRefreshToken();
}
