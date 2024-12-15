import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SongTile from "./SongTile";
import RecentTile from "./RecentTile";

interface Song {
  id: string;
  songName: string;
  authorName: string;
  albumId: string;
  songImage: string;
}

interface HorizontalListProps {
  data: Song[];
  cardType:String;
  requestFrom:[string,string];
}

const HorizontalList: React.FC<HorizontalListProps> = ({ data,cardType,requestFrom }) => {
  // Extract the first 6 items from the array
  const displayedData = data.slice(0, 6);

  return (
    <View style={styles.container}>
      {cardType==='Rectangle'?<FlatList
        data={displayedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecentTile
            id={item.id}
            songName={item.songName}
            songAuthor={item.authorName}
            imageUrl={item.songImage}
            requestFrom={requestFrom}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      :<FlatList
        data={displayedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongTile
          id={item.id}
          songName={item.songName}
          songAuthor={item.authorName}
          imageUrl={item.songImage}
          screen='homemusicplayer'
          stack='home'
        />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default HorizontalList;
