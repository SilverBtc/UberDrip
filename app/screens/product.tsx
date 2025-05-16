import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// C'EST ICI HECTOR
import productData from "../../assets/products_data/data/kanye.json";
import userData from "../../assets/user_data/data/youcef.json";
// JUSTE AU DESSUS
import { useNavigation } from '@react-navigation/native';

import { BlurView } from 'expo-blur';


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

type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    frequenceOfUse: 'Rarely' | 'Sometimes' | 'Often' | 'Very Often'; // enum-like
    age: number;
    city: string;
    profileImage: string; // Peut être un path local ou une URL
};


// ICI AUSSI LE S
const imageMap: { [key: string]: any } = {
    'sweat.png': require('../../assets/products_data/images/sweat.png'),
    'kanye.jpeg': require('../../assets/products_data/images/kanye.jpeg'),
    'kanye2.jpg': require('../../assets/products_data/images/kanye2.jpg'),
    'White-Sweatshirt-Funny-Boys-Kanye-West-Fortnite-Shirt.jpeg': require('../../assets/products_data/images/White-Sweatshirt-Funny-Boys-Kanye-West-Fortnite-Shirt.jpeg'),
    'Youcef.png': require('../../assets/user_data/images/Youcef.png'),
};

const BrowsingPage = () => {

    // product and user from their json*
    const product: Product = productData;
    const user: User = userData;

    // State of the see more section
    const [showMore, setShowMore] = useState(false);

    // For the back button
    const navigation = useNavigation();

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [showFullScreen, setShowFullScreen] = useState(false);


    return (
        <View style={{ flex: 1 }}>

            {/* Absolute Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <ScrollView style={styles.container}>

                {/*image of the product*/}
                <TouchableOpacity onPress={() => setShowFullScreen(true)}>
                    <Image
                        style={styles.productImage}
                        source={imageMap[mainImage]}
                        accessibilityLabel={product.title}
                    />
                </TouchableOpacity>

                {product.images.length > 1 && (
                    <View style={styles.prodImages}>
                        {product.images.map((imageName, index) => (
                            <TouchableOpacity key={index} onPress={() => setMainImage(imageName)}>
                                <Image
                                    key={index}
                                    source={imageMap[imageName]}
                                    style={[styles.previewImage, imageName === mainImage && styles.selectedPreviewImage]}
                                    accessibilityLabel={`Preview ${index + 1}`}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {/*User profile*/}
                <View style={styles.divider} />
                <View style={styles.sellerBox}>
                    <Image source={imageMap[user.profileImage]} style={styles.userImage}></Image>
                    <View>
                        <Text>{user.firstName}</Text>
                        <Text style={styles.productPrice}>{user.frequenceOfUse}</Text>
                    </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.headProduct}>
                    <View style={styles.titleContainer}>
                        {/*title of the product*/}
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.productPrice}>Description:</Text>
                    </View>

                    {/*price of the product*/}
                    <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>Price:</Text>
                        <Text style={styles.sectionTitle}>{product.price} €</Text>
                    </View>
                </View>

                {/*description of the product*/}
                <Text style={styles.sectionTitle}>" {product.description} "</Text>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Details</Text>
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
            {/* Showing image on click*/}
            {showFullScreen && (
                <BlurView intensity={70} tint="dark" style={styles.fullScreenOverlay}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowFullScreen(false)}>
                        <Ionicons name="close" size={32} color="white" />
                    </TouchableOpacity>
                    <Image
                        source={imageMap[mainImage]}
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                    />
                </BlurView>
            )}
            {/*contact buttons*/}
            <View style={styles.containContactButtons}>
                <TouchableOpacity style={styles.contactButton} onPress={() => alert('Ajouté au panier !')}>
                    <Text style={styles.contactButtonText}>Make an Offer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton} onPress={() => alert('Négotiations débutés')}>
                    <Text style={styles.contactButtonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productImage: { width: "100%", height: 350, borderRadius: 8 },
    productName: { fontWeight: 'bold', marginTop: 10 },
    productPrice: { color: 'gray' },
    containContactButtons: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#fff',
    },
    contactButton: { backgroundColor: '#6c63ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '40%',
    },
    contactButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, },
    viewPrice: {flexDirection: 'row', justifyContent: 'flex-end',},
    headProduct: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 10},
    titleContainer: {display: "flex", flexDirection: "column",justifyContent: "space-between"}, priceContainer: {alignItems: 'flex-end',},
    descriptionContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 55,
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
    prodImages: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 11,
        borderRadius: 8,
    },
    previewImage: {
        width: 50,
        height: 50,
        marginRight: 20,
    },


    selectedPreviewImage: {
        borderWidth: 2,
        borderColor: '#6c63ff',
    },

    fullScreenOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        overflow: 'hidden',
    },

    fullScreenImage: {
        width: '90%',
        height: '70%',
        borderRadius: 10,
    },

    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1000,
    },
    sellerBox:{
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
    userImage:{
        marginRight: 20,
        width: 50,
        height: 50,
        borderRadius: '100%',
    }
});

export default BrowsingPage;
