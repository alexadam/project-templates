import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Viewer from './viewer';

class View3D extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () =>  (
        <div style={{width:'500px', height:'500px'}}>
            <Viewer shape={this.props.shape} />
        </div>
    )
}

const mapStateToProps = (state) => ({shape: state.View3DReducer.shape})


const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(View3D);
