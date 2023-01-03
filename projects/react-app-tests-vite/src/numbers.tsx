import React, {useState} from 'react';

interface INumberProps {
  initValue: number
}

const Numbers = (props: INumberProps) => {
  const [value, setValue] = useState(props.initValue)

  const onIncrement = () => {
    setValue(value + 1)
  }

  const onDecrement = () => {
    setValue(value - 1)
  }

  return (
    <div>
      Number is {value}
        <div>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
        </div>
    </div>
  )
}
export default Numbers


// interface INumbersProps {
//   initValue: number
// }

// interface INumbersState {
//   value: number
// }

// export default class Numbers 
//   extends React.Component<INumbersProps, INumbersState> {

//   constructor(props: INumbersProps) {
//       super(props)
//   }

//   componentWillMount = () => {
//       this.setState({
//           value: this.props.initValue
//       })
//   }

//   onIncrement = () => {
//       let newVal = this.state.value + 1
//       this.setState({
//           value: newVal
//       })
//   }

//   onDecrement = () => {
//       let newVal = this.state.value - 1
//       this.setState({
//           value: newVal
//       })
//   }

//   render = () => {
//       return (
//           <div>
//               Number is {this.state.value}
//               <div>
//                   <button onClick={this.onIncrement}>+</button>
//                   <button onClick={this.onDecrement}>-</button>
//               </div>
//           </div>
//       )
//   }
// }