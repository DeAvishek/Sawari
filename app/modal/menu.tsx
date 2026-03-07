import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
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
            transparent={false}
            animationType='fade'
            style={style.modalStyle}
        >
            <View style={style.modelContainer}>
                <View style={style.topview}>
                    <Ionicons name="arrow-back" size={30} color="#000" />
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
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', gap: 20 }} key={idx}>
                                    <Ionicons name={item?.icon_name || ""} size={50} color="#d1d4d1" />
                                    <Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: 10 }}>{item.menu_name}</Text>
                                </View>
                                <Ionicons name="arrow-forward" size={50} color="#000000"/>
                            </View>
                            <View style={style.line} />
                        </>
                    ))}
                    <View>

                    </View>
                    <View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}
const style = StyleSheet.create({
    modalStyle: {
        width: '100%',
        height: '100%',
    },
    TextStyle: {
        fontWeight: 'bold',
        fontSize: 19
    },
    modelContainer: {
        padding: 10,
        backgroundColor: '#1bb196',
        flex: 1,
        flexDirection: 'column',
        gap: 3
    },
    topview: {
        flexDirection: 'row',
        gap: 20
    },
    middleView: {
        backgroundColor: '#6cb7a9',
        height: 170,
        borderRadius: 20,
        flexDirection: 'column',
        padding: 15
    },
    bottomView: {
        height: '110%',
        backgroundColor: "#83aba3",
        borderRadius: 20,
        padding: 15
    },
    line: {
        height: 1,
        backgroundColor: "#ccc",
        width: "100%",
        marginVertical: 10
    }
})

export default Menu