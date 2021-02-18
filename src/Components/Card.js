import React from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AddListing} from '../Redux/Actions'; 


export const Card = (props)=> {

    const dispatch = useDispatch(); //only function that dispatches
    const navigation = useNavigation();

    console.log("props from card data passed from list: ");
    console.log(props);


    //from the card component we want to pass the props object data to the details screen
    //we can send the image url of the clicked card to the details screen as a param, then grab the data from the store that matches
    //the second argument {url..}, is set to params to the global route object

    return(
    
        <TouchableOpacity style={style.outtercontainer} onPress={()=>navigation.navigate("Details", {url:props.homeProp.item.image})} >
            <View> 
                <Text style={style.title}>{props.homeProp.item.title}</Text>
            </View>
            <View>
                <Image style={style.image} source={
                        {
                            uri: `${props.homeProp.item.image}`
                        }
                    }></Image>
            </View>
                <View style={style.pricecontainer}>
                    <Text style={style.price}>{props.homeProp.item.price}</Text>
                    <Text style={style.year}>{props.homeProp.item.year}</Text>
                </View>
            <View>
                <Text style={style.description}>{props.homeProp.item.description}</Text>
            </View>     
        </TouchableOpacity>  
    )
}


const style = StyleSheet.create({
    outtercontainer:{
        width:"100%",
        backgroundColor:"white",
        marginTop:10,
    }, 

    title:{
        padding:10
    },

    image:{
        borderWidth:1,
        height:200,
    },
    pricecontainer:{
        padding:10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    price:{
        
    },

    year:{
        
    },

    description:{
        padding:10,
        borderWidth:1,
    },

    
})