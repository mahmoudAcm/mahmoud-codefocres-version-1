import {createStore} from 'redux'
import userStatusView from '../reducers/userStatusView'

const store = createStore(userStatusView) 

store.subscribe(() => {
    console.log(store.getState())
})

export default store