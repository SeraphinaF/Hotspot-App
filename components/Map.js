import React from "react";
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import HomeScreen from '../screens/HomeScreen'


const Map = ({ restaurants }) => {
    return (
        <View>
            <MapView style={{ height: 400, width: 400 }}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google"
                apiKey="&key= AIzaSyA3fJqwsIrMVF8w2XH-XiBwUq-xNO-K4zQ">

                {restaurants.map(restaurant => (
                    <Marker
                        key={restaurant.name}
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