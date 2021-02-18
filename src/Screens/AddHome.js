import React from 'react';
import { useState } from 'react';
import {View, TextInput, Text, StyleSheet, InputText, ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';
import {addHomeListing} from '../Redux/Actions';




export const AddHome = ()=> {


    const dispatch = useDispatch();


    //form state that will take an object
    const [form, setForm] = useState({});
    const [error, setError] = useState(false);
    const [message, setMessage]= useState('');
    const [loading, setLoading] = useState(false);


    if(loading){
        return (
            <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <ActivityIndicator size={18}></ActivityIndicator>
            </View>
        )
    }




    //method that captures form data and updates form state
    let captureForm = (text, value)=>{
        const homeForm = {
            ...form,
            [value]: text, 
        }
        setForm(homeForm);
        setLoading(false);
    }



    //validate the form for missing fields, or strings in price/year fields, then dispatch form
    let validateForm = (form) =>{

        
        
        //if length of array of form values less then six
        if(Object.values(form).length < 6){

            console.log("less then 6 fields");
            setError(true);
            setMessage("* All fields are required.")
        }

        else if (!parseInt(form.price) || !parseInt(form.year)){

            setError(true);
            setMessage("* Price or year must be a number");

        }

        //if it passes all the validation, make the message dissapear, and dispatch the action to add a listing
        else{
            setError(false);
            setLoading(true);
            console.log("ok to send");
            //method to add the listing to db
            dispatch(addHomeListing(form)).then( result =>{
                alert("successfully created");
                setLoading(false);
            }
            ); 
            
        }

        //then finally navigate back to the homes screen

    }














    //somehow capture the form data
    return(

    <View style={{padding:10}}>
            <View style={{backgroundColor:"white"}}>
                <View style={style.titlecontainer}>
                    <Text>Title:</Text>
                    <TextInput style={style.titleinput} onChangeText={(text)=>captureForm(text, "title")}></TextInput>
                </View>
                <View style={style.imagecontainer}>
                    <Text>Image: </Text>
                    <TextInput style={style.imageinput} onChangeText={(text)=>captureForm(text, "image")} ></TextInput>
                </View>
                <View style={style.pricecontainer}>
                    <Text>price</Text>
                    <TextInput style={style.priceinput}  onChangeText={(text)=>captureForm(text, "price")}></TextInput>
                </View>
                <View style={style.yearcontainer}>
                    <Text>year</Text>
                    <TextInput style={style.yearinput} onChangeText={(text)=>captureForm(text, "year")} ></TextInput>
                </View>
                <View style={style.descriptioncontainer}>
                    <Text>description</Text>
                    <TextInput style={style.descriptioninput} onChangeText={(text)=>captureForm(text, "description")} ></TextInput>
                </View>
                <View style={style.addresscontainer}>
                    <Text>address</Text>
                    <TextInput style={style.addressinput} onChangeText={(text)=>captureForm(text, "address")} ></TextInput>
                </View>
                <View style={{alignItems:"center"}}>
                <Text style={style.addhome} onPress={()=>validateForm(form)} >Add Home</Text> 
                </View>
                
                
            </View>
            <View style={error?style.errorboxshow:style.errorboxhidden}>
                    <Text>{message}</Text>
            </View>
        </View>
        
        )
}


const style = StyleSheet.create({

    maincontainer:{
        backgroundColor:"white",
        margin:10,
    
    },

    titlecontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",
        
    },

    titleinput:{
        borderBottomWidth:1,
    },

    imagecontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",

    },

    imageinput:{
        borderBottomWidth:1,
    },
    pricecontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",

    },
    priceinput:{
        borderBottomWidth:1,
    },
    descriptioncontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",

    },
    descriptioninput:{
        borderBottomWidth:1,
    },
    yearcontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",

    },
    yearinput:{
        borderBottomWidth:1,
    },

    addresscontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",
    },
    addressinput:{
        borderBottomWidth:1,
    },

    addhome:{
        padding:10,
        color:"blue"
    },

    errorboxhidden:{padding:10, backgroundColor:"white", borderWidth:.5, borderColor:"red", display:"none"},
    errorboxshow:{padding:10, backgroundColor:"white", borderWidth:.5, borderColor:"red"},

})