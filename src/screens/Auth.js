import React, { Component } from 'react'
import {
    ImageBackground,
    StyleSheet, Text,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import backGroudImage from '../../assets/imgs/login.jpg'
import ComunStyles from '../ComunStyles'
import AuthInput from '../components/AuthInput'
import { server, showError, showSucess } from '../commun'
import axios from 'axios'
const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false

}
export default class Auth extends Component {
    state = {
        ...initialState
    }

    singinSignUp = () => {
        if (this.state.stageNew) {
            this.singup()
        } else {
            this.singin()
        }
    }
    singin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }
    }
    singup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
            Alert.alert('usuario cadastrado')
            this.setState({ ...initialState })

        } catch (err) {
            showError(err)
        }

    }
    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)
        if (this.state.stageNew) {
            validations.push(this.state.name)
            validations.push(this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.confirmPassword === this.state.password)

        }
        const validForm = validations.reduce((t, a) => t && a)
        return (<ImageBackground source={backGroudImage} style={style.backgroud}>
            <Text style={style.title}>Tasks</Text>
            <View style={style.formContainer}>
                <Text style={style.subTitle}>
                    {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                </Text>
                {
                    this.state.stageNew &&
                    <AuthInput icon='user' placeholder='Nome' value={this.state.name}
                        style={style.input}
                        onChangeText={name => this.setState({ name })} />

                }
                <AuthInput icon='at' placeholder='E-mail' value={this.state.email} style={style.input}
                    onChangeText={email => this.setState({ email })} />
                <AuthInput icon='lock' placeholder='Senha' value={this.state.password}
                    secureTextEntry={true}
                    style={style.input}
                    onChangeText={password => this.setState({ password })} />
                {this.state.stageNew &&
                    <AuthInput icon='asterisk' placeholder='Confirm Password' value={this.state.confirmPassword}
                        style={style.input}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                }
                <TouchableOpacity onPress={this.singinSignUp} disabled={!validForm}>
                    <View style={[style.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
                        <Text style={style.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                <Text style={style.textAccount}>{this.state.stageNew ? 'Já possue conta?' : 'Ainda não possue conta?'}</Text>
            </TouchableOpacity>
        </ImageBackground>)
    }
}
const style = StyleSheet.create({
    subTitle: {
        fontFamily: ComunStyles.fontFamily,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 20,
        fontFamily: ComunStyles.fontFamily,
        color: ComunStyles.colors.secundary
    },
    textAccount: {
        fontFamily: ComunStyles.fontFamily,
        color: ComunStyles.colors.secundary
    },
    button: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#080',
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        width: '90%'
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 10,

    },
    backgroud: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: ComunStyles.fontFamily,
        color: ComunStyles.colors.secundary,
        fontSize: 70,
        marginBottom: 10
    },
})