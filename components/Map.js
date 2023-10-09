import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from './useLocation';
// import RestaurantDetails from './RestaurantDetails'



const Map = ({ restaurants, navigation}) => {
    const { location, latitude, longitude, errorMsg } = useLocation(null);
  
    return (
        <View className="">
            <Text className="text-slate-600 border-b border-solid mt-36 p-5 text-center text-xl">Restaurants nearby</Text>
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

                    {restaurants.map(restaurant => (
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
};

export default Map;
