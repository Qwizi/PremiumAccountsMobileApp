import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import SearchScreen from "./SearchScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function MainScreen(props: any) {

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
            <Screen name='Wyszukiwanie' component={() => <SearchScreen />}/>
            <Screen name='Ulubione' component={() => <div>2</div>}/>
            <Screen name='Moje konto' component={() => <div>3</div>}/>
        </Navigator>
    );

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}