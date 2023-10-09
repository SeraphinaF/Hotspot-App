import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Imports
import MapScreen from './screens/MapScreen';
import List from './screens/List';
import RestaurantDetails from './components/RestaurantDetails';
import TabNav from './components/TabNav';

const Stack = createNativeStackNavigator();

function App() {

    return (
    
      <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='MapScreen'
                    component={MapScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name='ListScreen'
                    component={List}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name='DetailsScreen'
                    component={RestaurantDetails}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name='TabNav'
                    component={TabNav}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;

