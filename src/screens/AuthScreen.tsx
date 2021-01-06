import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import LoginScreen from "./LoginScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function AuthScreen(props: any) {

    const RegisterScreen = () => (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Rejestracja</Text>
        </Layout>
    )

    // @ts-ignore
    const BottomTabBar = ({ navigation, state }) => (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title='Logowanie'/>
            <BottomNavigationTab title='Rejestracja'/>
        </BottomNavigation>
    );

    const TabNavigator = () => (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Logowanie' component={() => <LoginScreen
                setUserData={props.setUserData}
                setLogged={props.setLogged}
            />}/>
            <Screen name='Rejestracja' component={RegisterScreen}/>
        </Navigator>
    );

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )

}