import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Album/Album';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { useDispatch } from 'react-redux';
import { setSongQueue } from '../Redux/StateSlice';
interface SongTileProps {
  id: string; // Unique identifier for the song tile
  songName: string; // Name of the song
  songAuthor: string; // Author of the song
  imageUrl: string; // URL of the image
  requestFrom:[string,string];
  songUrl:string;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;

const RecentTile: React.FC<SongTileProps> = ({ id, songName, songAuthor, imageUrl,songUrl }) => {
  const navigation = useNavigation<NavigationProp>(); // Type the navigation hook
  const dispatch =useDispatch();
  const handleNavigator = (url)=>{
    dispatch(setSongQueue(url));
    navigation.navigate('homemusicplayer',{stack:'home',view:false})
    }
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=>handleNavigator([{id:id,url:songUrl,title:songName,artist:songAuthor,artwork:imageUrl}])}>
    <View style={styles.container} key={id}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
      <Text style={styles.songName} numberOfLines={1} ellipsizeMode="tail">{songName}</Text>
      <Text style={styles.songAuthor} numberOfLines={1} ellipsizeMode="tail">{songAuthor}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 20,
    shadowColor: '#257180', // Shadow color
    shadowOffset: { width: 1, height: 2 }, // x = 1, y = 2
    shadowOpacity: 0.4, // 40% opacity
    shadowRadius: 2.5, // Blur radius
    elevation: 5, // Required for shadow to work on Android
    backgroundColor: 'white', // Add background color to make shadow visible
    padding:15,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginRight:20,
  },
  songName: {
    width:110,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily:'Poppins',
    textAlign: 'left',
    color:'#257180',
  },
  songAuthor: {
    width:110,
    fontSize: 12,
    fontFamily:'Rowdies',
    color: '#257180',
    textAlign: 'left',
  },
});

export default RecentTile;
