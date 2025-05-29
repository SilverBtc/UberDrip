import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Modal,
    TouchableOpacity,
} from "react-native";
import { categories } from "../../data/categories";
import { productList } from "../../data/products";
import { brands, prices, materials, sizes } from "../../data/filters";

const RadioItem = ({ label, selected, onPress, isRadio = false }: {
    label: string;
    selected: boolean;
    onPress: () => void;
    isRadio?: boolean;
}) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxItem}>
        <View style={isRadio ? styles.radio : styles.checkbox}>
            {selected && !isRadio && <Text style={styles.checkboxTick}>✓</Text>}
            {isRadio && (
                <View style={[styles.radioCircle, selected && styles.radioFilled]} />
            )}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const FilterDropdown = ({
    title,
    options,
    selected,
    setSelected,
    single = false,
    customPrice = 0,
    setCustomPrice = (value: number) => {},
}: {
    title: string;
    options: string[];
    selected: string[];
    setSelected: (value: string[] | ((prev: string[]) => string[])) => void;
    single?: boolean;
    customPrice?: number;
    setCustomPrice?: (value: number) => void;
}) => {
    const [visible, setVisible] = useState(false);

    const toggleSelection = (option: string) => {
        if (single) {
            setSelected([option]);
        } else {
            setSelected((prev: string[]) =>
                prev.includes(option)
                    ? prev.filter((o: string) => o !== option)
                    : [...prev, option]
            );
        }
    };

    const handleOutsidePress = (e: any) => {
        if (e.target === e.currentTarget) {
            setVisible(false);
        }
    };

    return (
        <View style={styles.filterWrapper}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.filterButton}
            >
                <Text style={styles.filterButtonText}>{title}</Text>
            </TouchableOpacity>

            <Modal transparent animationType="fade" visible={visible}>
                <View
                    style={styles.modalOverlay}
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={handleOutsidePress}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <ScrollView>
                            {options.map((option, idx) => (
                                <View key={idx}>
                                    <RadioItem
                                        label={
                                            option === "Less than" &&
                                                selected.includes("Less than") &&
                                                customPrice > 0
                                                ? `Less than ${customPrice}`
                                                : option
                                        }
                                        selected={selected.includes(option)}
                                        onPress={() => toggleSelection(option)}
                                        isRadio={title === "Price"}
                                    />
                                    {title === "Price" &&
                                        option === "Less than" &&
                                        selected.includes("Less than") && (
                                            <TextInput
                                                placeholder="Enter less than"
                                                keyboardType="number-pad"
                                                style={styles.searchInput}
                                                value={customPrice.toString()}
                                                onChangeText={(text) => {
                                                    const clean = text.replace(/[^0-9]/g, "");
                                                    setCustomPrice(parseInt(clean) || 0);
                                                }}
                                            />
                                        )}
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.modalClose}
                        >
                            <Text style={{ color: "#fff" }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const BrowsingPage = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [customPrice, setCustomPrice] = useState<number>(0);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const clearAllFilters = () => {
        setSelectedCategory("");
        setSelectedBrands([]);
        setSelectedPrices([]);
        setSelectedMaterials([]);
        setSelectedSizes([]);
        setSearchText("");
        setCustomPrice(0);
    };

    const filteredProducts = productList.filter((product) => {
        const matchSearch = product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchBrand =
            selectedBrands.length === 0 ||
            selectedBrands.includes("All") ||
            selectedBrands.includes(product.brand);

        const matchPrice =
            selectedPrices.length === 0 ||
            selectedPrices.includes("All") ||
            selectedPrices.some((priceLabel: string) => {
                if (priceLabel === "Less than" && customPrice > 0)
                    return product.price <= customPrice;
                if (priceLabel.startsWith("<")) {
                    const max = parseInt(priceLabel.replace("<", ""), 10);
                    return product.price <= max;
                }
                return false;
            });

        const matchMaterial =
            selectedMaterials.length === 0 ||
            selectedMaterials.includes("All") ||
            selectedMaterials.includes(product.material);

        const matchSize =
            selectedSizes.length === 0 ||
            selectedSizes.includes("All") ||
            product.sizes.some((size: string) => selectedSizes.includes(size));

        const matchCategory =
            !selectedCategory || selectedCategory === product.category;

        return matchBrand && matchSearch && matchPrice && matchMaterial && matchSize && matchCategory;
    });

    const renderSelectedTags = (label: string, values: string[]) => {
        return values.length > 0 ? (
            <View style={styles.selectedGroup}>
                <Text style={styles.selectedLabel}>{label}:</Text>
                <View style={styles.selectedTags}>
                    {values.map((v: string, i: number) => (
                        <View key={i} style={styles.tag}>
                            <Text style={styles.tagText}>{v}</Text>
                        </View>
                    ))}
                </View>
            </View>
        ) : null;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>Welcome to UberDrip!</Text>
                <Text style={styles.welcomeSubtitle}>
                    Discover the latest fashion trends
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search for clothes..."
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryCard,
                            selectedCategory === category.id && styles.selectedCategoryCard
                        ]}
                        onPress={() => 
                            setSelectedCategory(
                                selectedCategory === category.id ? "" : category.id
                            )
                        }
                    >
                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                        <Text style={[
                            styles.categoryName,
                            selectedCategory === category.id && styles.selectedCategoryName
                        ]}>
                            {category.name}
                        </Text>
                        <Text style={styles.categoryDescription}>
                            {category.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Filters:</Text>
            <View style={styles.filtersRow}>
                <FilterDropdown
                    title="Brand"
                    options={brands}
                    selected={selectedBrands}
                    setSelected={setSelectedBrands}
                    customPrice={customPrice}
                    setCustomPrice={setCustomPrice}
                />
                <FilterDropdown
                    title="Price"
                    options={prices}
                    selected={selectedPrices}
                    setSelected={setSelectedPrices}
                    single={true}
                    customPrice={customPrice}
                    setCustomPrice={setCustomPrice}
                />
                <FilterDropdown
                    title="Material"
                    options={materials}
                    selected={selectedMaterials}
                    setSelected={setSelectedMaterials}
                    customPrice={customPrice}
                    setCustomPrice={setCustomPrice}
                />
                <FilterDropdown
                    title="Size"
                    options={sizes}
                    selected={selectedSizes}
                    setSelected={setSelectedSizes}
                    customPrice={customPrice}
                    setCustomPrice={setCustomPrice}
                />
            </View>

            <TouchableOpacity onPress={clearAllFilters} style={styles.clearAllButton}>
                <Text style={styles.clearAllText}>Clear all filters</Text>
            </TouchableOpacity>

            {renderSelectedTags("Brands", selectedBrands)}
            {renderSelectedTags("Prices", selectedPrices)}
            {renderSelectedTags("Materials", selectedMaterials)}
            {renderSelectedTags("Sizes", selectedSizes)}

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {selectedCategory 
                        ? `${categories.find(c => c.id === selectedCategory)?.name || 'Products'} (${filteredProducts.length})`
                        : `All Products (${filteredProducts.length})`
                    }
                </Text>
                <Text style={styles.viewAll}>View all</Text>
            </View>

            <View style={styles.productsGrid}>
                {filteredProducts.map((product, index) => (
                    <View key={index} style={styles.productCard}>
                        <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                        />
                        <Text style={styles.productName} numberOfLines={2}>
                            {product.name}
                        </Text>
                        <Text style={styles.productBrand}>{product.brand}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐ {product.rating}</Text>
                            <Text style={styles.productPrice}>${product.price}</Text>
                        </View>
                        <Text style={styles.productDescription} numberOfLines={2}>
                            {product.description}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#fff", flex: 1 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewAll: { color: "#6c63ff" },
    productContainer: { flexDirection: "row", marginVertical: 10 },
    productsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    productCard: { 
        marginBottom: 20, 
        width: "48%",
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        padding: 12,
    },
    productImage: { 
        width: "100%", 
        height: 120, 
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: { 
        fontWeight: "bold", 
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
    },
    productBrand: {
        fontSize: 12,
        color: "#666",
        marginBottom: 6,
        fontWeight: "500",
    },
    productPrice: { 
        color: "#6c63ff",
        fontWeight: "bold",
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    rating: {
        fontSize: 12,
        color: "#666",
    },
    productDescription: {
        fontSize: 11,
        color: "#888",
        lineHeight: 14,
    },

    filtersRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 8,
    },
    filterWrapper: {
        flex: 1,
        marginHorizontal: 4,
    },
    filterButton: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    filterButtonText: {
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 250,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        maxHeight: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalClose: {
        marginTop: 10,
        backgroundColor: "#6c63ff",
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#6c63ff",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    radioCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },

    radioFilled: {
        backgroundColor: "#6c63ff",
    },

    radioSelected: {
        backgroundColor: "#6c63ff",
    },
    checkboxLabel: {
        fontSize: 16,
    },
    clearAllButton: {
        alignSelf: "flex-end",
        marginBottom: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#eee",
        borderRadius: 6,
    },
    clearAllText: {
        color: "#444",
        fontWeight: "bold",
    },
    selectedGroup: {
        marginBottom: 10,
    },
    selectedLabel: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    selectedTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },
    tag: {
        backgroundColor: "#6c63ff",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: {
        color: "#fff",
        fontSize: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#6c63ff",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    checkboxTick: {
        fontSize: 14,
        lineHeight: 18,
    },
    welcomeSection: {
        marginBottom: 20,
        alignItems: "center",
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6c63ff",
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoryCard: {
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        minWidth: 120,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedCategoryCard: {
        backgroundColor: "#6c63ff",
        borderColor: "#6c63ff",
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 4,
    },
    selectedCategoryName: {
        color: "#fff",
    },
    categoryDescription: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
});

export default BrowsingPage;
