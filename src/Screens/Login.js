import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from  'yup';
import {useDispatch} from 'react-redux';
import {loginUser} from '../Redux/AuthActions';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



//form schema with yup
const loginFormSchema = yup.object({
    username:yup.string().email(),
    password:yup.string().required().min(6),
})


export const Login = (props)=>{


    const navigation = useNavigation();
    const dispatch= useDispatch();
    const [backendError, setBackendError] = useState("");



    return(
        <KeyboardAvoidingView style={style.wrapper}>

            <Formik validationSchema={loginFormSchema} initialValues={{username:"", password:""}} onSubmit={(values)=>{
                dispatch(loginUser(values)).then(async response=>{
                    
                    //if login successful, store token, then navigate to home otherwise set error message to state
                    if(response.success){
                        await AsyncStorage.setItem('Token', response.token);
                        navigation.navigate("List");
                    } else{
                        setBackendError(response.message)
                    };
                }).catch(error=>console.log(error));;
            }}>

            {
                (props) => (    
                    <View>
                        <View style={style.logo}>
                                <Image style={style.logoimage}>

                                </Image>
                        </View>
                        <TextInput onBlur={props.handleBlur('username')} value={props.values.username} onChangeText={props.handleChange('username')} placeholder="Username" style={style.usernameinput} keyboardType="email-address" ></TextInput>
                        <Text>{props.touched.username && props.errors.username}</Text>
                        <TextInput onBlur={props.handleBlur('password')}  value={props.values.password} onChangeText={props.handleChange('password')} placeholder="Password" style={style.passwordinput} secureTextEntry={true}></TextInput>
                        <Text>{props.touched.password && props.errors.password}</Text>
                        <TouchableOpacity onPress={props.handleSubmit} type="submit" style={style.loginbutton}>
                            <Text style={{color:"white", textAlign:"center"}}>Login</Text>
                        </TouchableOpacity>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <Text>Don't have an account? </Text>
                            <Text style={{color:"blue", textDecorationLine:"underline"}} onPress={()=>navigation.navigate("Register")}>Register</Text>
                        </View>
                        <Text>{backendError}</Text>
                        
                        
                    </View>
                )
            }
            

            </Formik>

            

                  
        </KeyboardAvoidingView>


    )

}


const style = StyleSheet.create({

    wrapper:{
       display:"flex",
       justifyContent:"center",
       flex:1,
       alignItems:"center",
    },
    logo:{

    },
    logoimage:{

        width:100,
        height:100,
        backgroundColor:'grey'

    },
    usernameinput:{
        width:"100%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },
    passwordinput:{
        width:"100%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },

    loginbutton:{
        padding:10,
        backgroundColor:"blue",
        width:"50%",
        marginBottom:10,
    }
})