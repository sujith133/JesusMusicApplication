import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SongTile from "./SongTile";
import AlbumTile from "./AlbumTile";
import RecentTile from "./RecentTile";

interface Song {
  id: number;
  songName: string;
  authorName: string;
  albumId: string;
  songImage: string;
}

interface Album {
  id: number;
  albumName: string;
  albumAuthor: string;
  songId: number[];
  AlbumImage?: string; // Optional image property for Album
  cardfrom:string;
}

interface Podcast {
  id: number;
  podcastName: string;
  podcastHost: string;
  songId: number[];
  podcastImage?: string; // Optional image property for Podcast
}

interface HorizontalListProps {
  data: (Song | Album | Podcast)[]; // Can accept Song, Album, or Podcast
  cardType: string;
}

const HorizontalListAlbum: React.FC<HorizontalListProps> = ({ data, cardType }) => {
  // Extract the first 6 items from the array
  const displayedData = data.slice(0, 6);

  const getImageUrl = (item: Song | Album | Podcast): string => {
    // Return the image URL if available or a fallback image
    if ("songImage" in item && item.songImage) {
      return item.songImage;
    } else if ("AlbumImage" in item && item.AlbumImage) {
      return item.AlbumImage;
    } else if ("podcastImage" in item && item.podcastImage) {
      return item.podcastImage;
    }
    return "https://via.placeholder.com/150"; // Fallback image if no image is provided
  };

  const isAlbum = (item: Song | Album | Podcast): item is Album => {
    return "albumName" in item && "albumAuthor" in item;
  };

  const isSong = (item: Song | Album | Podcast): item is Song => {
    return "songName" in item && "authorName" in item;
  };

  const isPodcast = (item: Song | Album | Podcast): item is Podcast => {
    return "podcastName" in item && "podcastHost" in item;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedData}
        keyExtractor={(item, index) => {
          // Safely extract the ID for each item type or fall back to the index as a key
          if ("id" in item && item.id !== undefined) return item.id.toString();
          if ("albumName" in item && item.id !== undefined) return item.id.toString();
          if ("podcastName" in item && item.id !== undefined) return item.id.toString();
          return index.toString(); // Fallback to the index if no valid ID is found
        }}
        renderItem={({ item }) => {
          if (cardType === "Rectangle") {
            return isSong(item) ? (
              <RecentTile
                id={item.id}
                songName={item.songName}
                songAuthor={item.authorName}
                imageUrl={getImageUrl(item)}
              />
            ) : null;
          } else {
            return isAlbum(item) ? (
              <AlbumTile
                id={item.id}
                songName={item.albumName}
                songAuthor={item.albumAuthor}
                imageUrl={getImageUrl(item)}
                cardfrom = 'homealbum'
              />
            ) : isPodcast(item) ? (
              <AlbumTile
                id={item.id}
                songName={item.podcastName}
                songAuthor={item.podcastHost}
                imageUrl={getImageUrl(item)}
                cardfrom = 'homealbum'

              />
            ) : isSong(item) ? (
              <SongTile
                id={item.id}
                songName={item.songName}
                songAuthor={item.authorName}
                imageUrl={getImageUrl(item)}
              />
            ) : null;
          }
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default HorizontalListAlbum;
