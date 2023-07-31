import React from 'react'
import { View,Text } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './Src/redux/store'
import Nav from './Nav'

const App = () => {
  return (
    <Provider store={store}>
    <Nav/>
    </Provider>
  )
}

export default App
