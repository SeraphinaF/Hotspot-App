import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchRestaurants } from '../components/fetchRestaurants';
import { useLocation } from '../components/useLocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-elements';

const MapScreen = ({ navigation, route }) => {
    
    const [restaurantList, setRestaurantList] = useState([]);
    const { location, latitude, longitude } = useLocation();

    useEffect(() => {
        const fetchNearbyRestaurants = async () => {
            const restaurants = await fetchRestaurants(latitude, longitude)
            setRestaurantList(restaurants)
        };
        fetchNearbyRestaurants();
    }, [latitude, longitude]);

    return (
        <View className="bg-white dark:bg-slate-800">
            <View className="flex flex-row">
                <Text className=" text-slate-600 border-b border-solid p-5 text-center text-xl">Restaurants nearby</Text>
                <TouchableOpacity className="flex items-center justify-center w-1/2 p-4 rounded-lg"
                    onPress={() => navigation.navigate('ListScreen')}>
                    <Icon
                        name="bars"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <MapView className="h-screen w-screen "
                showsUserLocation={true}
                followsUserLocation={true}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.035,
                    longitudeDelta: 0.035,
                }}
                provider="google"
                apiKey="&key= AIzaSyA3fJqwsIrMVF8w2XH-XiBwUq-xNO-K4zQ">

                {restaurantList.map(restaurant => (
                    <Marker
                        key={restaurant.id}

                        coordinate={{
                            latitude: restaurant.geometry.location.lat,
                            longitude: restaurant.geometry.location.lng,
                        }}

                        title={restaurant.name}
                    />
                ))}
            </MapView>

        </View>
    );

}

export default MapScreen;








