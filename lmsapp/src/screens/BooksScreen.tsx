import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import API from '../services/api';
import {RootStackParamList} from '../navigation/AppNavigator';

// 🔹 Types
interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

// 🔹 Navigation Props
type Props = NativeStackScreenProps<RootStackParamList, 'Books'>;

const BooksScreen: React.FC<Props> = ({navigation}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = 1; // 🔹 later replace with decoded token user id

  // 🔹 Load books
  const loadBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Borrow book
  const borrowBook = async (bookId: number) => {
    try {
      await API.post('/borrow', {
        userId,
        bookId,
      });
      Alert.alert('Success', 'Book borrowed successfully');
      loadBooks(); // refresh quantity
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Borrow failed');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const renderItem = ({item}: {item: Book}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Author: {item.author}</Text>
      <Text>Available: {item.quantity}</Text>

      <TouchableOpacity
        style={[styles.button, item.quantity === 0 && styles.disabled]}
        disabled={item.quantity === 0}
        onPress={() => borrowBook(item.id)}>
        <Text style={styles.buttonText}>
          {item.quantity === 0 ? 'Out of Stock' : 'Borrow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Borrow History Button */}
      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => navigation.navigate('BorrowHistory', {userId})}>
        <Text style={styles.historyText}>View Borrow History</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default BooksScreen;

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  historyBtn: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  historyText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
