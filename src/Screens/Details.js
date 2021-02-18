import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native'; //this gets us access to route and navigation objects
import {useSelector} from 'react-redux';


//remember to pass data from one screen to another, pass it into the route object as you navigate, as a param
export const Details = () => {


    //retrieve this object from the route params
    console.log("global route object: ");
    console.log(useRoute());
    console.log("global navigation object: ");
    console.log(useNavigation());


    //get the url data from the route object
    const url =  useRoute().params.url;
    console.log(url);
    console.log(typeof url);


    //get the home listing from the global state
    //we return an object with the proper data
    const match = useSelector( state=>state.HomeReducer.homes.find(item=>item.image === url));

    console.log("matching home: ");
    console.log(match);


    return(
        <View style={style.wrapper}>
            <Text style={style.title}>{match.title}</Text>
            <Image style={style.image}></Image>
            <Text style={style.price}>{match.price}</Text>
            <Text style={style.price}>{match.year}</Text>
            <Text style={style.description}>{match.description}</Text>
        </View>
    )
}


const style = StyleSheet.create({

    wrapper:{
        margin:10,
        backgroundColor:"white",
    },
    title:{
        padding:20,
    },
    
    image:{
       borderWidth:1,
       height:300,

    },
    price:{
        padding:20,
    },
    description:{
        padding:20,
    },
})