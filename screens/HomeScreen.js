import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Map from '../components/Map'
import *as Location from 'expo-location';

export default function HomeScreen() {

    const [location, setLocation] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [restaurantList, setRestaurantList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({})
            setLocation(true)
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setLocation(location)
            console.log(location)
        })();
    }, []);

    let text = 'Loading..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    restaurantSearchHandler = () => {
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        const location = `location=${latitude},${longitude}`;
        const radius = '&radius=2000';
        const type = ['&keyword=restaurant', '&keyword=bar', '&keyword=bar', '&keyword=eetgelegenheid', 'cafe'];
        const key = '&key= AIzaSyA3fJqwsIrMVF8w2XH-XiBwUq-xNO-K4zQ';
        const restaurantSearchUrl = url + location + radius + type + key;
        fetch(restaurantSearchUrl)
            .then(response => response.json())
            .then(result => setRestaurantList(result.results))
            .catch(error => console(error))
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <Map restaurants={restaurantList} />
            </View>
            <FlatList
                data={restaurantList}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id} />
            <TouchableOpacity onPress={restaurantSearchHandler}>
                <Text style={{ backgroundColor: 'grey', color: 'white', padding: 20, marginBottom: 50 }}>
                    Search Restaurants
                </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

