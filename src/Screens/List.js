import React from 'react';
import {View,Text, TouchableOpacity, StyleSheet, ScrolleView, Button, ActivityIndicator} from 'react-native'; 
import { Navigation } from '../Navigation/Navigation';
import {Card} from '../Components/Card';
import {FloatingAction} from 'react-native-floating-action';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'; 
import { useState } from 'react/cjs/react.development';
import {fetchHomes} from '../Redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";



//each object defines one button
const actions = [
    {
        text: "Add Home",
        name:"add button",
    }
]

export const List = (props)=>{

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [firstname, setFirstname] = useState('');


    const loadToken = async () =>{

        //get the token
        const token = await AsyncStorage.getItem("Token");
        console.log("fetching token from storage: ");
        console.log(token);

        //decode the token
        console.log("decoded token: ");
        const tokenDecoded = jwt_decode(token);
        console.log(tokenDecoded);
        console.log(tokenDecoded.firstname);
        setFirstname(tokenDecoded.firstname);


    }

    //useEffect executes before every render, and after the component is updated
    //useEffect to dispatch a load in data, when component is rendered
    //important for services: https://reactjs.org/docs/hooks-effect.html
    useEffect(()=>{

    
        //call the async
        loadToken();


        //call the action themthod within dispatch method
        //dispatch takes in an object, but because we use redux thunk it will just execute the returned aysnc function we have
        dispatch(fetchHomes()).then(results=>{setLoading(false)});
        
    }, [dispatch]) //this dependency forces useEffect to only run when dispatch is initialized. ^^^ see above. 


     //the useSelector returns a state object with the reducer
     /*
            
        {
            HomeReducer: {
                homes: [ {more objects}]
            }
        }

     */

        //if data is loading return the activity indicator
    if(loading){
        return (
            <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <ActivityIndicator size={18}></ActivityIndicator>
            </View>
        )
    }

    //get the data
     const homeArray = useSelector((state)=>{
        return state.HomeReducer.homes; 
    });

    console.log("list rendered, useSelector from store state: ");
    console.log(homeArray);

    if(homeArray.length===0){
        return (
            <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <Text style={{width:"75%"}}>Hello, you have no home listings, trying adding one!</Text>
                <FloatingAction onPressMain={()=>props.navigation.navigate("AddHome")}  distanceToEdge={{vertical:10}} animated={true} showBackground={false} position= "center" action={actions}></FloatingAction>
            </View>
            
        )
    }
    
   

    // the flat list takes in an array of objects
    //the key extractor takes an object in (item from the data set), and returns whatever property you choose
    //render item returns a component for each item, we extract all of the data with {item} so that we can pass it into component
    //we pass the home data as a prop to the card
    return(
      <View style={{borderWidth:5, flex:1}}>
                
                <ScrollView style={{padding:10}}>
                    <FlatList data={homeArray} keyExtractor={item=>item.image} renderItem={(item)=>{return <Card homeProp={item}></Card>}}></FlatList>
                </ScrollView>
                <FloatingAction onPressMain={()=>props.navigation.navigate("AddHome")}  distanceToEdge={{vertical:10}} animated={true} showBackground={false} position= "center" action={actions}></FloatingAction> 

      </View>
      
    )
}

const style = StyleSheet.create({

    touchable:{
        padding:10,
        height:200,
        borderWidth:1,
    },
})