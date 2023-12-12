// essee modal será uma calculadora com as opções de adição, subtração, multiplicação e divisão
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';


export default function CalculatorModal({ visible, close }) {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);

    const handleNumberPress = (buttonValue) => {
        if (operation === '') {
            if (firstNumber.length < 10) {
                setFirstNumber(firstNumber + buttonValue.toString());
            }
        } else {
            if (secondNumber.length < 10) {
                setSecondNumber(secondNumber + buttonValue.toString());
            }
        }
    }

    const handleOperationPress = (buttonValue) => {
        setOperation(buttonValue.toString());
    }

    const clear = () => {
        setFirstNumber('');
        setSecondNumber('');
        setOperation('');
        setResult(null);
        
    }

    const calculate = () => {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
    
        switch (operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            case '%':
                return num1 % num2;
            case '+/-':
                return num1 * -1;
            default:
                return num1;
        }
    }

    const firstNumberDisplay = () => {
        console.log('firstNumberDisplay is called')
        if (result !== null) {
            return <Text style={result < 99999 ? styles.screenFirstNumber : [styles.screenFirstNumber, {fontSize: 50}]}>{result?.toString()}</Text>; 
        }
        if (firstNumber && firstNumber.length < 6) {
          return <Text style={styles.screenFirstNumber}>{firstNumber}</Text>;
        }
        if (firstNumber === "") {
          return <Text style={styles.screenFirstNumber}>{"0"}</Text>;
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
          return (
            <Text style={[styles.screenFirstNumber, { fontSize: 70 }]}>
              {firstNumber}
            </Text>
          );
        }
        if (firstNumber.length > 7) {
          return (
            <Text style={[styles.screenFirstNumber, { fontSize: 50 }]}>
              {firstNumber}
            </Text>
          );
        }
      };

      const handleEqualPress = () => {
        if (operation && firstNumber && secondNumber) {
            const result = calculate();
            setResult(result);
            setFirstNumber(result.toString());
            setSecondNumber('');
            setOperation('');
        }
    }
    

    return (
        <Modal visible={visible} style={styles.modal}> 
            <View style={styles.overlay}>
                <View style={styles.display}>
                    <Text style={styles.screenSecondNumber}>
                        {secondNumber} {operation}
                    </Text>
                    {firstNumberDisplay()}
                </View>    
            </View>

                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.symbolBtn} onPress={clear}>
                            <Text style={styles.buttonText}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("/")}>
                            <Text style={styles.buttonText}>/</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("%")}>
                            <Text style={styles.buttonText}>%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("+/-")}>
                            <Text style={styles.buttonText}>+/-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("7")}>
                            <Text style={styles.buttonText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("8")}>
                            <Text style={styles.buttonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("9")}>
                            <Text style={styles.buttonText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("*")}>
                            <Text style={styles.buttonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("4")}>
                            <Text style={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("5")}>
                            <Text style={styles.buttonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("6")}>
                            <Text style={styles.buttonText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("-")}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("1")}>
                            <Text style={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("2")}>
                            <Text style={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("3")}>
                            <Text style={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleOperationPress("+")}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.symbolBtn} onPress={() => handleNumberPress(".")}>
                            <Text style={styles.buttonText}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberBtn} onPress={() => handleNumberPress("0")}>
                            <Text style={styles.buttonText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={()=> setFirstNumber(firstNumber.slice(0, -1))}>
                            <Text style={styles.buttonText}>⌫</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.symbolBtn} onPress={handleEqualPress}>
                            <Text style={styles.buttonText}>=</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                    <TouchableOpacity style={styles.exitBtn} onPress={() => { clear(); close(); }} >
                            <Text style={styles.exitBtnText}>Sair</Text>
                    </TouchableOpacity>
                    </View>
                
            </View>
        </Modal>

    )

}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        backgroundColor: '#000',
    },
    container: {
        width: '100%',

        backgroundColor: '#000',   
        position: 'absolute',
        bottom: 0,
    },
    display: {
        width: '80%',
        height: 130,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#DBBFD8',
        marginTop: 30,
        marginLeft: 40,  
        paddingBottom: 20,
    },

    row: {
        flexDirection: 'row',
        maxWidth: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberBtn: {
        width: 65,
        height: 65,
        borderRadius: 17,
        backgroundColor: '#747477',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        color: '#000',
        fontSize: 50,
        
    },
    symbolBtn: {
        width: 65,
        height: 65,
        borderRadius: 17,
        backgroundColor: '#DBBFD8',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    buttonText: {
        color: '#000',
        fontSize: 30,
    },
    screenFirstNumber: {
        fontSize: 70,
        color: '#000',
        fontWeight: '200',
        alignSelf: 'flex-end',
        
    },
    screenSecondNumber: {
        fontSize: 48,
        color: '#000',
        fontWeight: '200',
        alignSelf: 'flex-end',
        marginTop: 20,

    },
    exitBtn: {
        width: 135,
        height: 65,
        borderRadius: 17,
        backgroundColor: '#DBBFD8',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    exitBtnText: {
        color: '#000',
        fontSize: 30,
    },
    
})