import React from 'react';
import { connect } from 'react-redux';

const Display = (props) => (
    <h1>{props.counter}</h1>
);

const mapStateToProps = (state) => ({counter: state.counter})

export default connect(mapStateToProps)(Display);
