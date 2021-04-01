import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { searchProductApi } from '../../api/search'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import Search from '../../components/search/Search'
import ScreenLoading from '../../components/ScreenLoading'
import ResultNotFound from '../../components/search/ResultNotFound'
import ProductList from '../../components/search/ProductList'


export default function SearchScreen(props) {
    const { route: { params } } = props
    const [products, setProducts] = useState(null)

    useEffect(() => {
        (async () => {
            setProducts(null)
            const response = await searchProductApi(params.search)
            setProducts(response)
        })()
    }, [params.search])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.bgDark} />
            <Search currentSearch={params.search} />
            {!products ? (
                <ScreenLoading text="Buscando productos" size={40} />
            ) : size(products) === 0 ? (
                <ResultNotFound search={params.search} />
            ) : (
                <ProductList products={products} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
