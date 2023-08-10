import React from 'react'
// import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TaskList from './screens/TaskList'
import Auth from './screens/Auth'
import { SafeAreaView } from 'react-native-safe-area-context'
const Stack = createStackNavigator()
// const Drawer = createDrawerNavigator();

const AuthNavigator = () => {
    return (<SafeAreaView  style={{flex:1}}>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={TaskList} />
        </Stack.Navigator>
        </SafeAreaView>
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
};

export default Navigator;