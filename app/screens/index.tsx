import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const productList = [{ name: 'Nike Sportswear Club Fleece', price: 99, brand: 'Nike', image: 'https://via.placeholder.com/150' },
    { name: 'Trail Running Jacket Nike Windrunner', price: 80, brand: 'Nike', image: 'https://via.placeholder.com/150' },
    { name: 'Adidas Windbreaker', price: 85, brand: 'Adidas', image: 'https://via.placeholder.com/150' },
    { name: 'Fila Retro Hoodie', price: 65, brand: 'Fila', image: 'https://via.placeholder.com/150' },
];

const brands = ['All', 'Adidas', 'Nike', 'Fila'];

const price = ['0', '<10', '<25', '<100', 'all']

const material = ['wool', 'polyester', 'jean', 'cum', 'all']

const sizes = ['xs', 's', 'm', 'l', 'xl', 'all'];
const BrowsingPage = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');

    const filteredProducts = productList.filter(product => {
        const matchBrand = selectedBrand === 'All' || product.brand === selectedBrand;
        const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
        return matchBrand && matchSearch;
    });
    return (
        <ScrollView style={styles.container}>

            <View style={styles.searchContainer}>
                <TextInput placeholder="Search..."
                           style={styles.searchInput}
                           value={searchText}
                           onChangeText={setSearchText}
                />
            </View>

            <Text style={styles.sectionTitle}>Set Filters:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandContainer}>
                {brands.map((brand, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.brandButton, selectedBrand === brand && { backgroundColor: '#6c63ff' }]}
                        onPress={() => setSelectedBrand(brand)}
                    >
                        <Text style={[styles.brandText, selectedBrand === brand && { color: '#fff' }]}>
                            {brand}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandContainer}>
                {price.map((price, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.brandButton, selectedPrice === price && { backgroundColor: '#6c63ff' }]}
                        onPress={() => setSelectedPrice(price)}
                    >
                        <Text style={[styles.brandText, selectedPrice === price && { color: '#fff' }]}>
                            {price}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandContainer}>
                {material.map((material, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.brandButton, selectedMaterial === material && { backgroundColor: '#6c63ff' }]}
                        onPress={() => setSelectedMaterial(material)}
                    >
                        <Text style={[styles.brandText, selectedMaterial === material && { color: '#fff' }]}>
                            {material}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandContainer}>
                {sizes.map((size, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.brandButton, selectedSize === size && { backgroundColor: '#6c63ff' }]}
                        onPress={() => setSelectedSize(size)}
                    >
                        <Text style={[styles.brandText, selectedSize === size && { color: '#fff' }]}>
                            {size}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Clothes</Text>
                <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productContainer}>
                {filteredProducts.map((product, index) => (
                    <View key={index} style={styles.productCard}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>${product.price}</Text>

                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    welcomeText: { fontSize: 18, color: 'gray', marginBottom: 20 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    searchInput: { flex: 1, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
    voiceButton: { marginLeft: 10, backgroundColor: '#6c63ff', padding: 10, borderRadius: 8 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    brandContainer: { flexDirection: 'row', marginBottom: 20 },
    brandButton: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 20, marginRight: 10 },
    brandText: { fontWeight: 'bold' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    viewAll: { color: '#6c63ff' },
    productContainer: { flexDirection: 'row', marginVertical: 10 },
    productCard: { marginRight: 15, width: 150 },
    productImage: { width: 150, height: 150, borderRadius: 8 },
    productName: { fontWeight: 'bold', marginTop: 10 },
    productPrice: { color: 'gray' },
});

export default BrowsingPage;
