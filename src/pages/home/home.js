
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header/header.js';
import Balance from '../../components/Header/Balance/balance.js';
import Movements from '../../components/Movements/movements.js';
import Actions from '../../components/Actions/actions.js';
import React, { useEffect, useState } from 'react';
import  useStorage from '../../storage/useStorage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Home() {
    const { storeData, getData } = useStorage();
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [list, setList] = useState([])

    useEffect(() => {
        getData('income').then(setIncome);
        getData('expenses').then(setExpenses);
        getData('list').then(setList);
    }, [])

    useEffect(() => {
        // Salvar dados sempre que eles forem atualizados
        storeData('income', income);
        storeData('expenses', expenses);
        storeData('list', list);
    }, [income, expenses, list]);

    function clearValues() {
        setIncome(0);
        setExpenses(0);
        setList([]);
    }

    function handleAddBalance(entries) {
        entries.forEach(entry => {
            setIncome(income + parseFloat(entry.value));
            const newItem = {
                id: list.length + 1,
                label: entry.name,
                value: entry.value,
                date: new Date().toLocaleDateString(),
                type: 1,
            }
            setList([...list, newItem])
            
        });
    }
    function handleAddExpense(entries) {
        entries.forEach(entry => {
            setExpenses(expenses + parseFloat(entry.value));
            const newItem = {
                id: list.length + 1,
                label: entry.name,
                value: entry.value,
                date: new Date().toLocaleDateString(),
                type: 2,
            }
            setList([...list, newItem])
        });
    }

    async function clearStorage() {
        try {
            await AsyncStorage.clear();
            setIncome(0);
            setExpenses(0);
        } catch(e) {
            console.log(e);
        }
    
        console.log('Done clearing storage.');
    }

    
    function handleDelete(id) {
        // Remove the item from the array
        const newList = list.filter(item => item.id !== id);
    
        // Update the IDs of the remaining items
        newList.forEach((item, index) => {
            item.id = index;
        });
    
        // Update the state
        setList(newList);
        
    }

    const reverseList = [...list].reverse();

    return (
        <View style={styles.container}>
            <Header name='Alisson Martins'/>
            <Balance income={income - parseFloat(expenses) } lost={expenses}
            />
            <Actions addBalance={handleAddBalance} addExpense={handleAddExpense} clearValues={clearValues} />
            <View style={{flex: 1}}>
                <Text style={styles.title}>Últimas Movimentações</Text>
                <FlatList
                    style={styles.list}
                    data={reverseList}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <Movements data={item}
                    handleDelete={handleDelete}
                    />
                    
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginStart: 14,
        marginTop: 25,
        marginBottom: 14
    },
    list: {
        marginStart: 14,
        marginEnd: 14,
        marginTop:14,
        marginBottom: 14,

    }
});
