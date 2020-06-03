import * as React from 'react';


/*
const Comp: React.FC<{}> = ({}) => {
    return (
        <div></div>
    )
}
export default Comp
*/


type NumbersProps = {
    initValue: number
}

type NumbersState = {
    value: number
}

export default class Numbers extends React.Component<NumbersProps, NumbersState> {

    constructor(props: NumbersProps) {
        super(props)
    }

    componentWillMount = () => {
        this.setState({
            value: this.props.initValue
        })
    }

    onIncrement = () => {
        let newVal = this.state.value + 1
        this.setState({
            value: newVal
        })
    }

    onDecrement = () => {
        let newVal = this.state.value - 1
        this.setState({
            value: newVal
        })
    }

    render = () => {
        return (
            <div>
                Number is {this.state.value}
                <div>
                    <button onClick={this.onIncrement}>+</button>
                    <button onClick={this.onDecrement}>-</button>
                </div>
            </div>
        )
    }
}