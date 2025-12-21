export const mockCategories = [
  { id: 1, name: 'Электроника', icon: '📱', color: '#8B5CF6' },
  { id: 2, name: 'Одежда', icon: '👕', color: '#EC4899' },
  { id: 3, name: 'Дом', icon: '🏠', color: '#10B981' },
  { id: 4, name: 'Спорт', icon: '⚽', color: '#F59E0B' },
  { id: 5, name: 'Красота', icon: '💄', color: '#EF4444' },
  { id: 6, name: 'Игрушки', icon: '🧸', color: '#3B82F6' },
  { id: 7, name: 'Книги', icon: '📚', color: '#8B5CF6' },
  { id: 8, name: 'Авто', icon: '🚗', color: '#6366F1' },
  { id: 9, name: 'Мебель', icon: '🛋️', color: '#14B8A6' },
  { id: 10, name: 'Еда', icon: '🍔', color: '#F97316' }
];

export const mockProducts = [
  {
    id: 1,
    name: 'iPhone 14/128 gb purple',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1592286927505-38c051d8513c?w=400',
    category: 'Электроника',
    description: 'Новый iPhone 14 в фиолетовом цвете, 128GB памяти',
    seller: 'Tech Store Almaty',
    location: 'Алматы, Казахстан',
    rating: 4.8,
    views: 234
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    category: 'Электроника',
    description: 'Флагманский смартфон Samsung',
    seller: 'Mobile World',
    location: 'Астана, Казахстан',
    rating: 4.9,
    views: 567
  },
  {
    id: 3,
    name: 'MacBook Pro 16',
    price: 800000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'Электроника',
    description: 'Мощный ноутбук для профессионалов',
    seller: 'Apple Store KZ',
    location: 'Алматы, Казахстан',
    rating: 4.9,
    views: 892
  },
  {
    id: 4,
    name: 'AirPods Pro 2',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
    category: 'Электроника',
    description: 'Беспроводные наушники с шумоподавлением',
    seller: 'Tech Store Almaty',
    location: 'Алматы, Казахстан',
    rating: 4.7,
    views: 445
  }
];

export const mockChats = [
  {
    id: 1,
    username: '@almaz_shop',
    fullName: 'Almaz',
    avatar: 'https://images.unsplash.com/photo-1592286927505-38c051d8513c?w=100',
    lastMessage: 'Здравствуйте! Интересует iPhone?',
    time: '10:30',
    unread: 2,
    messages: [
      { id: 1, text: 'Здравствуйте!', sender: 'me', time: '10:25' },
      { id: 2, text: 'Здравствуйте! Интересует iPhone?', sender: 'them', time: '10:30' },
    ]
  },
  {
    id: 2,
    username: '@house_rent_kg',
    fullName: 'Диана Исмаилова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    lastMessage: 'Квартира еще доступна?',
    time: '09:15',
    unread: 0,
    messages: [
      { id: 1, text: 'Добрый день! Квартира еще доступна?', sender: 'me', time: '09:10' },
      { id: 2, text: 'Да, свободна', sender: 'them', time: '09:15' },
    ]
  },
  {
    id: 3,
    username: '@auto_parts_kz',
    fullName: 'Серик Жанабаев',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    lastMessage: 'Колеса в наличии',
    time: 'Вчера',
    unread: 0,
    messages: []
  },
  {
    id: 4,
    username: '@gaming_store',
    fullName: 'Максим Орлов',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    lastMessage: 'PlayStation 5 будет завтра',
    time: '3 дня назад',
    unread: 0,
    messages: []
  },
  {
    id: 5,
    username: '@fashion_shop',
    fullName: 'Алина Каримова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    lastMessage: 'Куртка вам подойдет!',
    time: '6 дней назад',
    unread: 0,
    messages: []
  }
];

export const mockHistory = (t) => [
  {
    id: 1,
    username: '@almaz_shop',
    fullName: 'Almaz',
    avatar: 'https://images.unsplash.com/photo-1592286927505-38c051d8513c?w=100',
    item: 'iPhone 12 Pro 128GB',
    price: 85000,
    date: t.today,
    status: 'completed'
  },
  {
    id: 2,
    username: '@house_rent_kg',
    fullName: 'Диана Исмаилова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    item: 'Аренда 1-комнатной квартиры, Центр',
    price: 155000,
    date: t.today,
    status: 'completed'
  },
  {
    id: 3,
    username: '@auto_parts_kz',
    fullName: 'Серик Жанабаев',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    item: 'Колеса R17 Bridgestone комплект',
    price: 60000,
    date: t.yesterday,
    status: 'completed'
  },
  {
    id: 4,
    username: '@gaming_store',
    fullName: 'Максим Орлов',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    item: 'PlayStation 5 Digital Edition',
    price: 215000,
    date: '3 ' + t.daysAgo,
    status: 'completed'
  },
  {
    id: 5,
    username: '@fashion_shop',
    fullName: 'Алина Каримова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    item: 'Куртка зимняя мужская NorthWind',
    price: 25000,
    date: '6 ' + t.daysAgo,
    status: 'completed'
  }
];
