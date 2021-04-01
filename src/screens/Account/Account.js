import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Search from '../../components/search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import useAuth from '../../hooks/useAuth'
import { getMeApi } from '../../api/user'
import ScreenLoading from '../../components/ScreenLoading'
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'

export default function Account() {
    const [user, setUser] = useState(null)
    const { auth } = useAuth()
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                setUser(response)
            })()
        }, [])
    )

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            {!user ? (
                <ScreenLoading size="large" />
            ) : (
                <>
                    <ScrollView>
                        <UserInfo user={user} />
                        <Menu />
                    </ScrollView>
                </>
            )}

        </>

    )
}

const styles = StyleSheet.create({

})
