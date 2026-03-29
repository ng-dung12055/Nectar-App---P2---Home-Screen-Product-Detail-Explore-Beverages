import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import { getImageSource, getProductDetail, nectarTheme } from '../data/nectarData';
import { getFavorites, toggleFavorite } from '../utils/favoriteStorage';

function FavoriteRow({ item, onOpen, onToggle }) {
  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.row} onPress={onOpen}>
      <Image source={getImageSource(item.thumbnailKey)} style={styles.image} resizeMode="contain" />

      <View style={styles.meta}>
        <Text style={styles.name}>{item.cartName}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.heartButton}
        onPress={(event) => {
          event.stopPropagation?.();
          onToggle();
        }}
      >
        <Ionicons name="heart" size={20} color="#F3603F" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="heart-outline" size={34} color={nectarTheme.green} />
      </View>
      <Text style={styles.emptyTitle}>No favourites yet</Text>
      <Text style={styles.emptyText}>Tap the heart on a product detail screen to save it here.</Text>
    </View>
  );
}

export default function FavouriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async () => {
    const favoriteIds = await getFavorites();
    setFavorites(favoriteIds.map((id) => getProductDetail(id)));
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleToggle = async (productId) => {
    const nextFavorites = await toggleFavorite(productId);
    setFavorites(nextFavorites.map((id) => getProductDetail(id)));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Text style={styles.title}>Favourite</Text>

        {favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <FavoriteRow
                item={item}
                onOpen={() =>
                  navigation.navigate('ShopTab', {
                    screen: 'ProductDetail',
                    params: { productId: item.id },
                  })
                }
                onToggle={() => handleToggle(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: nectarTheme.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    color: nectarTheme.text,
    textAlign: 'center',
    marginBottom: 18,
  },
  listContent: {
    paddingBottom: 120,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEDED',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  image: {
    width: 86,
    height: 86,
    marginRight: 16,
  },
  meta: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
    color: nectarTheme.mutedText,
  },
  heartButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3F0',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyIconWrap: {
    width: 74,
    height: 74,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF8F2',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    color: nectarTheme.mutedText,
    textAlign: 'center',
    maxWidth: 270,
  },
});
