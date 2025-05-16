import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  View,
  Text,
  Platform,
} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const productList = [
  { name: 'Nike Sportswear Club Fleece', price: 99, brand: 'Nike', image: 'https://via.placeholder.com/150' },
  { name: 'Trail Running Jacket Nike Windrunner', price: 80, brand: 'Nike', image: 'https://via.placeholder.com/150' },
  { name: 'Adidas Windbreaker', price: 85, brand: 'Adidas', image: 'https://via.placeholder.com/150' },
  { name: 'Fila Retro Hoodie', price: 65, brand: 'Fila', image: 'https://via.placeholder.com/150' },
];

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Liste des produits */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productBrand}>{item.brand}</Text>
              <Text style={styles.productPrice}>{item.price} €</Text>
            </View>
          </View>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  productList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
