import axios from 'axios';
import {AxiosInstance} from "axios";

class Api {
    private axios: AxiosInstance;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url
        })
    }
    // Rejestracja uzytkownika
    async registerUser(username: string, password: string): Promise<any> {
        return this.axios.post('auth/register', {
            username: username,
            password: password
        })
    }

    // Logowanie uzytkownika
    async loginUser(username: string, password: string): Promise<any> {
        return this.axios.post('auth/login', {
            username: username,
            password: password
        })
    }

    // Lista for
    async getForums(): Promise<any> {
        return this.axios.get('forums')
    }

    // Synchronizacja for
    async syncForums(): Promise<any> {
        return this.axios.post('forums/sync')
    }

    // Synchronizacja tematow
    async syncThreads(): Promise<any> {
        return this.axios.post('threads/sync')
    }

    // Wyszukiwanie tematu
    async searchThread(name: string): Promise<any> {
        return this.axios.post('threads/search', {name: name})
    }

    // Pobieranie pojedynczego tematu
    async getThread(id: number): Promise<any> {
        return this.axios.get(`threads/${id}`)
    }

    // Oznaczanie ze temat nie dziala
    async setThreadNotWork(id: number): Promise<any> {
        return this.axios.post(`threads/${id}/not_work`)
    }

    // Usuwanie oznaczenia ze temat nie dziala
    async removeThreadNotWork(id: number): Promise<any> {
        return this.axios.delete(`threads/${id}/not_work`)
    }

    // Dodawanie tematu do ulubionych
    async addThreadToFavorite(id: number): Promise<any> {
        return this.axios.post(`threads/${id}/favorite`)
    }

    // Usuwanie tematu z ulubionych
    async removeThreadToFavorite(id: number): Promise<any> {
        return this.axios.delete(`threads/${id}/favorite`)
    }

    // Pobieranie informacji o zalogowanym uzytkowniku
    async getUserMe(): Promise<any> {
        return this.axios.get('/users/me')
    }

    // Pobieranie ulubionych tematow zalogowanego uzytkownika
    async getUserFavoritesThreads(): Promise<any> {
        return this.axios.get('/users/me/favorites')
    }
}

const api = new Api('http://localhost:3000')
export default api