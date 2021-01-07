import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab,TopNavigation, TopNavigationAction, Divider} from '@ui-kitten/components';
import SearchScreen from "../screens/SearchScreen";
import ThreadDetailScreen from "../screens/ThreadDetailScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function MainNavigation(props: any) {

    useEffect(() => {
        console.log(props)
    }, [])

    // @ts-ignore
    const BottomTabBar = ({ navigation, state }) => (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title='Wyszukiwanie'/>
            <BottomNavigationTab title='Ulubione'/>
            <BottomNavigationTab title='Moje konto'/>
        </BottomNavigation>
    );

    const TabNavigator = () => (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Wyszukiwanie' component={(props) => <SearchScreen {...props} />}/>
            <Screen name='Ulubione' component={() => <div>2</div>}/>
            <Screen name='Moje konto' component={() => <div>3</div>}/>
            <Screen name='DetaleTematu' component={(props) => <ThreadDetailScreen {...props} />}/>
        </Navigator>
    );


    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}