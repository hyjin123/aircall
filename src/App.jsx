import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Tabs from './Components/TabComponent/Tabs.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Tabs />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
