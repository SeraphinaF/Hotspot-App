import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const RestaurantDetails = ({ route, navigation }) => {
    const { restaurant, restaurantId } = route.params;
    const [isFavorited, setIsFavorited] = useState([]);
    
    const mapScreenRef = useRef()
    console.log(mapScreenRef)

    const handleShowOnMap = (restaurantId) => {
        navigation.navigate('MapScreen', {restaurantId});
    };

    useEffect(() => {
        checkIfFavorited();
    }, []);


    const checkIfFavorited = async () => {
        try {
            const favoritesString = await AsyncStorage.getItem('favorites');
            if (favoritesString) {
                const favorites = JSON.parse(favoritesString);
                const isRestaurantFavorited = favorites.some(
                    favRestaurantId => favRestaurantId === restaurantId
                );
                setIsFavorited(isRestaurantFavorited);

            }
        } catch (error) {
            console.error('Error reading favorites from AsyncStorage:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            let favorites = [];
            const favoritesString = await AsyncStorage.getItem('favorites');

            if (favoritesString) {
                favorites = JSON.parse(favoritesString);
            }

            if (isFavorited) {
                favorites = favorites.filter(
                    favRestaurantId => favRestaurantId !== restaurantId
                );
            } else {
                favorites.push({ id: restaurantId }); // Add restaurant with its unique ID
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error('Error updating favorites in AsyncStorage:', error);
        }
    };


    return (
        <View className="h-screen bg-white " >
            <ImageBackground className="relative h-56 w-screen"
                source=
                {{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`,
                }}
            >
                <TouchableOpacity onPress={() => navigation.navigate('ListScreen')}
                    className="absolute top-5 left-4">
                    <Icon
                        name="chevron-left"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>

                <View className="absolute bottom-4 right-4 flex-row">
                    <Icon
                        name="star"
                        size={23}
                        color="white"
                    />
                    <Text className="text-white text-base"> {restaurant.rating} / 5  </Text>
                </View>

                <TouchableOpacity className="absolute bottom-4 right-4"
                    onPress={toggleFavorite}>
                    <Icon
                        name={isFavorited ? 'heart' : 'heart-o'}
                        size={30}
                        color={isFavorited ? 'red' : 'white'}
                    />
                </TouchableOpacity>
            </ImageBackground>



            <View className="mx-3 ">
                <Text className="my-6 text-center text-xl ">
                    {restaurant.name}
                </Text>

                <TouchableOpacity onPress={handleShowOnMap}>
                    <Text className="mb-4" >
                        {restaurant.formatted_address}
                    </Text>
                </TouchableOpacity>

                <View>
                    <Text className={restaurant.open_now ? "text-red-500 text-ml" : "text-blue-500 text-sm"}>
                        {restaurant.open_now ? "Closed Now" : "Open Now"}
                    </Text>
                </View>
                {/* <View className="mb-4 flex-row items-center">
                    <Text className={restaurant.open_now ? "text-red-500 text-ml" : "text-blue-500 text-sm"}>
                        {restaurant.open_now ? "Closed Now" : "Open Now"}
                    </Text>
                    <Text className="mx-5">
                        {restaurant.opening_hours} •    Sun 11am -11pm
                    </Text>
                </View> */}
                {/* <Text>{restaurant.opening_hours}</Text> */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('Map', { restaurantLocation: restaurant.geometry.location})}>
                <View >
                <Text>Show on map</Text>
                </View>
            </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default RestaurantDetails;