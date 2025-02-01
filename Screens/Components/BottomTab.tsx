import React, { useCallback, useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type BottomTabProps = {
  visible: boolean;
  onClose: () => void;
};

const BottomTab: React.FC<BottomTabProps> = ({ visible, onClose }) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["25%", "50%", "90%"];
  const data = Array(50).fill(0).map((_, index) => `index-${index}`);

  const handleSheetChange = useCallback((index) => {
    //console.log("handleSheetChange", index);
  }, []);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.snapToIndex(0); // Open at the first snap point
    } else {
      sheetRef.current?.close(); // Close the sheet
    }
  }, [visible]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        onClose={onClose}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default BottomTab;
