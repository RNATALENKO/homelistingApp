import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {registerForm} from '../Redux/AuthActions';
import {useState} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';


//form schema for validation
const registerFormSchema = yup.object({
    firstname:yup.string().min(3).max(25).required(),
    lastname:yup.string().min(3).max(25).required(),
    email:yup.string().required().email(),
    password:yup.string().min(6).required(),
})


export const Register = ()=>{

    const AsyncStorage = useAsyncStorage('Token');

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [backendError, setBackendError] = useState('');
    


    return(

        <Formik validationSchema={registerFormSchema} initialValues={{firstname:"", lastname:"", email:"", password:""}} onSubmit={(values)=>{
            //perform action here to register user, if successful message, navigate to home
            dispatch(registerForm(values)).then(async response =>{
                //if response sucess is true, navigate to home, otherwise set backend error
                if(response.success)
                {
                    try{
                        await AsyncStorage.setItem(response.token);
                        navigation.navigate("List");
                    }catch(error){
                        console.log(error);
                    }
                    
                    
                }
                else{
                    setBackendError(response.message)
                }

            }).catch(error=>console.log(error));
        }}>

            {
                props => (

                    <View style={style.wrapper}>
                        <Text style={{padding:20}}>Registration</Text>
                        <TextInput onBlur={props.handleBlur('firstname')} onChangeText={props.handleChange('firstname')} placeholder="First name" style={style.firstnameinput}></TextInput>
                        <Text>{props.touched.firstname && props.errors.firstname}</Text>
                        <TextInput onBlur={props.handleBlur('lastname')}  onChangeText={props.handleChange('lastname')} placeholder="Lastname"  style={style.lastnameinput}></TextInput>
                        <Text>{props.touched.lastname && props.errors.lastname}</Text>
                        <TextInput onBlur={props.handleBlur('email')}  onChangeText={props.handleChange('email')} placeholder="email"  style={style.emailinput}></TextInput>
                        <Text>{props.touched.email && props.errors.email}</Text>
                        <TextInput onBlur={props.handleBlur('password')}  onChangeText={props.handleChange('password')} placeholder="password"  style={style.passwordinput} secureTextEntry={true}></TextInput>
                        <Text>{props.touched.password && props.errors.password}</Text>
                        <TouchableOpacity onPress={props.handleSubmit} style={style.registerbutton}>
                            <Text style={{color:"white", textAlign:"center"}}>Register</Text>
                        </TouchableOpacity>

                        <View style={{display:"flex", flexDirection:"row"}}>
                            <Text>Have an account? </Text>
                            <Text style={{color:"blue", textDecorationLine:"underline"}} onPress={()=>navigation.navigate("Login")}>Login</Text>
                        </View>
                        <Text>{backendError}</Text>
                    </View>

                )
            }
        </Formik>


    )
}


const style = StyleSheet.create({

    wrapper:{
        display:"flex",
       justifyContent:"center",
       flex:1,
       alignItems:"center",
    },

    firstnameinput:{
        width:"75%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },
    
    lastnameinput:{
        width:"75%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },
    emailinput:{
        width:"75%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },
    passwordinput:{
        width:"75%",
        backgroundColor:"white",
        borderWidth:1,
        height:35,
        marginBottom:10,
    },
    registerbutton:{
        padding:10,
        backgroundColor:"blue",
        width:"50%",
        marginBottom:10,
    }
})