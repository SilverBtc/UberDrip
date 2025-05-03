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


const sizes = ['xs', 's', 'm', 'l', 'xl', 'all'];
const BrowsingPage = () => {
    {/*product from the json*/}
    const product: Product = productData;


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
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
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
