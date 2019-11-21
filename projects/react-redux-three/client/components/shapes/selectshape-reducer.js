import {actions} from '../../actions/actions.js';

 const SelectShapeReducer = (state = {shape: 'cube'}, action) => {
     switch (action.type) {
         case actions.SELECT_SHAPE:
            return {shape: (action.shape)};
         default:
            return state;
     }
 };

export default SelectShapeReducer;
