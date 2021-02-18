
import React from 'react';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Details} from '../Screens/Details';
import {List} from '../Screens/List';
import {About} from '../Screens/About';
import {Entypo} from '@expo/vector-icons';
import {AddHome} from '../Screens/AddHome';
import { TabBarIOS } from 'react-native';
import {Login} from '../Screens/Login';
import {Register} from '../Screens/Register';


//to have tab navigotor on all screens, make sure it's the root component


//bottom tabs navigator
const BottomTabs = createBottomTabNavigator();

//note: when you're returning an object, then you need parenthesies around the object
//params => ({foo: "a"}) // returning the object {foo: "a"}
const BottomTabsNavigator = ()=>{

    return(   
        <BottomTabs.Navigator  screenOptions={({route})=>({
            tabBarIcon:()=>{

                let iconName; 
                if(route.name ==="Home"){
                    iconName = 'home';
                }
                else if(route.name == "About"){
                    iconName = "info-with-circle";
                }
                return <Entypo name={iconName} size={18} color="black"></Entypo>
            }
        })}>
            <BottomTabs.Screen name="Home" component={List}></BottomTabs.Screen>
            <BottomTabs.Screen name="About" component={About} options={{tabBarLabel:"About"}}></BottomTabs.Screen>
        </BottomTabs.Navigator>
    )
}

const AboutStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="About" component={About}></Stack.Screen>
        </Stack.Navigator>
    )
}

const DetailsStack = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Details" component={Details}></Stack.Screen>
        </Stack.Navigator>
    )
}


//stack navigator
const Stack = createStackNavigator();
const StackNavigator = () => {
    return(

        <Stack.Navigator>
            
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}}></Stack.Screen>
                <Stack.Screen name="List" component={BottomTabsNavigator} options={{title: "Homes", headerLeft:null,}}></Stack.Screen>
                <Stack.Screen name="Details" component={Details}></Stack.Screen>
                <Stack.Screen name="AddHome" component={AddHome}></Stack.Screen>
        </Stack.Navigator>
    )
}




export const Navigation = () => {
    return(

        <NavigationContainer>
               <StackNavigator></StackNavigator>
        </NavigationContainer>
    )
}
