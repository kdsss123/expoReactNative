import { useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import yelp from "../api/yelp";


export default function RestaurantScreen() {
    // const [{data, loading, error}, searchRestaurant] = useRestaurant();
    // route.params에서 id 가져오기
    const route = useRoute();
    const { id } = route.params || {};

    const dimensions = Dimensions.get("window")
    const imageWidth = dimensions.width
    const imageHeight = Math.round((dimensions.width * 9)/16)

    const [results, setResults] = useState({
        data: null,
        loading: false,
        error: null,
      });

    useEffect(() => {
        fetchRestaurant();
    }, []);
    
    const fetchRestaurant = async () => {
        setResults({
          data: null,
          loading: true,
          error: null,
        });
        try {
            
          const response = await yelp.get(`/${id}`); 
           
          setResults({
            data: response.data,
            loading: false,
            error: null,
          });
        } catch (error) {
          setResults({
            data: null,
            loading: false,
            error: "something went wrong",
          });
        }
      };
    
    if(results.loading) return <Text>Loading...</Text>;

    if(results.error) return <Text>{error}</Text>;

    return (
        <View>
            {results.data && 
                (<FlatList 
                    data={results.data.photos}
                    keyExtractor={(photo) => photo}
                    renderItem={({item}) => (
                        <Image
                             source={{uri: item}}
                             style={{height: imageHeight, width: imageWidth}} 
                        />)}   
            />)}
        </View>
    );
}