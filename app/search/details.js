//TELA DETALHES

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, Pressable } from "react-native";

export default function Details() {
  const router = useRouter();
  const { city: query } = useLocalSearchParams();
  const [city, setCity] = useState(undefined);
  const [search, setSearch] = useState(query);

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=0e884bbc9a6247bf97b125736250704&q=${query}&lang=pt&days=1`)
      .then((response) => response.json())
      .then(async (data) => {
        setCity({
          name: query,
          pais: data.location.country,
          temperature: data.current.temp_c,
          weather: data.current.condition.text,
          max: data.forecast.forecastday[0].day.maxtemp_c,
          min: data.forecast.forecastday[0].day.mintemp_c,
          image: 'https:' + data.current.condition.icon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  if (!city) {
    return <Text>Loading...</Text>;
  }

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
        <View style={styles.detailsContainer}>
          <View style={styles.detailsInfoContainer}>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.temperature}>{city.temperature.toFixed(0)}°C</Text>
            <View style={styles.rangeTemperatureContainer}>
              <View style={styles.rangeTemperature}>
                <Image
                  source={require("@/assets/images/arrow-up.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={styles.rangeTemperatureText}>{city.max}°</Text>
              </View>
              <View style={styles.rangeTemperature}>
                <Image
                  source={require("@/assets/images/arrow-down.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={styles.rangeTemperatureText}>{city.min}°</Text>
              </View>
            </View>
          </View>
          <Image
            source={{
              uri: city.image,
            }}
            style={{ width: '50%', height: '60%' }}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.weather}>{city.weather}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 40,
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
    marginHorizontal: 'auto'
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    alignItems: "flexStart",
    flexDirection: "row",
    maxHeight: 250,
    marginVertical: 20,
  },
  detailsInfoContainer: {
    flex: 1,
    alignItems: "flexStart",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 20,
  },
  cityName: {
    fontSize: 30,
    fontWeight: 300,
  },
  temperature: {
    fontSize: 70,
    fontWeight: "semibold",
  },
  rangeTemperatureContainer: {
    flexDirection: 'row',
    gap: 20
  },
  rangeTemperature: {
    borderRadius: 20,
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rangeTemperatureText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  weather: {
    fontSize: 38,
    fontWeight: "semibold",
    color: "#FC6C85",
  },
});

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const cityDetails = {
  name: "São Paulo",
  temperature: 25,
  weather: "Parcialmente nublado",
  max: 30,
  min: 20,
  image: "https://static.vecteezy.com/system/resources/previews/015/309/617/non_2x/sun-on-transparent-background-free-png.png",
}