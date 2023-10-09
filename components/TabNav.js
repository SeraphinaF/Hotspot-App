import React from "react"
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function TabNav({navigation}) {

    return (
        <View className="flex flex-row justify-between">
            <TouchableOpacity className="flex items-center justify-center w-1/2 p-4 bg-white rounded-lg"
                onPress={() => navigation.navigate('MapScreen')}>
                <Icon
                    name="map"
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center w-1/2 p-4 bg-white rounded-lg"
            onPress={() => navigation.navigate('ListScreen')}>
                <Icon
                    name="bars"
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    )
}