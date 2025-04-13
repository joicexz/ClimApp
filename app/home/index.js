//TELA INICIAL

import { Stack, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState("");
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo2.png")}
          style={styles.image}
          width={'50%'}
        />
        <Text style={styles.date}>{new Date().getDate()} de {months[new Date().getMonth()]}</Text>
        <Text style={styles.label}>Pesquise um lugar para saber como está o tempo.</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />
          <Pressable
            onPress={() => router.push("/search/results?query=" + city)}
          >
            <Image
              source={require("@/assets/images/search.png")}
              style={{ width: 29, height: 29 }}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20
  },
  date: {
    fontSize: 15,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 194, 194, 0.55)',
    width: '100%',
    borderRadius: 20,
    maxHeight: 54,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    width: 'auto'
  }
});


const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];