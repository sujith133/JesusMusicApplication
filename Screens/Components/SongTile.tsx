import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Album/Album';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

interface SongTileProps {
  id: number; // Unique identifier for the song tile
  songName: string; // Name of the song
  songAuthor: string; // Author of the song
  imageUrl: string; // URL of the image
  screen: string;
  stack: string;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;

const SongTile: React.FC<SongTileProps> = ({ id, songName, songAuthor, imageUrl,screen,stack }) => {
  const navigation = useNavigation<NavigationProp>(); // Type the navigation hook
  const handleNavigator = (screen, stack)=>{
    navigation.navigate(screen,{stack})
  }
  return (
    <TouchableOpacity onPress={()=>handleNavigator(screen,stack)}>
      <View style={styles.container} key={id}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.songName} numberOfLines={1} ellipsizeMode="tail">{songName}</Text>
        <Text style={styles.songAuthor} numberOfLines={1} ellipsizeMode="tail">{songAuthor}</Text>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    overflow:'hidden',
    borderRadius: 8,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 8,
  },
  songName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'Poppins',
    textAlign: 'left',
    color:'#257180',
  },
  songAuthor: {
    fontSize: 14,
    fontFamily:'Rowdies',
    color: '#257180',
    textAlign: 'left',
  },
});

export default SongTile;
