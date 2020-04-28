import React from 'react'
import {requestApiData} from '../api-model/actions'

import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: any) => {
    return { 
        data: state.data,
        error: state.error,
        isWaitingData: state.isWaitingData
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
      requestApiData: () => dispatch(requestApiData())
    };
  }

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
}

const DisplayApiData: React.FC<Props> = (props: Props) => {

    const getData = () => {
        props.requestApiData()
    }

    if (props.isWaitingData) {
        return (
            <div>
                Waiting...
            </div>
        )
    }

    let message = props.data 

    if (props.error) {
        message = props.error.message
    }

    return (
        <div>
            <h1>Api data</h1>
            <div>{message}</div>
            <button onClick={getData}>Get Data</button>
        </div>
    )
}

export default connector(DisplayApiData)