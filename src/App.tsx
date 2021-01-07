import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import api from './Api';
import tokenStorage from "./TokenStorage";
import {User} from "./App.interfaces";
import {ApplicationProvider, Layout, Spinner} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import AuthNavigation from "./components/AuthNavigation";
import MainNavigation from "./components/MainNavigation";

export default function App() {
    const [user, setUser] = useState<User>({})
    const [logged, setLogged] = useState<undefined | boolean>(undefined);

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
            } else {
                setLogged(false);
            }
        } catch (e) {
            console.log(e.response);
        }
    }

    async function setUserData() {
        try {
            const response = await api.getUserMe()
            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (e) {
            console.log(e);
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
    let screens;

    if (logged === undefined) {
        screens =  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner size='giant'/></Layout>;
    } else if (!logged) {
        screens = <AuthNavigation
            setLogged={setLogged}
            setUserData={setUserData}
        />
    } else {
        screens = <MainNavigation />
    }

    /*(screens = logged ? <MainScreen /> : <AuthScreen
        setLogged={setLogged}
        setUserData={setUserData}
    />;*/

    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            {screens}
        </ApplicationProvider>
    );
}