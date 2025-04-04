import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const BrowsingPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={28} color="black" />
                <Text style={styles.title}>Uber Dripp</Text>
                <Ionicons name="lock-closed-outline" size={28} color="black" />
            </View>

            <Text style={styles.welcomeText}>Welcome to Laza.</Text>

            <View style={styles.searchContainer}>
                <TextInput placeholder="Search..." style={styles.searchInput} />
                <TouchableOpacity style={styles.voiceButton}>
                    <Ionicons name="mic" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Choose Brand</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandContainer}>
                {['Adidas', 'Nike', 'Fila'].map((brand, index) => (
                    <TouchableOpacity key={index} style={styles.brandButton}>
                        <Text style={styles.brandText}>{brand}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended Clothes</Text>
                <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productContainer}>
                {[{
                    name: 'Nike Sportswear Club Fleece',
                    price: '$99',
                    image: 'https://via.placeholder.com/150'
                }, {
                    name: 'Trail Running Jacket Nike Windrunner',
                    price: '$80',
                    image: 'https://via.placeholder.com/150'
                }].map((product, index) => (
                    <View key={index} style={styles.productCard}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
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
