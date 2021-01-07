import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function AuthNavigation(props: any) {


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
            <Screen name='Rejestracja' component={() => <RegisterScreen />}/>
        </Navigator>
    );

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}