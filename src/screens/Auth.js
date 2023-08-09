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
export default class Auth extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }
    singinSignUp = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta')
        } else {
            Alert.alert('Sucesso!', 'Logar')
        }
    }
    render() {
        return (<ImageBackground source={backGroudImage} style={style.backgroud}>
            <Text style={style.title}>Tasks</Text>
            <View style={style.formContainer}>
                <Text style={style.subTitle}>
                    {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                </Text>
                {
                    this.state.stageNew &&
                    <TextInput placeholder='Nome' value={this.state.name}
                        style={style.input}
                        onChangeText={name => this.setState({ name })} />

                }
                <TextInput placeholder='E-mail' value={this.state.email} style={style.input}
                    onChangeText={email => this.setState({ email })} />
                <TextInput placeholder='Senha' value={this.state.password}
                    secureTextEntry={true}
                    style={style.input}
                    onChangeText={password => this.setState({ password })} />
                {this.state.stageNew &&
                    <TextInput placeholder='Confirm Password' value={this.state.confirmPassword}
                        style={style.input}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                }
                <TouchableOpacity onPress={this.singinSignUp}>
                    <View style={style.button}>
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
        padding: Platform.OS == 'ios' ? 15 : 10

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