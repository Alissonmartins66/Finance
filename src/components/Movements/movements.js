import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Movements( {data, handleDelete} ) {

    const [showValue, setShowValue] = useState(false)

    function handleDeleteClick() {
        handleDelete(data.id)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue)}>
        <View>
            <Text style={styles.date}>{data.date}</Text>
        </View>    
        <View style={[styles.content, {flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={styles.label}>{data.label}</Text>
            <View style={{flex: 1}} />
            { showValue ? (
                <Text style={data.type === 1 ? styles.value : styles.expenses}>
                    {data.type === 1 ? `R$ ${data.value}` : `R$ -${data.value}`}
                </Text>

            ) : (
                <View style={styles.skeleton}></View>
            )}
            <TouchableOpacity>
                <Ionicons name="trash-bin" size={20} color="#000" onPress={handleDeleteClick}/>
            </TouchableOpacity>
        </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.7,
        borderBottomColor: '#DBBFD8',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8,
    },
    date: {
        color: '#DBBFD8',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
       
    },
    label: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 2,
        marginRight: 10,
    },
    value: {
        color: '#36D97E',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    expenses: {
        color: '#FF4F4F',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    skeleton: {
        backgroundColor: '#DBBFD8',
        width: 100,
        height: 16,
        borderRadius: 5,
        marginRight: 10,
    }


})