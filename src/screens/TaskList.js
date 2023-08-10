import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, View, ImageBackground, TouchableOpacity, Platform, Alert } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment/moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-async-storage/async-storage'
import commonStyle from '../ComunStyles.js'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddTask from './AdicionarTask'
import { server, showError } from '../commun'
import axios from 'axios'

const initialState = {
    showDoneTasks: true,
    visibleTasks: [],
    showAddTaskModal: false,
    tasks: [
    ]

}
export default class TaskList extends Component {
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        // this.filterTaks()
        const stringEstado = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stringEstado) || initialState
         this.setState({ showDoneTasks: savedState.showDoneTasks }, this.filterTaks)
        this.loadTasks()
    }
    loadTasks = async () => {
        try {
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTaks)
        } catch (e) {
            showError(e)
        }
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
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTaks)
    }
    deleteTask = id => {
        const tasks = this.state.tasks.filter(item => item.id !== id);
        this.setState({ tasks }, this.filterTaks)
    }
    addTask = async newTask => {
         
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informado!')
            return
        }
        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })
        } catch (e) {
            showError(e)
        }
        this.setState({ showAddTaskModal: false }, this.loadTasks)
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
                <AddTask onSave={this.addTask}
                    isVisible={this.state.showAddTaskModal} onCancel={() => this.setState({ showAddTaskModal: false })} />
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
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={style.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTaskModal: true })}>
                    <Icon name="plus" color={commonStyle.colors.secundary} size={20} />
                </TouchableOpacity>
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
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: commonStyle.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    },

})