import store from '../stores/store'

const getStatus = (solutions, verdict) => {
    store.dispatch({
        type:'CODE',
        solutions: solutions,
        verdict
    })
}

const loadingStatus = (msg) => {
    store.dispatch({
        type:'LOADSTATUS',
        msg
    })
}

const load = {
    getStatus,
    loadingStatus
}

export default load