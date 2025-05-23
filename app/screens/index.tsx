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

const productList = [
  {
    name: "Nike Sportswear Club Fleece",
    price: 99,
    brand: "Nike",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Trail Running Jacket Nike Windrunner",
    price: 80,
    brand: "Nike",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Adidas Windbreaker",
    price: 85,
    brand: "Adidas",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Fila Retro Hoodie",
    price: 65,
    brand: "Fila",
    image: "https://via.placeholder.com/150",
  },
];

const brands = ["All", "Adidas", "Nike", "Fila"];
const prices = ["All", "<10", "<25", "<50", "<100", "Less than"];
const material = ["wool", "polyester", "jean", "all"];
const sizes = ["xs", "s", "m", "l", "xl", "all"];

const RadioItem = ({ label, selected, onPress, isRadio = false }) => (
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
  customPrice,
  setCustomPrice,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleSelection = (option) => {
    if (single) {
      setSelected([option]);
    } else {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleOutsidePress = (e) => {
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
  const [searchText, setSearchText] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [customPrice, setCustomPrice] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const clearAllFilters = () => {
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
      selectedPrices.some((priceLabel) => {
        if (priceLabel === "Less than" && customPrice > 0)
          return product.price <= customPrice;
        if (priceLabel.startsWith("<")) {
          const max = parseInt(priceLabel.replace("<", ""), 10);
          return product.price <= max;
        }
        return false;
      });

    return matchBrand && matchSearch && matchPrice;
  });

  const renderSelectedTags = (label, values) => {
    return values.length > 0 ? (
      <View style={styles.selectedGroup}>
        <Text style={styles.selectedLabel}>{label}:</Text>
        <View style={styles.selectedTags}>
          {values.map((v, i) => (
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

      <Text style={styles.sectionTitle}>Filters:</Text>

      <View style={styles.filtersRow}>
        <FilterDropdown
          title="Brand"
          options={brands}
          selected={selectedBrands}
          setSelected={setSelectedBrands}
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
          options={material}
          selected={selectedMaterials}
          setSelected={setSelectedMaterials}
        />
        <FilterDropdown
          title="Size"
          options={sizes}
          selected={selectedSizes}
          setSelected={setSelectedSizes}
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
        <Text style={styles.sectionTitle}>Recommended Clothes</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productContainer}
      >
        {filteredProducts.map((product, index) => (
          <View key={index} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}€</Text>
          </View>
        ))}
      </ScrollView>
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
  productCard: { marginRight: 15, width: 150 },
  productImage: { width: 150, height: 150, borderRadius: 8 },
  productName: { fontWeight: "bold", marginTop: 10 },
  productPrice: { color: "gray" },

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
});

export default BrowsingPage;
