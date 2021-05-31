import React, {useEffect, useState} from 'react';

const electron = window.require('electron');
const remote = electron.remote

interface INumberProps {
  initValue: number
}

const Numbers = (props: INumberProps) => {
  const [value, setValue] = useState(props.initValue)

  useEffect(() => {
    // add listener for async messages when component mounts
    electron.ipcRenderer.on('async-reply', handleAsyncMessage)
    return () => {
      // remove the listener when component unmounts
      electron.ipcRenderer.removeListener('async-reply', handleAsyncMessage)
    }
  }, [])

  const onIncrement = () => {
    setValue(value + 1)
  }

  const onDecrement = () => {
    setValue(value - 1)
  }

  const onSyncDouble = () => {
    const result = electron.ipcRenderer.sendSync('sync-message', {number: value})
    setValue(result)
  }

  const onAsyncDouble = () => {
    electron.ipcRenderer.send('async-message', {number: value})
  }

  const handleAsyncMessage = (event: any, message: any) => {
    setValue(message.number)
  }

  return (
    <div>
      Number is {value}
        <div>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
        </div>
        <div>
          <button onClick={onSyncDouble}>Double - Sync</button>
          <button onClick={onAsyncDouble}>Double - Async</button>
        </div>
    </div>
  )
}
export default Numbers