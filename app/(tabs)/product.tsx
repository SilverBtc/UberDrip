import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
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


const imageMap: { [key: string]: any } = {
    'sweat.png': require('../../assets/products_data/sweat.png'),
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
            <Image
                style={styles.productImage}
                source={imageMap[product.images[0]]}
                accessibilityLabel={product.title}
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

            {/*description of the product*/}
            <Text style={styles.title}>Description:</Text>
            <Text style={styles.sectionTitle}>{product.description}</Text>

            {/*color of the product*/}

            {/*contact button*/}
            <TouchableOpacity style={styles.contactButton} onPress={() => alert('Ajouté au panier !')}>
                <Text style={styles.contactButtonText}>Ajouter au panier</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productImage: { width: 150, height: 150, borderRadius: 8 },
    productName: { fontWeight: 'bold', marginTop: 10 },
    productPrice: { color: 'gray' },
    contactButton: { backgroundColor: '#6c63ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, },
    contactButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },
});

export default BrowsingPage;
