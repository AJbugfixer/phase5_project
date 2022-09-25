import React from 'react'
import ReactDom from 'react-dom'

import App from './App';
import { ConText } from './context/DataContext'

ReactDom.render(<ConText><App /></ConText>, document.getElementById('root'));