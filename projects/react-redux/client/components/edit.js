import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import {add, remove} from '../actions/actions.js'

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        counter: 0
    }

    onChange = (e) => this.setState({counter:e.target.value});

    render = () =>  (
        <div>
            <input type="text" value="0" onChange={this.onChange} value={this.state.counter}/>
            <button onClick={ () => (this.props.add(this.state.counter)) }>Add</button>
            <button onClick={ () => (this.props.remove(this.state.counter)) }>Sub</button>
        </div>
    )
}

const mapStateToProps = (state) => ({ counter: state.counter })

const mapDispatchToProps = (dispatch) => ({
    add: bindActionCreators(add, dispatch),
    remove: bindActionCreators(remove, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
