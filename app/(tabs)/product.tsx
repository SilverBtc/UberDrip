import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import productData from "../../assets/products_data/sweat.json";
type Product = {
    title: string;
    price: number;
    description: string;
    size: string;
    color: string;
    stock: number;
    images: string[];
    id: number;
};

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

    const product: Product = productData;

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
            {/*the header*/}
            <View style={styles.header}>
                <Ionicons name="menu" size={28} color="black" />
                <Text style={styles.title}>Uber Drip</Text>
                <Ionicons name="lock-closed-outline" size={28} color="black" />
            </View>

            {/*image of the product*/}
            <img
                style={styles.productImage}
                src={product.images[0]}
                alt={product.title}
            />
            {/*title of the product*/}
            <Text style={styles.sectionTitle}>{product.title}</Text>
            {/*price of the product*/}
            <Text style={styles.productPrice}>Price:</Text>
            <Text style={styles.sectionTitle}>{product.price}</Text>
            {/*Here possibility to switch image*/}

            {/*size of the product*/}
            <Text style={styles.title}>Size:</Text>
            <Text style={styles.sectionTitle}>{product.size}</Text>

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
