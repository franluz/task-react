import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ComunStyles from '../ComunStyles'
export default props => {
    return (<View style={style.container}>
        <View style={style.checkContainer}>
            {getCheckView(props.doneAt)}
        </View>
        <View><Text>{props.desc}</Text>
        <Text >{props.estimateAt + ""}</Text>
    </View>
       </View>)
}
function getCheckView(doneAt){
    if(doneAt!==null){
        return (<View style={style.done}>
                  <Icon name="check" size={20} color="#fff" />
                          
             </View>)
    }else{
        return (<View style={style.pending}>
            <Text></Text></View>)

    }
}
const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: 'center',
        // justifyContent:"center",
        paddingVertical: 10
    },

    checkContainer:{
        alignItems:"center",
        width:"20%"
    },
    pending:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#555',
    },
    done:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        backgroundColor:"#4D7031",
        borderColor:'#555',
        alignItems:'center',
        justifyContent:'center'
    },
})