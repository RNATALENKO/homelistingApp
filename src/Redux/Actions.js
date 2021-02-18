export const ADD_LISTING = "ADD_LISTING";
export const FETCH_HOMES = "FETCH_HOMES";
import AsyncStorage from '@react-native-async-storage/async-storage';



//supposed to return an action object bec dispatch() inputs an object with type and payload
//instead, redux-thunk allows us to execute the second inner function instead of returning an action object
export const AddListing = () =>{

    //return a function
    return (dispatch, getState)=>{


        //perform a post method here
        //get the response, then send response to the state
        console.log("perform post request");

    }
}


//perform a fetch for all the data from a database, then send it to the global state
export const fetchHomes = ()=>{

    return async (dispatch)=>{

        //get the token
        const token = await AsyncStorage.getItem('Token');

        //fetch the data from the api
        let promise = await fetch('http://localhost:8080/api/homes', {
            headers:{
                'Authorization': token,
            }
        });
        let data = await promise.json();
        console.log(data);

        //next we dispatch over to the reducer/store
        //payload is the data, we're sending the data to the store, which will go through the reducer, in the reducer is where we want to copy the new data
        dispatch({
            type:FETCH_HOMES,
            payload: data,
        })
    
    }
}


//this action receives the form object, then posts it to the db, then dispatches it to the homes array as well
export const addHomeListing = (form) => {

    //execute a request to post to db when this action is called in form page
    return async (dispatch) => {

        console.log("array from within action:");
        console.log(form);

        let promise = await fetch('http://localhost:8080/api/homes',{
            method: "POST",
            body:JSON.stringify(form),
            headers:{
                'Authorization': await AsyncStorage.getItem('Token')
            }
        })

        let response = await promise.json();

        //server should respond with the actual record that got added, should contain prev listings
        console.log("response: ");
        console.log(response);


        //dispatch the action object: with the type name, and object for the payload
        //we don't have to send this to the global state because the list component fetches every time it's renderd
        
        dispatch({
            type:"ADD_LISTING",
            payload: response
        })

    }

}