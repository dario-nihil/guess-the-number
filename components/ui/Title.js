import { Text, StyleSheet, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 0 : 2,
    borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderColor: "#ffffff",
    padding: 12,
    maxWidth: "80%",
  },
});
