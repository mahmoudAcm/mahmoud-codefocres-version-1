import store from '../stores/store'

const nextPage = () => {
   store.dispatch({
       type: "INCPAGE"
   })
}

const prevPage = () => {
   store.dispatch({
       type: "DECPAGE" 
   }) 
}

const splitPage = () => {
   store.dispatch({
       type: "SPLITPAGE"
   }) 
}

const split = {
    nextPage,
    prevPage,
    splitPage
}

export default split