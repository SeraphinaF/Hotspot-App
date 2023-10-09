import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { fetchRestaurants } from '../components/fetchRestaurants'
import { useLocation } from '../components/useLocation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function List({ navigation }) {

    const [restaurantList, setRestaurantList] = useState([]);
    const { latitude, longitude } = useLocation();

    useEffect(() => {
        const fetchNearbyRestaurants = async () => {
            const query = "restaurants"
            const restaurants = await fetchRestaurants(query, latitude, longitude)
            setRestaurantList(restaurants)
        };
        fetchNearbyRestaurants();
    }, [latitude, longitude]);

    return (
        <View className="pt-10">
             <TouchableOpacity className=""
                    onPress={() => navigation.navigate('MapScreen')}>
                    <Icon
                        name="map"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            <Text className="text-center text-xl">Restaurant List</Text>
            <View className='h-full pt-15'
                restaurants={restaurantList}>
                <FlatList
                    data={restaurantList}
                    renderItem={({ item: restaurant }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailsScreen', { restaurant })}>
                            <View className="py-6 px-4 border-b border-solid border-slate-300">
                                <Text>
                                    {restaurant.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={restaurant => restaurant.id}
                />
            </View>
        </View>
    );
}