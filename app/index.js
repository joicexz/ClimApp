//SPLASH SCREEN

import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
    }, 2000);
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.image}
        />
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
    backgroundColor: '#FC6C85'
  },
  image: {
    width: "100%",
  }
})