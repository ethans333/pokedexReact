import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Card(props) {
  const scale = useRef(new Animated.Value(1)).current;

  const bounceCard = () => {
    props.onPress();

    Animated.timing(scale, {
      toValue: 0.95,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={bounceCard}
      >
        <View style={styles.cardContent}>{props.children}</View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 350,
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 30,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
