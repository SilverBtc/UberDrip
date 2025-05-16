import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native';

const productList = [
    { name: 'Nike Sportswear Club Fleece', price: 99, brand: 'Nike', image: 'https://via.placeholder.com/150' },
    { name: 'Trail Running Jacket Nike Windrunner', price: 80, brand: 'Nike', image: 'https://via.placeholder.com/150' },
    { name: 'Adidas Windbreaker', price: 85, brand: 'Adidas', image: 'https://via.placeholder.com/150' },
    { name: 'Fila Retro Hoodie', price: 65, brand: 'Fila', image: 'https://via.placeholder.com/150' },
];

const brands = ['All', 'Adidas', 'Nike', 'Fila'];
const price = ['0', '<10', '<25', '<100', 'all'];
const material = ['wool', 'polyester', 'jean', 'cum', 'all'];
const sizes = ['xs', 's', 'm', 'l', 'xl', 'all'];

const CheckboxItem = ({ label, selected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxItem}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]} />
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const FilterDropdown = ({ title, options, selected, setSelected }) => {
    const [visible, setVisible] = useState(false);

    const toggleSelection = (option) => {
        setSelected(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    return (
        <View style={styles.filterWrapper}>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>{title}</Text>
            </TouchableOpacity>

            <Modal transparent animationType="fade" visible={visible}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <ScrollView>
                            {options.map((option, idx) => (
                                <CheckboxItem
                                    key={idx}
                                    label={option}
                                    selected={selected.includes(option)}
                                    onPress={() => toggleSelection(option)}
                                />
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalClose}>
                            <Text style={{ color: '#fff' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const BrowsingPage = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const filteredProducts = productList.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
        const matchBrand =
            selectedBrands.length === 0 || selectedBrands.includes('All') || selectedBrands.includes(product.brand);
        return matchBrand && matchSearch;
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search..."
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <Text style={styles.sectionTitle}>Set Filters:</Text>

            <View style={styles.filtersRow}>
                <FilterDropdown title="Brand" options={brands} selected={selectedBrands} setSelected={setSelectedBrands} />
                <FilterDropdown title="Price" options={price} selected={selectedPrices} setSelected={setSelectedPrices} />
                <FilterDropdown title="Material" options={material} selected={selectedMaterials} setSelected={setSelectedMaterials} />
                <FilterDropdown title="Size" options={sizes} selected={selectedSizes} setSelected={setSelectedSizes} />
            </View>

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
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    searchInput: { flex: 1, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    viewAll: { color: '#6c63ff' },
    productContainer: { flexDirection: 'row', marginVertical: 10 },
    productCard: { marginRight: 15, width: 150 },
    productImage: { width: 150, height: 150, borderRadius: 8 },
    productName: { fontWeight: 'bold', marginTop: 10 },
    productPrice: { color: 'gray' },

    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 8,
    },
    filterWrapper: {
        flex: 1,
        marginHorizontal: 4,
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    filterButtonText: {
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalClose: {
        marginTop: 10,
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#6c63ff',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#6c63ff',
    },
    checkboxLabel: {
        fontSize: 16,
    },
});

export default BrowsingPage;
