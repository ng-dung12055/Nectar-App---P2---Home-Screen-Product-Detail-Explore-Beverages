const IMAGES = {
  apple: require('../../assets/nectar/apple.png'),
  appleHero: require('../../assets/nectar/apple-hero.png'),
  appleGrapeJuice: require('../../assets/nectar/apple-grape-juice.png'),
  banana: require('../../assets/nectar/banana.png'),
  bannerDecor: require('../../assets/nectar/banner-decor.png'),
  beef: require('../../assets/nectar/beef.png'),
  categoryBakery: require('../../assets/nectar/category-bakery.png'),
  categoryBeverages: require('../../assets/nectar/category-beverages.png'),
  categoryDairy: require('../../assets/nectar/category-dairy.png'),
  categoryFruits: require('../../assets/nectar/category-fruits.png'),
  categoryMeat: require('../../assets/nectar/category-meat.png'),
  categoryOil: require('../../assets/nectar/category-oil.png'),
  chicken: require('../../assets/nectar/chicken.png'),
  cocaCola: require('../../assets/nectar/coca-cola.png'),
  dietCoke: require('../../assets/nectar/diet-coke.png'),
  ginger: require('../../assets/nectar/ginger.png'),
  orangeJuice: require('../../assets/nectar/orange-juice.png'),
  pepsi: require('../../assets/nectar/pepsi.png'),
  pulses: require('../../assets/nectar/pulses.png'),
  redPepper: require('../../assets/nectar/red-pepper.png'),
  rice: require('../../assets/nectar/rice.png'),
  sprite: require('../../assets/nectar/sprite.png'),
  vegetablesHero: require('../../assets/nectar/vegetables-hero.png'),
};

export const productImageSources = IMAGES;

export const nectarTheme = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#181725',
  mutedText: '#7C7C7C',
  border: '#E2E2E2',
  tabBorder: '#F2F3F2',
  input: '#F2F3F2',
  green: '#53B175',
  greenSoft: '#EAF6EE',
  banner: '#EEF8F2',
};

export const bannerContent = {
  title: 'Fresh Vegetables',
  subtitle: 'Get Up To 40% OFF',
  heroImageKey: 'vegetablesHero',
  decorImageKey: 'bannerDecor',
};

export const featuredProducts = [
  {
    id: 'banana',
    name: 'Organic Bananas',
    subtitle: '7pcs, Price',
    price: 4.99,
    imageKey: 'banana',
  },
  {
    id: 'apple',
    name: 'Red Apple',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'apple',
    opensDetail: true,
  },
];

export const bestSellingProducts = [
  {
    id: 'red-pepper',
    name: 'Bell Pepper Red',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'redPepper',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    subtitle: '250gm, Price',
    price: 4.99,
    imageKey: 'ginger',
  },
];

export const groceryHighlights = [
  {
    id: 'pulses',
    name: 'Pulses',
    imageKey: 'pulses',
    backgroundColor: '#F8E7D2',
  },
  {
    id: 'rice',
    name: 'Rice',
    imageKey: 'rice',
    backgroundColor: '#E5F2E9',
  },
];

export const groceryProducts = [
  {
    id: 'beef-bone',
    name: 'Beef Bone',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'beef',
  },
  {
    id: 'broiler-chicken',
    name: 'Broiler Chicken',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'chicken',
  },
];

export const categories = [
  {
    id: 'fresh-fruits',
    name: 'Fresh Fruits\n& Vegetables',
    imageKey: 'categoryFruits',
    backgroundColor: '#EEF8F2',
    borderColor: '#A4D8B6',
  },
  {
    id: 'cooking-oil',
    name: 'Cooking Oil\n& Ghee',
    imageKey: 'categoryOil',
    backgroundColor: '#FFF8F1',
    borderColor: '#F5C18F',
  },
  {
    id: 'meat-fish',
    name: 'Meat & Fish',
    imageKey: 'categoryMeat',
    backgroundColor: '#FFF2F0',
    borderColor: '#F6B0A7',
  },
  {
    id: 'bakery-snacks',
    name: 'Bakery & Snacks',
    imageKey: 'categoryBakery',
    backgroundColor: '#F7EEF9',
    borderColor: '#D3B0E0',
  },
  {
    id: 'dairy-eggs',
    name: 'Dairy & Eggs',
    imageKey: 'categoryDairy',
    backgroundColor: '#FFF9E6',
    borderColor: '#F8DF8B',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    imageKey: 'categoryBeverages',
    backgroundColor: '#EDF7FD',
    borderColor: '#B7DFF5',
    routeName: 'Beverages',
  },
];

export const beverages = [
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    subtitle: '355ml, Price',
    price: 1.99,
    imageKey: 'dietCoke',
  },
  {
    id: 'sprite-can',
    name: 'Sprite Can',
    subtitle: '325ml, Price',
    price: 1.5,
    imageKey: 'sprite',
  },
  {
    id: 'apple-grape-juice',
    name: 'Apple & Grape\nJuice',
    subtitle: '2L, Price',
    price: 15.99,
    imageKey: 'appleGrapeJuice',
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    subtitle: '2L, Price',
    price: 15.99,
    imageKey: 'orangeJuice',
  },
  {
    id: 'coca-cola-can',
    name: 'Coca Cola Can',
    subtitle: '325ml, Price',
    price: 4.99,
    imageKey: 'cocaCola',
  },
  {
    id: 'pepsi-can',
    name: 'Pepsi Can',
    subtitle: '330ml, Price',
    price: 4.99,
    imageKey: 'pepsi',
  },
];

export const productDetails = {
  apple: {
    id: 'apple',
    name: 'Natural Red Apple',
    cartName: 'Natural Red Apple',
    subtitle: '1kg, Price',
    price: 4.99,
    imageKey: 'appleHero',
    thumbnailKey: 'apple',
    description:
      'Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthful and varied diet.',
    nutrition: '100gr',
    reviewRating: 5,
  },
};

export function getImageSource(imageKey) {
  return productImageSources[imageKey] ?? productImageSources.apple;
}

export function getProductDetail(productId = 'apple') {
  return productDetails[productId] ?? productDetails.apple;
}

export function buildCartItem(productId) {
  const product = getProductDetail(productId);

  return {
    id: product.id,
    name: product.cartName,
    subtitle: product.subtitle,
    price: product.price,
    imageKey: product.thumbnailKey,
  };
}
