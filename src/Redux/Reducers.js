
import {addListing} from './Actions';


//global state, that will contain a list of our home objects 
//all the reducer does is save from an incoming dispatch to the store
const globalState = {
    homes: []
}


//reducers aren't supposed to make api calls, since then
export const HomeReducer = (state = globalState, action) => {

    switch (action.type) {
        case "FETCH_HOMES":
            console.log("prev state");
            console.log(state);

            //take old state, spread it's values, then take the payload and add it to the new array
            const newState={
                ...state,
                homes: action.payload
            }

            console.log("new state");
            console.log(newState);
            
            return newState
            break;
        case "ADD_LISTING":

            console.log("from inside add listing: ");
            console.log("current state: ");
            console.log(state);


            //copy 
            const array = state.homes; 

            //push value 
            array.push(action.payload);
        
            const newState2 = {
                ...state,
                homes: array,
            }

            console.log("newstate: ");
            console.log(newState2);

            //you don't need to push the posted home back to the homes array, since we do a fetch already when the list is rendered
            //but better safe then sorry
            return newState2;

            break; 

        default:
            break;
    }


    return state; 
};