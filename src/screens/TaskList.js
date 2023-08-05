import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, Dimensions, TouchableHighlight, View, ImageBackground } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment/moment'
import 'moment/locale/pt-br'
import commonStyle from '../ComunStyles.js'
import Task from '../components/Task'

export default class TaskList extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd,D [de] MMM')
        return (<View style={style.container}>
            <ImageBackground source={todayImage} style={style.backgound}  >
            <View style={style.titlebar}><Text style={style.title}>Hoje</Text><Text style={style.subtitle}>{today}</Text></View>
            </ImageBackground>
            <View style={style.taskContainer}>
                <Task desc="Comprar Livros" estimateAt={"{new Date()}"} doneAt={"null"}/>
            </View>
        </View>)
    }
}
const style = StyleSheet.create({
    title:{
        fontFamily:commonStyle.fontFamily,
        fontSize:50,
        color: commonStyle.colors.secundary,
        marginTop:20,
        marginBottom:20


    },
    container: {
        flex: 1
    },
    titlebar:{
        flex:1,
        justifyContent:'flex-end'
    },
    backgound: {
        flex: 3,
    },
    taskContainer: {
        flex: 7,
    },
    subtitle:{
        fontSize: 20,
        marginLeft:20,
        marginBottom:30,
        fontFamily:commonStyle.fontFamily,
        color: commonStyle.colors.secundary,
     
    },
})