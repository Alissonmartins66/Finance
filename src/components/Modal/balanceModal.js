import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStorage from '../../storage/useStorage';


export default function BalanceModal({ addBalance , visible, close, type }) {

    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const { storeData, getData } = useStorage();

    
    function handleInputChange(text) {
        if (text === '') {
            setValue(text);
        } else {
            setValue(text);
        }
    }

    function handleNameChange(inputName) {
        setName(inputName);
    }

   
    async function handleSubmit() {
        addBalance([{value, name}]);
        const oldBalance = await getData('balance') || [];
        console.log('oldBalance:', oldBalance);
        console.log('About to call storeData with:', value, name);
        await storeData('balance',[...oldBalance, { value, name }])
        console.log('handleSubmit is called');
        setName('');
        setValue('');
        close();
    }

    return (
        <Modal 
        visible={visible}
        transparent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <TouchableWithoutFeedback onPress={close}>
                        <Ionicons name="close" size={20} color="#000" style={{alignSelf: 'flex-end'}}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Entrada</Text>

                    <View style={styles.inputRow }>
                        <Text style={styles.name}>Nome:</Text>
                        <TextInput 
                        value={name}
                        onChangeText={handleNameChange}
                        placeholder="Ex: Salário, PIX, etc..."
                        placeholderTextColor="#DBBFD8"
                        style={styles.nameInput}
                        />
                    </View>

                    <View style={styles.inputRow }>
                        <Text style={styles.currency}>R$ +</Text>
                        <TextInput 
                        value={value}
                        onChangeText={handleInputChange}
                        placeholder="Digite o valor de entrada"
                        keyboardType="numeric"
                        placeholderTextColor="#DBBFD8"
                        style={styles.numberInput}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonAdd}>
                        <Text style={styles.buttonText}>Adicionar Saldo</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        color: '#36D97E'
    },
    currency: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        color: '#36D97E'

    },
    nameInput: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#DBBFD8',
        width: '75%',
        textAlign: 'center'
    },
    numberInput: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#DBBFD8',
        width: '80%',
        textAlign: 'center'

    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
    },
    buttonAdd: {
        backgroundColor: '#36D97E',
        width: '60%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 75,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})