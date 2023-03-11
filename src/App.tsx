import React from 'react'
import Routers from './routers/Routers'
import store from './store/storeConfig'
import { Provider } from 'react-redux'

function App() {
    return (
        <Provider store={store}>
            <Routers />
        </Provider>
    )
}

export default App
