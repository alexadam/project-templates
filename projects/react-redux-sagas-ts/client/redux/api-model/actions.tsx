

export enum ApiModelActionTypes {
    API_CALL_REQUEST = 'API_CALL_REQUEST',
    API_CALL_SUCCESS = 'API_CALL_SUCCESS',
    API_CALL_FAILURE = 'API_CALL_FAILURE'
}

export interface IApiAction {
    type: ApiModelActionTypes
    data?: string
    error?: string
}

export function requestApiData(): IApiAction {
    return {
        type: ApiModelActionTypes.API_CALL_REQUEST
    }
}

export function successApiData(data: string): IApiAction {
    return {
        type: ApiModelActionTypes.API_CALL_SUCCESS,
        data: data
    }
}

export function failApiData(error: string): IApiAction {
    return {
        type: ApiModelActionTypes.API_CALL_FAILURE,
        error: error
    }
}
