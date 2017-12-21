import {actions} from '../../actions/actions.js';

 const View3DReducer = (state = {shape: 'cube'}, action) => {
     console.log('here', action);
     switch (action.type) {
         case actions.SELECT_SHAPE:
            return {shape: (action.shape)};
         default:
            return state;
     }
 };

export default View3DReducer;
