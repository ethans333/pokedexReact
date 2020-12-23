import React, { useRef, forwardRef } from "react";
import { useImperativeHandle } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";

export default forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      showCard: () => {
        Animated.timing(popUpCardX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    }),
    []
  );

  const scale = useRef(new Animated.Value(1)).current;
  const popUpCardX = useRef(new Animated.Value(-600)).current;

  const hideCard = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(popUpCardX, {
          toValue: -600,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scale }, { translateX: popUpCardX }] },
        { position: "absolute" },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={hideCard}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.pokemonImg}
            source={{ uri: props.info.imgPixelArt }}
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{props.info.name}</Text>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "#4200d1" }}>
              <Text style={styles.boldText}>Ability: </Text>
              <Text>{props.info.ability}</Text>
            </Text>
            <Text style={{ color: "#fc036b" }}>
              <Text style={styles.boldText}>Move: </Text>
              <Text>{props.info.move}</Text>
            </Text>
            <Text style={{ color: "#00ba7f" }}>
              <Text style={styles.boldText}>Weight: </Text>
              <Text>{props.info.weight}</Text>
              <Text style={styles.boldText}> Height: </Text>
              <Text>{props.info.height}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: 258,
    height: 300,
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    textAlign: "left",
    alignItems: "flex-start",
    marginLeft: 30,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  pokemonImg: {
    width: 125,
    height: 125,
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
