//TELA PESQUISA

import { SearchResult } from "@/components/SearchResult";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Results() {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [search, setSearch] = useState(query);

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/search.json?key=0e884bbc9a6247bf97b125736250704&q=${query}`)
      .then((response) => response.json())
      .then(async (data) => {
        setResults(
          await Promise.all(
            data.map(async (item) => {
              const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=0e884bbc9a6247bf97b125736250704&q=${item.name}`);
              const weatherData = await weatherResponse.json();
              return {
                city: item.name,
                pais: item.country,
                temperature: weatherData.current.temp_c,
                image: 'https:' + weatherData.current.condition.icon,
              };
            })
          )
        )
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [query]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.date}>{new Date().getDate()} de {months[new Date().getMonth()]}</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={search} onChangeText={setSearch} />
          <Pressable
            onPress={() => router.push("/search/results?query=" + search)}
          >
            <Image
              source={require("@/assets/images/search.png")}
              style={{ width: 29, height: 29 }}
            />
          </Pressable>
        </View>
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <Pressable
                style={{ marginVertical: 10 }}
                onPress={() => router.push("/search/details?city=" + item.city)}
              >
                <SearchResult
                  image={item.image}
                  city={item.city}
                  pais={item.pais}
                  temperature={item.temperature}
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.city}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  )
};

const fakeResults = [
  {
    image: "https://static.vecteezy.com/system/resources/previews/015/309/617/non_2x/sun-on-transparent-background-free-png.png",
    city: "Itapevi",
    temperature: 25,
  },
  {
    image: "https://static.vecteezy.com/system/resources/previews/015/309/617/non_2x/sun-on-transparent-background-free-png.png",
    city: "São Paulo",
    temperature: 25,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 20,
  },
  date: {
    fontSize: 15,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 194, 194, 0.55)',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 60,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    gap: 20,
  },
});
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];