import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getProductApi } from '../../api/product'
import Search from '../../components/search'
import ScreenLoading from '../../components/ScreenLoading'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import CarouselImage from '../../components/Product/CarouselImage'
import { ScrollView } from 'react-native-gesture-handler'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'

export default function Product(props) {
    const { route } = props
    const { params } = route

    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        (async () => {
            const response = await getProductApi(params.idProduct)
            setProduct(response)

            const arrayImages = [response.main_image]
            arrayImages.push(...response.images)
            setImages(arrayImages)
        })()
    }, [params])

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} />
            <Search />
            {!product ? (
                <ScreenLoading text="Cargando producto" size="large" />
            ) : (
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{product.title}</Text>
                    <CarouselImage images={images} />
                    <View style={styles.containerView}>
                        <Price price={product.price} discount={product.discount} />
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                        <Buy product={product} quantity={quantity} />
                        <Favorite product={product} />
                    </View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        padding: 10
    },
    containerView: {
        padding: 10,
    }
})
