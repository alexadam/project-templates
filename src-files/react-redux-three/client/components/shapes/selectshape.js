import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import {selectShape} from '../../actions/actions.js'

import './selectshape.scss';

class SelectShape extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        let b1ClassName = this.props.shape === 'cube' ? 'focus' : 'normal';
        let b2ClassName = this.props.shape === 'sphere' ? 'focus' : 'normal';

        return (
            <div>
                <button className={b1ClassName} onClick={ () => (this.props.selectShape('cube')) }>Cube</button>
                <button className={b2ClassName} onClick={ () => (this.props.selectShape('sphere')) }>Sphere</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({shape: state.SelectShapeReducer.shape})


const mapDispatchToProps = (dispatch) => ({
    selectShape: bindActionCreators(selectShape, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectShape);
