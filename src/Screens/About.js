import React from 'react';
import {View, Text} from 'react-native'; 
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';




export const About = props =>{

    let logout = (props) => {

        AsyncStorage.removeItem('Token').then(result=>{
            props.navigation.replace('Login');
        }).catch(error=>console.log(error));
    }

    return(

        <View style={{display:"flex", alignItems:"center"}}> 
            <Text style={{padding:20, textAlign:"center", width:"75%"}}>This is an application where you can post home listings</Text>
            <TouchableOpacity style={{width:"100%", padding:20, backgroundColor:"blue"}}><Text style={{color:"white"}} 
            onPress={()=>logout(props)}>Logout</Text></TouchableOpacity>
        </View>
        
    )
}