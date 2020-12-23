import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "./Components/Card";
import SvgUri from "expo-svg-uri";
import { useEffect } from "react";
import PopUpCard from "./Components/PopUpCard";

const fetchPokemon = () => {
  const id = Math.floor(Math.random() * 898);
  const uri = `https://pokeapi.co/api/v2/pokemon/${id}`;

  return fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      if (data.sprites.other.dream_world.front_default == null) {
        return "error";
      } else {
        const capFirstChar = (string) => {
          string = string.charAt(0).toUpperCase() + string.slice(1);
          string = string.replace("-", " ");
          if (string.includes(" ")) {
            let secondWord = string.slice(
              string.indexOf(" ") + 1,
              string.length
            );
            string = string.replace(secondWord, capFirstChar(secondWord));
          }
          return string;
        };
        return {
          key: id.toString(),
          color: genColor(),
          name: capFirstChar(data.forms[0].name),
          img: data.sprites.other.dream_world.front_default,
          imgPixelArt: data.sprites.front_default,
          ability: capFirstChar(data.abilities[0].ability.name),
          move: capFirstChar(data.moves[0].move.name),
          weight: data.weight,
          height: data.height,
        };
      }
    });
};

const genColor = () => {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
};

export default function App() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [popUpData, setPopUpData] = React.useState({});
  const popUpRef = React.useRef();

  useEffect(() => {
    (async () => {
      let data = [];
      for (let i = 0; i < 10; i++) {
        let newPokemon = await fetchPokemon();
        if (newPokemon != "error" && !data.includes(newPokemon)) {
          data.push(newPokemon);
        }
      }
      setPokemonData(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          data={pokemonData}
          onEndReached={async () => {
            let data = pokemonData;

            for (let i = 0; i < 3; i++) {
              let newPokemon = await fetchPokemon();
              if (newPokemon != "error" && !data.includes(newPokemon)) {
                data.push(newPokemon);
              }
            }
            setPokemonData(data);
          }}
          renderItem={({ item, index }) => (
            <Card
              onPress={() => {
                setPopUpData(pokemonData[index]);
                popUpRef.current.showCard();
              }}
            >
              <View
                style={[styles.pokemonImg, { backgroundColor: item.color }]}
              >
                <SvgUri
                  width="120"
                  height="120"
                  source={{
                    uri: item.img,
                  }}
                />
              </View>
              <Text style={styles.pokemonName}>{item.name}</Text>
            </Card>
          )}
        />
      </View>

      <PopUpCard ref={popUpRef} info={popUpData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonName: {
    marginTop: 20,
    fontWeight: "bold",
  },
  pokemonImg: {
    width: 180,
    height: 180,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  gestureContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
