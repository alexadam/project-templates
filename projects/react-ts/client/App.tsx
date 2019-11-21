import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Numbers from './Numbers';

ReactDOM.render(
    <Numbers initValue={42} />,
    document.getElementById('app') as HTMLElement
  );