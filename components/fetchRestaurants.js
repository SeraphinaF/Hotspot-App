export const fetchRestaurants = async ( latitude, longitude) => {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    const location = `location=${latitude},${longitude}`;
    const radius = '&radius=2000';
    const query = 'restaurant'
    const apiKey = '&key=AIzaSyA3fJqwsIrMVF8w2XH-XiBwUq-xNO-K4zQ'; 
    const restaurantSearchUrl = `${url}${location}${radius}&query=${query}${apiKey}`;
 
    console.log(restaurantSearchUrl)
    try {
        const response = await fetch(restaurantSearchUrl);
        const result = await response.json();
        return result.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchRestaurants;