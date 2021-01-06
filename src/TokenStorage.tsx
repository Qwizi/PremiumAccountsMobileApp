import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenStorage {
    async setToken(value: string) {
        try {
            await AsyncStorage.setItem('@access_token', value);
        } catch (e) {
            console.log(e);
        }
    }

    async getToken() {
        try {
            return await AsyncStorage.getItem('@access_token');
        } catch (e) {
            console.log(e);
        }
    }

    async removeToken() {
        try {
            return await AsyncStorage.removeItem('@access_token');
        } catch (e) {
            console.log(e);
        }
    }
}

const tokenStorage = new TokenStorage();

export default tokenStorage;