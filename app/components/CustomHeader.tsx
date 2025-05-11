import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

export default function CustomHeader() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Uber Drip</Text>
            <Ionicons name="lock-closed-outline" size={28} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});