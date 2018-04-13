import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from 'material-ui/CssBaseline';

const MyApp = () => (
  <div>
    <CssBaseline />
    <App />
  </div>
);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();
