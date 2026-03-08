import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import UserDataStorage from '../store/UserStorage'
type props = {
    menuVisisble: boolean,
    oncloseMenu: () => void
}
const ManuItem = [
    {
        "icon_name": "help-circle-sharp",
        "menu_name": "Help"
    },
    {
        "icon_name": "timer-sharp",
        "menu_name": "My Rides"
    },
    {
        "icon_name": "cash-sharp",
        "menu_name": "Payment"
    },
    {
        "icon_name": "notifications-circle-sharp",
        "menu_name": "Notification"

    },
    {
        "icon_name": "settings-sharp",
        "menu_name": "Settings"
    }
]
const Menu = ({ menuVisisble, oncloseMenu }: props) => {
    const { user, phone_number } = UserDataStorage();
    return (
        <Modal
            visible={menuVisisble}
            transparent={true}
            animationType='fade'
        >
            <View style={style.modelContainer}>
                <View style={style.topview}>
                    <Pressable onPress={oncloseMenu}>
                        <Ionicons name="arrow-back" size={30} color="#000" />
                    </Pressable>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Menu</Text>
                </View>
                <View style={style.middleView}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Ionicons name="person-circle-outline" size={60} color="#d1d4d1" />
                        <View>
                            <Text style={style.TextStyle}>{user?.userName}</Text>
                            <Text style={style.TextStyle}>{phone_number}</Text>
                        </View>
                    </View>
                    <View style={style.line} />
                    <View style={{ flexDirection: 'row', gap: 20, marginLeft: 5 }}>
                        <Ionicons name='star' size={50} color="#a49038" />
                        <View>
                            <Text>You're not Rated yet!</Text>
                            <Text style={style.TextStyle}>Rate Now?</Text>
                        </View>
                    </View>
                </View>
                <View style={style.bottomView}>
                    {ManuItem.map((item, idx) => (
                       <React.Fragment key={idx}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', gap: 20 }} >
                                    <Ionicons name={item.icon_name||"accessibility"} size={50} color="#d1d4d1" />
                                    <Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: 10 }}>{item.menu_name}</Text>
                                </View>
                                <Ionicons name="arrow-forward" size={50} color="#000000" />
                            </View>
                            <View style={style.line} />
                        </React.Fragment>
                    ))}
                </View>
            </View>
        </Modal>
    )
}
const style = StyleSheet.create({
    TextStyle: {
        fontWeight: 'bold',
        fontSize: 19
    },
    modelContainer: {
        padding: 10,
        backgroundColor: '#16ecbd',
        flex: 1,
        flexDirection: 'column',
        gap: 3
    },
    topview: {
        flexDirection: 'row',
        gap: 20
    },
    middleView: {
        backgroundColor: '#099173',
        height: 170,
        borderRadius: 20,
        flexDirection: 'column',
        padding: 15
    },
    bottomView: {
        height: '75%',
        backgroundColor: "#758f8a",
        borderRadius: 20,
        padding: 15
    },
    line: {
        height: 1,
        backgroundColor: "#ffffff",
        width: "100%",
        marginVertical: 10
    }
})

export default Menu