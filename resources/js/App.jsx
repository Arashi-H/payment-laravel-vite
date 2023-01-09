// resources/js/App.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { ProSidebarProvider } from 'react-pro-sidebar';

import SideLayout from './components/SideLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import Users from './pages/Users'

import Preloading from './components/Preloading'
import ToastMsg from './components/ToastMsg'

import NonProtectedRoute from './utils/NonProtectedRoute';
import ProtectedRoute from './utils/ProtectedRoute';

import reducers from './reducers/index'
import reportWebVitals from './reportWebVitals'
import './index.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

export default function App(){
	return(
		<Router>
      <Routes>
        <Route exact path="/" element={<NonProtectedRoute><Login /></NonProtectedRoute>} />
        <Route element={<SideLayout/>}>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        </Route>
      </Routes>

      <Preloading />
      <ToastMsg />
    </Router>
	);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();