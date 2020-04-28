import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Numbers from './Numbers';

import MainReduxApp from './redux/MainRedux'

ReactDOM.render(
   <MainReduxApp />,
    document.getElementById('app') as HTMLElement
  );