import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import API from '../services/api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// 🔹 Types
interface BorrowHistory {
  id: number;
  book_title: string;
  borrow_date: string;
  return_date: string | null;
  status: 'BORROWED' | 'RETURNED';
}

// 🔹 Navigation
type RootStackParamList = {
  Books: undefined;
  BorrowHistory: {userId: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'BorrowHistory'>;

const BorrowHistoryScreen: React.FC<Props> = ({route}) => {
  const {userId} = route.params;

  const [history, setHistory] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadHistory = async () => {
    try {
      const res = await API.get(`/borrow/history/${userId}`);
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({item}: {item: BorrowHistory}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.book_title}</Text>

      <Text>Borrowed: {item.borrow_date}</Text>
      <Text>Returned: {item.return_date ?? 'Not returned'}</Text>

      <Text
        style={{
          color: item.status === 'BORROWED' ? 'orange' : 'green',
          marginTop: 5,
          fontWeight: 'bold',
        }}>
        {item.status}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;
  }

  return (
    <FlatList
      data={history}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{padding: 10}}
    />
  );
};

export default BorrowHistoryScreen;

const styles = StyleSheet.create({
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
});
