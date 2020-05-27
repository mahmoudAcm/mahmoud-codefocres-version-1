const defaultState = {
    msg: '',
    submitions: [],
    page: [],
    pageNumber: 0,
    maxPageNumber: 0
}

const userStatusView = (state = defaultState, action) => {
    switch(action.type){
        case "CODE":
            return {
                pageNumber: 0,
                submitions: action.solutions,
                verdict: action.verdict,
                maxPageNumber: Math.ceil(action.solutions.length / 20)
            }
        case "INCPAGE":
            return {
                ...state,
                pageNumber: state.pageNumber + 1,
            }
        case "DECPAGE": 
            return {
                ...state,
                pageNumber: state.pageNumber - 1
            }   
        case "SPLITPAGE":
            return {
                ...state,
                page: state.submitions.slice(state.pageNumber * 20 - 20, state.pageNumber * 20)
            }  
        case "LOADSTATUS":
            return {
                ...state,
                msg: action.msg
            }    
        default:
            return state    
    }
}

export default userStatusView ;