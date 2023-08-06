import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, View, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment/moment'
import 'moment/locale/pt-br'
import commonStyle from '../ComunStyles.js'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddTask from './AdicionarTask'
export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        visibleTasks: [],
        showAddTaskModal: true,
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
    componentDidMount = () => {
        this.filterTaks()
    }
    filterTaks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
    }
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTaks)
    }
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTaks)
    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={style.container}>
                <AddTask isVisible={this.state.showAddTaskModal} onCancel={() => this.setState({ showAddTaskModal: false  })} />
                <ImageBackground source={todayImage} style={style.backgound}  >
                    <View style={style.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyle.colors.secundary} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.titlebar}><Text style={style.title}>Hoje</Text><Text style={style.subtitle}>{today}</Text></View>
                </ImageBackground>
                <View style={style.taskContainer}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
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
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 30 : 10,
    },
})