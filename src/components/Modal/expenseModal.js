import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExpenseModal({ addExpense , visible, close}) {

    const [value, setValue] = useState(null);
    const [name, setName] = useState('');
    
    function handleInputChange(text) {
        const amount = parseFloat(text)
        setValue(amount.toString());
    }

    function handleNameChange(inputName) {
        setName(inputName);
    }

    function handleSubmit() {
        addExpense([{value, name}]);
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
                    <Text style={styles.title}>Gastos</Text>
                    
                    <View style={styles.inputRow }>
                        <Text style={styles.name}>Nome:</Text>
                        <TextInput 
                        value={name}
                        onChangeText={handleNameChange}
                        placeholder="Ex: Aluguel, Luz, etc..."
                        placeholderTextColor="#DBBFD8"
                        style={styles.nameInput}
                        />
                    </View>

                    <View style={styles.inputRow }>
                        <Text style={styles.currency}>R$ -</Text>
                        <TextInput 
                        value={value}
                        onChangeText={handleInputChange}
                        placeholder="Digite o valor de saída"
                        keyboardType="numeric"
                        placeholderTextColor="#DBBFD8"
                        style={styles.numberInput}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonAdd}>
                        <Text style={styles.buttonText}>Adicionar Gasto</Text>
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
        color: '#FF4D4D'
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
    currency: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 10,
        color: '#FF4D4D'

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
        backgroundColor: '#FF4D4D',
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