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
    frequenceOfUse: string; // Changed from enum to string to match data
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
    const [showFullScreen, setShowFullScreen] = useState(false);    return (
        <View className="flex-1">            {/* Absolute Back Button */}
            <TouchableOpacity 
                className="absolute top-10 left-5 z-50 bg-white p-2 rounded-full shadow-lg border border-gray-100"
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="#6c63ff" />
            </TouchableOpacity>

            <ScrollView className="flex-1 p-5 bg-white">                {/*image of the product*/}
                <TouchableOpacity onPress={() => setShowFullScreen(true)}>
                    <Image
                        style={imageStyles.mainProductImage}
                        source={imageMap[mainImage]}
                        accessibilityLabel={product.title}
                        resizeMode="cover"
                    />
                </TouchableOpacity>                {product.images.length > 1 && (
                    <View className="flex-row mt-4 space-x-3">
                        {product.images.map((imageName, index) => (
                            <TouchableOpacity key={index} onPress={() => setMainImage(imageName)}>
                                <Image
                                    key={index}
                                    source={imageMap[imageName]}
                                    style={imageName === mainImage ? imageStyles.thumbnailImageSelected : imageStyles.thumbnailImage}
                                    accessibilityLabel={`Preview ${index + 1}`}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}{/*User profile*/}
                <View className="h-px bg-gray-400 my-4" />                <View className="flex-row items-center">
                    <Image source={imageMap[user.profileImage]} style={imageStyles.userProfileImage}></Image>
                    <View>
                        <Text className="font-semibold text-gray-900">{user.firstName}</Text>
                        <Text className="text-gray-500 text-sm">{user.frequenceOfUse}</Text>
                    </View>
                </View>
                <View className="h-px bg-gray-400 my-4" /><View className="flex-row justify-between items-start my-2.5">
                    <View className="flex flex-col justify-between">
                        {/*title of the product*/}
                        <Text className="text-2xl font-bold">{product.title}</Text>
                        <Text className="text-gray-500">Description:</Text>
                    </View>

                    {/*price of the product*/}
                    <View className="items-end">
                        <Text className="text-gray-500">Price:</Text>
                        <Text className="text-xl font-bold my-2.5">{product.price} €</Text>
                    </View>
                </View>

                {/*description of the product*/}
                <Text className="text-xl font-bold my-2.5">" {product.description} "</Text>                <View className="mt-5 p-4 bg-gray-100 rounded-lg mb-14">
                    <Text className="text-lg font-bold mb-2.5">Details</Text>
                    {/* Always show first attribute (e.g., state) */}
                    <View className="flex-row justify-between my-1">
                        <Text className="font-semibold text-gray-800">State</Text>
                        <Text className="text-gray-600">{product.state}</Text>
                    </View>

                    {/* Expandable section */}
                    {showMore && (
                        <>
                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Brand</Text>
                                <Text className="text-gray-600">{product.brand}</Text>
                            </View>

                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Category</Text>
                                <Text className="text-gray-600">{product.category}</Text>
                            </View>

                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Size</Text>
                                <Text className="text-gray-600">{product.size}</Text>
                            </View>

                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Color</Text>
                                <Text className="text-gray-600">{product.color}</Text>
                            </View>

                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Stock</Text>
                                <Text className="text-gray-600">{product.stock}</Text>
                            </View>

                            <View className="h-px bg-gray-400 my-2.5" />

                            <View className="flex-row justify-between my-1">
                                <Text className="font-semibold text-gray-800">Delivery</Text>
                                <Text className="text-gray-600">{product.deliveryPrice} €</Text>
                            </View>
                        </>

                    )}


                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                        <Text className="text-[#6c63ff] mt-2.5 font-bold">
                            {showMore ? 'See less' : 'See more'}
                        </Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>            {/* Showing image on click*/}
            {showFullScreen && (
                <BlurView intensity={70} tint="dark" className="absolute inset-0 justify-center items-center z-[999] overflow-hidden">
                    <TouchableOpacity className="absolute top-12 right-6 z-[1000] bg-black/20 rounded-full p-2" onPress={() => setShowFullScreen(false)}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>                    <Image
                        source={imageMap[mainImage]}
                        style={imageStyles.fullScreenImage}
                        resizeMode="contain"
                    />
                </BlurView>
            )}
            {/*contact buttons*/}
            <View className="absolute bottom-0 pb-2.5 z-[100] flex flex-row justify-around w-full bg-white">
                <TouchableOpacity className="bg-[#6c63ff] px-4 py-4 rounded-lg items-center mt-2 shadow-md w-[40%]" onPress={() => alert('Ajouté au panier !')}>
                    <Text className="text-white font-bold text-base">Make an Offer</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#6c63ff] px-4 py-4 rounded-lg items-center mt-2 shadow-md w-[40%]" onPress={() => alert('Négotiations débutés')}>
                    <Text className="text-white font-bold text-base">Buy</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

// StyleSheet for image components to fix rendering issues
const imageStyles = StyleSheet.create({
    mainProductImage: {
        width: '100%',
        height: 384, // h-96 equivalent
        borderRadius: 12, // rounded-xl
    },
    thumbnailImage: {
        width: 64, // w-16
        height: 64, // h-16
        borderRadius: 8, // rounded-lg
        borderWidth: 1,
        borderColor: '#e5e7eb', // gray-200
    },
    thumbnailImageSelected: {
        width: 64,
        height: 64,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#6c63ff', // brand color
    },
    userProfileImage: {
        width: 56, // w-14
        height: 56, // h-14
        borderRadius: 28, // rounded-full
        borderWidth: 2,
        borderColor: '#e5e7eb', // gray-200
        marginRight: 16, // mr-4
    },
    fullScreenImage: {
        width: '95%',
        height: '80%',
        borderRadius: 16, // rounded-2xl
    },
});

export default BrowsingPage;
