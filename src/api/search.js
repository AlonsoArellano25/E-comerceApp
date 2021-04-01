import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, SEARCH_HISTORY } from '../utils/constants'
import { size } from 'lodash'
import { sortArrayByDate } from '../utils/functions'

export async function getSearchHistoryApi() {
    //await AsyncStorage.removeItem(SEARCH_HISTORY)
    try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY)
        if (!history) return []
        return sortArrayByDate(JSON.parse(history))
    } catch (error) {
        return []
        console.log(error)
    }
}

export async function updateSearchHistory(search) {
    const history = await getSearchHistoryApi()

    if (size(history) > 5) history.pop()

    history.push({
        search,
        date: new Date()
    })

    await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history))
}

export async function searchProductApi(search) {
    try {
        const url = `${API_URL}/products?_q=${search}&_limit=40`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}