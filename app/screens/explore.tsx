import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '../../data/categories';
import { productList, Product } from '../../data/products';
import { brands, prices, materials, sizes } from '../../data/filters';

export default function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

    const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

    const filteredProducts = productList.filter((product: Product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const quickFilters = [
        { id: 'trending', label: '🔥 Trending', icon: 'trending-up' },
        { id: 'new', label: '✨ New', icon: 'sparkles' },
        { id: 'sale', label: '💰 Sale', icon: 'pricetag' },
        { id: 'premium', label: '👑 Premium', icon: 'star' },
    ];

    return (
        <View className="flex-1 bg-white">
            {/* Header with Search */}
            <View
                className="bg-white shadow-sm border-b border-gray-100"
            >
                <View className="px-4 py-4">
                    {/* Location Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={20} color="#6c63ff" />
                            <Text className="ml-2 text-lg font-bold text-gray-800">Explore Fashion</Text>
                        </View>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="notifications-outline" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
                        <Ionicons name="search" size={20} color="#666" />
                        <TextInput
                            placeholder="Search for clothes, brands..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="flex-1 ml-3 text-base text-gray-800"
                            placeholderTextColor="#999"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Quick Filters */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-2"
                    >                        {quickFilters.map((filter) => (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => setSelectedFilter(filter.id === selectedFilter ? '' : filter.id)}
                                className={`mr-3 px-4 py-2 rounded-full border ${selectedFilter === filter.id
                                        ? 'bg-[#6c63ff] border-[#6c63ff]'
                                        : 'bg-white border-gray-300'
                                    }`}
                            >
                                <Text className={`font-medium ${selectedFilter === filter.id ? 'text-white' : 'text-gray-700'
                                    }`}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <ScrollView className="flex-1">
                {/* Categories Section */}
                <View className="px-4 py-6">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Browse by Category</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mb-6"
                    >                        <TouchableOpacity
                            onPress={() => setSelectedCategory('')}
                            className={`mr-4 px-6 py-3 rounded-xl border-2 ${!selectedCategory
                                    ? 'bg-[#6c63ff] border-[#6c63ff]'
                                    : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`font-semibold ${!selectedCategory ? 'text-white' : 'text-gray-700'
                                }`}>
                                All
                            </Text>
                        </TouchableOpacity>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                onPress={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
                                className={`mr-4 px-6 py-3 rounded-xl border-2 ${selectedCategory === category.id
                                        ? 'bg-[#6c63ff] border-[#6c63ff]'
                                        : 'bg-white border-gray-200'
                                    }`}
                            >
                                <View className="items-center">
                                    <Text className="text-2xl mb-1">{category.icon}</Text>
                                    <Text className={`font-semibold text-sm ${selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                                        }`}>
                                        {category.name.split(' ')[0]}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Results Header */}
                <View className="px-4 mb-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-bold text-gray-800">
                            {selectedCategory
                                ? `${categories.find(c => c.id === selectedCategory)?.name} (${filteredProducts.length})`
                                : `All Items (${filteredProducts.length})`
                            }
                        </Text>                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="funnel-outline" size={16} color="#6c63ff" />
                            <Text className="ml-1 text-[#6c63ff] font-medium">Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Products Grid */}
                <View className="px-4 pb-6">
                    {searchQuery && filteredProducts.length === 0 ? (
                        <View className="items-center py-12">
                            <Ionicons name="search-outline" size={64} color="#ccc" />
                            <Text className="text-gray-500 text-lg mt-4">No items found</Text>
                            <Text className="text-gray-400 text-center mt-2">
                                Try searching with different keywords
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row flex-wrap justify-between">
                            {filteredProducts.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="w-[48%] mb-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                                >
                                    {/* Product Image */}
                                    <View className="relative">
                                        <Image
                                            source={{ uri: product.image }}
                                            className="w-full h-40 rounded-t-2xl"
                                            resizeMode="cover"
                                        />
                                        {/* Rating Badge */}
                                        <View className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex-row items-center">
                                            <Ionicons name="star" size={12} color="#FFD700" />
                                            <Text className="text-xs font-medium ml-1">{product.rating}</Text>
                                        </View>
                                        {/* Heart Icon */}
                                        <TouchableOpacity className="absolute top-3 left-3 bg-white/80 rounded-full p-2">
                                            <Ionicons name="heart-outline" size={16} color="#666" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Product Info */}
                                    <View className="p-4">
                                        <Text className="font-bold text-gray-800 text-sm mb-1" numberOfLines={2}>
                                            {product.name}
                                        </Text>
                                        <Text className="text-gray-500 text-xs mb-2">{product.brand}</Text>

                                        {/* Price and Add Button */}                                        <View className="flex-row items-center justify-between">
                                            <View>
                                                <Text className="text-[#6c63ff] font-bold text-lg">${product.price}</Text>
                                                <Text className="text-gray-400 text-xs">{product.material}</Text>
                                            </View>
                                            <TouchableOpacity className="bg-[#6c63ff] rounded-xl p-2">
                                                <Ionicons name="add" size={20} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Trending Section */}
                {!searchQuery && (
                    <View className="px-4 py-6 bg-gray-50">                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-xl font-bold text-gray-800">Trending Now</Text>
                            <TouchableOpacity>
                                <Text className="text-[#6c63ff] font-medium">See all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {productList.slice(0, 5).map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="mr-4 w-32"
                                >
                                    <Image
                                        source={{ uri: product.image }}
                                        className="w-32 h-32 rounded-xl mb-2"
                                        resizeMode="cover"
                                    />                                    <Text className="font-semibold text-gray-800 text-sm" numberOfLines={2}>
                                        {product.name}
                                    </Text>
                                    <Text className="text-[#6c63ff] font-bold">${product.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
