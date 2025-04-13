//TELA RESULTADO PESQUISA

import { Image, StyleSheet, Text, View } from "react-native";

export function SearchResult({ image, city, temperature, pais }) {
  console.log("image", image);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={{ width: 100, height: 100 }}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{city}</Text>
        <Text style={styles.label}>{pais}</Text>
        <Text style={styles.label}>{temperature}°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
    maxHeight: 180,
    gap: 20,
    borderColor: '#FC6C85',
    borderWidth: 4,
    borderRadius: 20,
  },
  image: {
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
    alignItems: "flexStart",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
