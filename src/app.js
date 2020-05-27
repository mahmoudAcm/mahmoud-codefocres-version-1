import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux' ;
import store from './stores/store'
import StatusForm from './componetnts/statusForm'
import Submitission from './componetnts/Submitission'

const jsx = (
    <Provider store={store}>
        <StatusForm />
        <Submitission />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById("root"))
