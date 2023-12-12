import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import  BalanceModal  from '../Modal/balanceModal'
import  ExpenseModal  from '../Modal/expenseModal'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CalculatorModal from '../Modal/calculatorModal'


export default function Actions({ addBalance, addExpense, clearValues }) {

    const [balanceModalVisible, setBalanceModalVisible] = useState(false);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);
    const [calculatorModalVisible, setCalculatorModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    function openExpenseModal() {
        setExpenseModalVisible(true);
    }

    function handleOpenModal() {
        setBalanceModalVisible(true);
    }

    function handleAlert(props) {
        Alert.alert(
            "Alerta",
            "Deseja apagar todos os dados?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Botão Cancelar pressionado"),
                style: "cancel"
              },
              //apaagar tudo
              { text: "APAGAR", onPress: () => clearValues()
                    
              }  
            ],
            { cancelable: false },
            setAlertVisible(false)
          );
        setAlertVisible(true);
    }

    function handleOpenCalculator() {
        setCalculatorModalVisible(true);
    }

    function handleCloseModal() {
        setBalanceModalVisible(false);
    }

    return (
        <ScrollView 
        style={styles.container} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}
        >
            <TouchableOpacity style={styles.actionButton} onPress={ handleOpenModal }>
                <View style={styles.areaButton}>
                    <AntDesign name="plus" size={24} color="#000" />
                </View>
                <Text style={styles.labelButton}>Adicionar Saldo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={openExpenseModal} >
                <View style={styles.areaButton}>
                    <AntDesign name="minus" size={24} color="#000" />
                </View>
                <Text style={styles.labelButton}>Adicionar Gasto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleOpenCalculator}>
                <View style={styles.areaButton}>
                    <AntDesign name="calculator" size={24} color="#000" />
                </View>
                <Text style={styles.labelButton}>Calculadora</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleAlert} >
                <View style={styles.areaButton}>
                    <AntDesign name="delete" size={24} color="#000" />
                </View>
                <Text style={styles.labelButton}>Apagar Tudo</Text>
            </TouchableOpacity>

            <BalanceModal 
            visible={balanceModalVisible} 
            close={handleCloseModal}
            addBalance={addBalance}
            type={1}
             />
            <ExpenseModal 
            visible={expenseModalVisible}
            addExpense={addExpense}
            close={() => setExpenseModalVisible(false)}
            />

            <CalculatorModal
            visible={calculatorModalVisible}
            close={() => setCalculatorModalVisible(false)}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 84,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14,
        
    },
    actionButton: {
        alignItems: 'center',
        marginRight: 32,
        
    },
    areaButton: {
        backgroundColor: '#DBBFD8',
        height: 56,
        width: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    labelButton: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 30,
        paddingBottom: 30,

    }

})