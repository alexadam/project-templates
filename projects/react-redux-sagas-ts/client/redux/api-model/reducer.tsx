import { ApiData } from './api-model'
import { IApiAction, ApiModelActionTypes} from "./actions";

const initalState: ApiData = {
    data: null,
    error: null,
    isWaitingData: false
}

export const apiDataReducer = (state: ApiData = initalState, action: IApiAction) => {
    switch (action.type) {
        case ApiModelActionTypes.API_CALL_REQUEST:
            return {data: null, error: null, isWaitingData: true}
        case ApiModelActionTypes.API_CALL_SUCCESS:
            return {data: action.data, error: null, isWaitingData: false}
        case ApiModelActionTypes.API_CALL_FAILURE:
            return {data: null, error: action.error, isWaitingData: false}
        default:
            return state
            break;
    }
}

