export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//this action registers a user, i.e. makes an api call to server for registration
export const registerForm = (values) => {

    return async (dispatch)=>{

        //logic to post data to db and get a token
        //you can replace localhost with your ip address to create same origin source? 
        const promise = await fetch('http://localhost:8080/user/register',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(values)
        });

        //response will contain the data sent from the server
        const response = await promise.json();
        
        //dispatch to global success or fail based on message
        if(response.success){
            dispatch({
                type:REGISTER_SUCCESS,
                payload:response.savedUser,
            })
        }
        else{
            //dispatch error to state
            dispatch({
                type:REGISTER_FAILURE,
                payload:response //will be {success: false, message: "User doesn't exist"}
            })
        }
    
    //return response given by backend
    return response;
    }
}



export const loginUser = (values) => {

    return async (dispatch)=>{

        //logic to make post request to log in users and get a token
        const promise = await fetch('http://localhost:8080/user/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values),
        })

        //data response from server
        const response = await promise.json();
        console.log(response);

        //if sucessful login
        //dispatch to global state
        if(response.success){
            dispatch({
                type:LOGIN_SUCCESS,
                payload:response.foundUser
            })
        }
        else{
            //otherwise dispatch error message to error state
            dispatch({
                type:LOGIN_FAILURE,
                payload:response
            })
        }

        return response; 
    }
}

