import {actions} from '../actions/actions.js';

 const mainReducer = (state = {counter: 0}, action) => {
     switch (action.type) {
         case actions.ADD:
            return {counter: (state.counter + Number(action.amount))};
         case actions.REMOVE:
            return {counter: (state.counter - Number(action.amount))};
         default:
            return state;
     }
 };

export default mainReducer;
