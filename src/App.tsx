import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import api from './Api';
import tokenStorage from "./TokenStorage";
import {User} from "./App.interfaces";
import {ApplicationProvider, Layout} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import AuthScreen from "./screens/AuthScreen";
import MainScreen from "./screens/MainScreen";

export default function App() {
    const [user, setUser] = useState<User>({})
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        (async () => {
            await checkUserIsLogged()
        })();
    }, [])

    async function checkUserIsLogged() {
        try {
            if (await tokenStorage.getToken()) {
                await setUserData();
                setLogged(true);
            }
        } catch (e) {
            console.log(e.response.data);
        }
    }

    async function setUserData() {
        try {
            const response = await api.getUserMe()
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (e) {
            console.log(e.response.data);
            await logoutUser();
        }
    }

    async function registerUser(username: string, password: string) {
        try {
            const response = await api.registerUser(username, password);
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (e) {
            console.log(e.response.data);
        }
    }

    async function loginUser(username: string, password: string) {
        try {
            const response = await api.loginUser(username, password)
            if (response.status === 201) {
                console.log(response.data);
                const token = response.data.access_token;
                await tokenStorage.setToken(token);
                await setUserData();
                setLogged(true);
            }
        } catch (e) {
            console.log(e);
            if (e.response && e.response.data) {
                console.log(e.response.data)
            }
        }
    }

    async function logoutUser() {
        setLogged(false);
        setUser({});
        await tokenStorage.removeToken()
    }

    async function testRegisterUser() {
        console.log('Kliknieto')
        const username = 'test';
        const password = '123';

        await registerUser(username, password);
    }

    async function testLoginUser() {
        console.log('Kliknieto')
        await loginUser("Qwizi", "tuja5422");
    }

    let screens = logged ? <MainScreen /> : <AuthScreen
        setLogged={setLogged}
        setUserData={setUserData}
    />;

    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            {screens}
        </ApplicationProvider>
    );
}