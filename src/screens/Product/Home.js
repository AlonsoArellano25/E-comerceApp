import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Banner from '../../components/Home/Banner'
import NewProducts from '../../components/Home/NewProducts'
import Search from '../../components/search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'

export default function Home() {
    return (
        <ScrollView>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            <ScrollView >
                <Banner />
                <NewProducts />
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})
