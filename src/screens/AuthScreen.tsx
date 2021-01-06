import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AuthScreen(props: any) {

    const LoginScreen = () => (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Logowanie</Text>
        </Layout>
    )

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
            <Screen name='Logowanie' component={LoginScreen}/>
            <Screen name='Rejestracja' component={RegisterScreen}/>
        </Navigator>
    );

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )

}