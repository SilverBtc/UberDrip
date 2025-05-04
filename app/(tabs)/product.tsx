import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
{/*C'EST ICI HECTOR*/}
import productData from "../../assets/products_data/data/sweat.json";
{/*JUSTE AU DESSUS*/}
import { useNavigation } from '@react-navigation/native';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    size: string;
    stock: number;
    images: string[];
    nbLikes: number;
    sellerID: number;
    category: string;
    color: string;
    nbSeen: number;
    deliveryPrice: number;
    brand: string;
    state: string;
};


const imageMap: { [key: string]: any } = {
    'sweat.png': require('../../assets/products_data/images/sweat.png'),
    'kanye.jpeg': require('../../assets/products_data/images/kanye.jpeg'),
};

const BrowsingPage = () => {

    {/*product from the json*/}
    const product: Product = productData;

    {/*State of the see more section*/}
    const [showMore, setShowMore] = useState(false);

    {/*For the back button*/}
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            {/* Absolute Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={styles.container}>


                {/*image of the product*/}
                <Image
                    style={styles.productImage}
                    source={imageMap[product.images[0]]}
                    accessibilityLabel={product.title}
                />
                <View style={styles.headProduct}>
                    <View style={styles.titleContainer}>
                        {/*title of the product*/}
                        <Text style={styles.title}>{product.title}</Text>
                    </View>

                    {/*price of the product*/}
                    <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>Price:</Text>
                        <Text style={styles.sectionTitle}>{product.price} €</Text>
                    </View>
                </View>

                {/*Here possibility to switch image*/}

                {/*description of the product*/}
                <Text style={styles.productPrice}>Description:</Text>
                <Text style={styles.sectionTitle}>" {product.description} "</Text>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>

                    {/* Always show first attribute (e.g., state) */}
                    <View style={styles.attributeRow}>
                        <Text style={styles.attributeLabel}>State</Text>
                        <Text style={styles.attributeValue}>{product.state}</Text>
                    </View>

                    {/* Expandable section */}
                    {showMore && (
                        <>
                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Brand</Text>
                                <Text style={styles.attributeValue}>{product.brand}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Category</Text>
                                <Text style={styles.attributeValue}>{product.category}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Size</Text>
                                <Text style={styles.attributeValue}>{product.size}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Color</Text>
                                <Text style={styles.attributeValue}>{product.color}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Stock</Text>
                                <Text style={styles.attributeValue}>{product.stock}</Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.attributeRow}>
                                <Text style={styles.attributeLabel}>Delivery</Text>
                                <Text style={styles.attributeValue}>{product.deliveryPrice} €</Text>
                            </View>
                        </>

                    )}


                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                        <Text style={styles.seeMore}>
                            {showMore ? 'See less' : 'See more'}
                        </Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
            {/*contact button*/}
            <TouchableOpacity style={styles.contactButton} onPress={() => alert('Ajouté au panier !')}>
                <Text style={styles.contactButtonText}>Contact Seller</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productImage: { width: "100%", height: 250, borderRadius: 8 },
    productName: { fontWeight: 'bold', marginTop: 10 },
    productPrice: { color: 'gray' },
    contactButton: { backgroundColor: '#6c63ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20,
        position: 'absolute',
        bottom: 10,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,},
    contactButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },
    viewPrice: {flexDirection: 'row', justifyContent: 'flex-end',},
    headProduct: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 10},
    titleContainer: {alignSelf: 'flex-end',}, priceContainer: {alignItems: 'flex-end',},
    descriptionContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    attribute: {
        fontSize: 14,
        marginVertical: 2,
    },
    seeMore: {
        color: '#6c63ff',
        marginTop: 10,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    attributeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    attributeLabel: {
        fontWeight: '600',
        color: '#333',
    },
    attributeValue: {
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },

});

export default BrowsingPage;
