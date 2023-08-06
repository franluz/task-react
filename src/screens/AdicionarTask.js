import React, { Component } from 'react'
import ComunStyles from '../ComunStyles'
import Datetimepicker from '@react-native-community/datetimepicker'
import {
    Modal, View, Text,
    TouchableOpacity, TextInput,
    StyleSheet, TouchableWithoutFeedback,
    Platform
} from 'react-native'
import moment from 'moment'
const initialState = { desc: '', date: new Date(), showDatePicker: false }
export default class AddTask extends Component {
    state = {
        ...initialState
    }
    getDatePicker = () => {
        const dateString = moment(this.state.date).format('ddd, D [de] MMM de YYYY')
        let datePicker = <Datetimepicker mode='date'
            value={this.state.date} onChange={(_, date) => this.setState({ date, showDatePicker: false })} />
        if (Platform.OS === 'android') {
            datePicker = (<View>
                <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                    <Text style={styles.date}>{dateString}</Text>
                </TouchableOpacity>
                {this.state.showDatePicker && datePicker}
            </View>)
        }
        return datePicker
    }
    render() {
        return (<Modal transparent={true} visible={this.props.isVisible}
            onRequestClose={this.props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.backgroud}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova tarefa</Text>
                <TextInput style={styles.input} placeholder='Informe a Descrição' value={this.state.desc}
                    onChangeText={desc => this.setState({ desc })}
                />
                {this.getDatePicker()}
                <View style={styles.buttons}>
                    <TouchableOpacity >
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={this.props.onCancel}
            >
                <View style={styles.backgroud}></View>
            </TouchableWithoutFeedback>
        </Modal>)
    }
}
const styles = StyleSheet.create({
    header: {
        fontFamily: ComunStyles.fontFamily,
        backgroundColor: ComunStyles.colors.today,
        color: ComunStyles.colors.secundary,
        padding: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    backgroud: {
        flex: 1,
        backgroundColor: 'rgba(0,0, 0, 0.7)',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input: {
        fontFamily: ComunStyles.fontFamily,
        width: '90%',
        borderWidth: 1,
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderColor: '#333',
        borderRadius: 6
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: ComunStyles.colors.today

    },
    date: {
        fontFamily: ComunStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})