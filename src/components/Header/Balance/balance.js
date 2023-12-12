
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function Balance({income, lost}) {

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Saldo</Text>
                    <View style={styles.content}>
                        <Text style={styles.currencySymbol}>R$</Text>
                        <Text style={styles.balance}>{income}</Text>
                    </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Gastos</Text>
                    <View style={styles.content}>
                        <Text style={styles.currencySymbol}>R$</Text>
                        <Text style={styles.expenses}>{lost}</Text>
                    </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 5,
        paddingTop: 24,
        paddingBottom: 24,
        zIndex: 99,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DBBFD8',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySymbol: {
        color: '#DBBFD8',
        fontSize: 20,
    },
    balance: {
        color: '#36D97E',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    expenses: {
        color: '#FF4D4D',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    pencil: {
        marginLeft: 10,
    },
    
})