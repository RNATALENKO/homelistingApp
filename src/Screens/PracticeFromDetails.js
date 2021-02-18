import React from 'react';
import {View, Text, TouchableOpacity, TextInput, RecyclerViewBackedScrollView} from 'react-native';
import {useState} from 'react';


export const Details = () => {

    const [num, setNum] = useState('none');
    const [hello, setHello] = useState('default value');
    const [input, setInput] = useState('value');


    //function that will send whatever input to the server as post
    //the body isn't being parsed before it reaches the server because of the following reasons: https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request
    //this is because the origin is different on front end in browser, make sure cors is back on, as it protects from a common security threat
    //you will have to turn cors mode back on when launching the app
    //no cors mode: automatically makes the response unreadable and type opaque
    const post = ()=>{
        fetch('http://localhost:8080/test', {
            //mode:'no-cors',// shouldn't need if cors configured correctly
            method:'POST',
            //these headers were triggering a preflight
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                test:input
            })
        }).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
        }).catch(err=>console.log(err));
    }


    const get = ()=>{
        fetch('http://localhost:8080/test').then(results=>{
            return results.json()
        }).then(obj=>{
            console.log(obj);
            console.log(obj.message);
            setHello(obj.message);
        }).catch(err=>console.log(err));
    }


    const getTotalNumber = async () => {

        let record = fetch('http://localhost:8080/test/find'); //returns promise with response object

        console.log(record) //returns promise

        //to resolve the promise use await
        let response = await record; //returns the response object embedded within the promise

        console.log(response);


        //extract the data from the response, but because json() returns a promise with the result, we must use await or .then
        let obj = await response.json();

        console.log(obj);
        console.log(obj.count);

        //set the count
        setNum(obj.count);

    }


    //async means it autmoatically returns any value wrapped in a promise
    //await makes a promise that is getting returned to settle and return a result
    //execution of code pauses during await, until the promise resolves
    //javascript can do other stuff in the mean time. 
    const asyncPractice = async () =>{

        const asyncFunc = async()=>{

            return 1;
        }

        let promise = asyncFunc();

        let resolvedPromise = await promise; 

        console.log(resolvedPromise); //data is output here   
    }


    return(
        <View style={{padding:10}}>
            <Text>Details view</Text>
            <TextInput style={{backgroundColor:"white", width:100}} onChange={(event)=>setInput(event.target.value)}></TextInput>
            <TouchableOpacity onPress={post} style ={{width:100, height:30, backgroundColor:"blue"}}></TouchableOpacity>
            <Text>Get Request: </Text>
            <TouchableOpacity onPress={get} style ={{width:100, height:30, backgroundColor:"blue"}}></TouchableOpacity>
            <Text>{hello}</Text>  
            <Text>Get all record counts </Text>
            <TouchableOpacity onPress={getTotalNumber} style ={{width:100, height:30, backgroundColor:"blue"}}></TouchableOpacity>
            <Text>{num}</Text>  
        </View>
    )
}