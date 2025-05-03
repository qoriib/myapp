import {
  IProduct,
  createProductTable,
  getAllProducts,
} from "@/database/productDatabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProductListScreen() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const initialize = async () => {
    await createProductTable();
    const loaded = await getAllProducts();
    setProducts(loaded);
    setFilteredProducts(loaded);
  };

  const renderItem = ({ item }: { item: IProduct }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.shortDescription}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Lihat Detail"
          color="#1976d2"
          onPress={() => router.push(`/detail/${item.id}`)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Produk Kesehatan</Text>
        <TextInput
          placeholder="Cari produk..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id?.toString() || item.name}
          renderItem={renderItem}
        />
      </View>
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 16,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    borderColor: "#bbdefb",
    borderWidth: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 12,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
