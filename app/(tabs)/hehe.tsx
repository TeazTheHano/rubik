import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function hehe() {
    const nav = useNavigation()
    return (
        <SafeAreaView>
            <StatusBar translucent={false} />
            <Text>sdhjkfjsahkdfajkshd</Text>
            <TouchableOpacity onPress={() => { nav.navigate('noHehe' as never) }}>
                <Text>go to no hehe</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}