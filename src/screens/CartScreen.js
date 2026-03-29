import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
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

import { getImageSource, nectarTheme } from '../data/nectarData';
import { clearCart, getCart, updateCartItemQuantity } from '../utils/cartStorage';

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <View style={styles.quantityControl}>
      <TouchableOpacity activeOpacity={0.85} onPress={onDecrease}>
        <Ionicons name="remove" size={20} color="#B3B3B3" />
      </TouchableOpacity>

      <View style={styles.quantityValueWrap}>
        <Text style={styles.quantityValue}>{quantity}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.85} onPress={onIncrease}>
        <Ionicons name="add" size={20} color={nectarTheme.green} />
      </TouchableOpacity>
    </View>
  );
}

function CartItem({ item, onDecrease, onIncrease }) {
  return (
    <View style={styles.itemRow}>
      <Image source={getImageSource(item.imageKey)} style={styles.itemImage} resizeMode="contain" />

      <View style={styles.itemContent}>
        <View style={styles.itemHead}>
          <View style={styles.itemMeta}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>

          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>

        <QuantityControl quantity={item.quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
      </View>
    </View>
  );
}

function EmptyCart({ navigation }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="cart-outline" size={34} color={nectarTheme.green} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Add products from Shop or Explore to see them here.</Text>
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.emptyButton}
        onPress={() => navigation.navigate('ShopTab')}
      >
        <Text style={styles.emptyButtonText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = useCallback(async () => {
    const items = await getCart();
    setCartItems(items);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [loadCart])
  );

  const handleQuantityChange = async (id, nextQuantity) => {
    const updated = await updateCartItemQuantity(id, nextQuantity);
    setCartItems(updated);
  };

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleCheckout = async () => {
    await clearCart();
    setCartItems([]);
    Alert.alert('Order placed', 'Your basic checkout flow is complete.');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Text style={styles.title}>My Cart</Text>

        {cartItems.length === 0 ? (
          <EmptyCart navigation={navigation} />
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
              />
            )}
            ListFooterComponent={
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total</Text>
                  <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.88}
                  style={styles.checkoutButton}
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutText}>Go To Checkout</Text>
                </TouchableOpacity>
              </View>
            }
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  itemImage: {
    width: 86,
    height: 86,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemMeta: {
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  itemSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
    color: nectarTheme.mutedText,
  },
  itemPrice: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityValueWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: nectarTheme.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  quantityValue: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  summaryCard: {
    marginTop: 18,
    borderRadius: 20,
    backgroundColor: '#F7F8F7',
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  summaryLabel: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: nectarTheme.text,
  },
  summaryValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: nectarTheme.text,
  },
  checkoutButton: {
    height: 62,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  checkoutText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: '#FFFFFF',
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
    maxWidth: 260,
  },
  emptyButton: {
    marginTop: 24,
    height: 58,
    minWidth: 180,
    paddingHorizontal: 26,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: nectarTheme.green,
  },
  emptyButtonText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
