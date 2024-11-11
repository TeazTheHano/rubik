import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

export default function noHehe() {

    const nav = useNavigation()
    return (
        <View style={{ backgroundColor: 'red' }}>
            <Text>no hehe</Text><Text>no hehe</Text><Text>no hehe</Text><Text>no hehe</Text>
            <TouchableOpacity onPress={() => { nav.goBack() }}>
                <Text>go to hehe</Text>
            </TouchableOpacity>
        </View>
    )
}



// export class ViewColCenter extends Component<{ children?: React.ReactNode, style?: any }> {
//     render() {
//         return (
//             <View style={[styles.flexColCenter, this.props.style]}>
//                 {this.props.children}
//             </View>
//         )
//     }
// }