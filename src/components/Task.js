import React from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ComunStyles from '../ComunStyles'
import moment from 'moment';
import 'moment/locale/pt-br'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
export default props => {
    const doneOrNot = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt !== undefined ? props.doneAt : props.estimanteAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM')
    const getRightContent = () => {
        return (
            <TouchableOpacity style={style.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color={'#FFF'} />
            </TouchableOpacity>
        )

    }
    const getLeftContent = () => {
        return (
            <TouchableOpacity style={style.left}>
                <Icon name='trash' size={20} color={'#FFF'} style={style.excludeIcon} />
                <Text style={style.excludeText}>Excluir</Text>
            </TouchableOpacity>
        )

    }
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={getRightContent} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
                renderLeftActions={getLeftContent}>
                <View style={style.container}>
                    <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                        <View style={style.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View><Text style={[style.desc, doneOrNot]}>{props.desc}</Text>
                        <Text style={style.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable></GestureHandlerRootView>)
}
function getCheckView(doneAt) {
    if (doneAt !== null) {
        return (<View style={style.done}>
            <Icon name="check" size={20} color="#fff" />

        </View>)
    } else {
        return (<View style={style.pending}>
            <Text></Text></View>)

    }
}
const style = StyleSheet.create({
    excludeIcon: {
        marginLeft: 10
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: ComunStyles.fontFamily,
        color: '#FFF',
        fontSize: 10,
        margin: 10
    },
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: 'center',
        // justifyContent:"center",
        paddingVertical: 10
    },

    checkContainer: {
        alignItems: "center",
        width: "20%"
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: "#4D7031",
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: ComunStyles.fontFamily,
        color: ComunStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: ComunStyles.fontFamily,
        color: ComunStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
        , justifyContent: 'flex-end',
        paddingHorizontal: 20
    }
})