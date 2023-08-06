import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, View, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment/moment'
import 'moment/locale/pt-br'
import commonStyle from '../ComunStyles.js'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        tasks: [{
            id: Math.random(),
            desc: "Comprar vassoura",
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(),
            desc: "Ler Livro de React",
            estimateAt: new Date(),
            doneAt: null
        },
        ]
    }
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks })
    }
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks })
    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={style.container}>
                <ImageBackground source={todayImage} style={style.backgound}  >
                    <View style={style.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyle.colors.secundary} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.titlebar}><Text style={style.title}>Hoje</Text><Text style={style.subtitle}>{today}</Text></View>
                </ImageBackground>
                <View style={style.taskContainer}>
                    <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
            </View>)
    }
}
const style = StyleSheet.create({
    title: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 50,
        color: commonStyle.colors.secundary,
        marginTop: 20,
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    titlebar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    backgound: {
        flex: 3,
    },
    taskContainer: {
        flex: 7,
    },
    subtitle: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.secundary,

    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,

    },
})