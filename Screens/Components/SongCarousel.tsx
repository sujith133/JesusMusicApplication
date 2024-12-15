import React from "react";
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { songCarousel } from './DummyDate'; // Assuming songCarousel is your data
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Album/Album';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
const { width: screenWidth } = Dimensions.get("window");
type NavigationProp = StackNavigationProp<RootStackParamList>;

const SongCarousel = () => {
    const navigation = useNavigation<NavigationProp>(); // Type the navigation hook
  
    const handleNavigator = ()=>{
      navigation.navigate('homemusicplayer',{stack:'home'})
      }
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsPagination={true}  // Show pagination dots
        loop={true}  // Enable looping
        autoplay={true}  // Enable autoplay
        dotStyle={styles.dot} // Custom style for inactive dots
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
      >
        {songCarousel.map((item) => (
          <TouchableOpacity key={item.id} onPress={()=>handleNavigator()}>
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:250, // Ensures the container takes full available space

  },
  wrapper: {
    height:250, // Ensure the swiper takes up the full height
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Inactive dot style
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#FF7F50', // Active dot style (you can change to your primary color)
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  pagination: {
    top: 230, // Adjust the position of the pagination dots
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SongCarousel;
