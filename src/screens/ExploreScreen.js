import React, { useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import CategoryCard from '../components/CategoryCard';
import { categories, nectarTheme } from '../data/nectarData';

function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search-outline" size={22} color="#7C7C7C" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search Store"
        placeholderTextColor="#7C7C7C"
        style={styles.searchInput}
      />
    </View>
  );
}

export default function ExploreScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Find Products</Text>
        <SearchBar value={query} onChangeText={setQuery} />

        <View style={styles.grid}>
          {filteredCategories.map((item) => (
            <CategoryCard
              key={item.id}
              item={item}
              onPress={
                item.routeName
                  ? () => navigation.navigate(item.routeName)
                  : () => Alert.alert('Coming soon', 'This category will be completed next.')
              }
            />
          ))}
        </View>

        {filteredCategories.length === 0 ? (
          <Text style={styles.emptyText}>No categories match your search.</Text>
        ) : null}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: nectarTheme.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 120,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    color: nectarTheme.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: nectarTheme.input,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: nectarTheme.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 21,
    color: nectarTheme.mutedText,
    textAlign: 'center',
  },
  spacer: {
    height: 24,
  },
});
