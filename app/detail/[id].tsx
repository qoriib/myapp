import { IProduct, getProductById } from "@/database/productDatabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Memuat data produk...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Produk</Text>
        </View>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.short}>{product.shortDescription}</Text>
        <Text style={styles.long}>{product.longDescription}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#e3f2fd",
  },
  container: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#1565c0",
    marginRight: 16,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0d47a1",
  },
  price: {
    fontSize: 20,
    color: "#1E90FF",
    marginBottom: 16,
  },
  short: {
    fontSize: 16,
    textAlign: "justify",
    color: "#333",
    marginBottom: 12,
  },
  long: {
    fontSize: 16,
    textAlign: "justify",
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
  },
  loadingText: {
    fontSize: 18,
    color: "#0d47a1",
    fontWeight: "bold",
  },
});
