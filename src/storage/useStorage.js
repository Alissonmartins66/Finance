import AsyncStorage from '@react-native-async-storage/async-storage';

// Armazenar dados
const useStorage = () => {
    async function storeData(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.log(error);
        }
    }

    // Buscar dados
    async function getData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                let parsedValue = JSON.parse(value);
                // Se parsedValue for um objeto, converta-o em um array
                if (typeof parsedValue === 'object' && !Array.isArray(parsedValue)) {
                    parsedValue = [parsedValue];
                }
                return parsedValue;
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Deletar dados
    async function deleteData(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }

    return { storeData, getData, deleteData };
}

export default useStorage;
