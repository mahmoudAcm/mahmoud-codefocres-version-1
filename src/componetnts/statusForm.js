import React from "react"
import loadStatus from '../actions/getStatus'
import split from '../actions/splitIntoPages'
const {Form, Input, Select, withMahmoudFrom} = require('./libs/myForm');

const verdictOptions = [
    {name:'Any verdict', value: 'anyVerdict'},
    {name:'Accepted', value:'OK'},
    {name:'Wrong answer', value: 'WRONG_ANSWER'},
    {name:'Memory limit exceeded', value: 'MEMORY_LIMIT_EXCEEDED'},
    {name: 'Time limit exceeded', value: 'TIME_LIMIT_EXCEEDED'},
    {name:'Pending judgement', value: 'SUBMITTED'},
    {name:'Runtime error', value: 'RUNTIME_ERROR'}

]

const applyButtonStyle = {
    width: "50px",
    padding: "5px",
    color:"white",
    "border": "none",
    "background": "red",
    "cursor": "pointer",
    "outline": "none"
}

const FormStyle = {
    width: "200px",
    "border-radius": "5px",
    padding: "20px",
    "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
}

const form = ({handleSubmit}) => (
    <Form onSubmit={handleSubmit} style={FormStyle}>
        <Input type='text' name='handle' placeholder='handle' label='Handle'/>
        <Select name='verdict' options={verdictOptions} label='Verdict'/>
        <Input type='submit' value='Aplly' style={applyButtonStyle}/>
    </Form>
)

const prossessSolutions = (result) => {
      let double = new Map() ;
      let obj = {} ;

      return result.filter(({Ac, contestId, problem, verdict}) => {
          const {index} = problem ;
          obj = {contestId, index} ;
          obj = JSON.stringify(obj) ;
          
          if(Ac && verdict == "OK"){
              if(!double[obj]){
                double[obj] = 1 ;
                return Ac ;
              }
          } else {
            if(!double[obj]){
                double[obj] = 1 ;
                return !Ac ;
            }
          }
          return false ;
      })
}

const handleSubmit = (values) => {
    let data = {}, handle = "", search = {} ;
    handle = values['handle']
    search['verdict'] = values['verdict']
    data = {
        handle,
        search
    }
    data = JSON.stringify(data)
                
    const config = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
    }

    loadStatus.loadingStatus('loading...');
    fetch('/status', config).then((ft) => {
        ft.json().then((solutions) => {
            const status = solutions.status ;
            if(!prossessSolutions(solutions.result).length){
                loadStatus.loadingStatus(`He hasn\'t got ${values['verdict']} yet!`)
                return;
            }
            if(status == "OK"){
                loadStatus.getStatus(prossessSolutions(solutions.result), values['verdict'])
                split.nextPage();
                split.splitPage();
                loadStatus.loadingStatus('finished');
            } else {
                loadStatus.getStatus([])
                loadStatus.loadingStatus(solutions.comment)
            }
        })
    })
} 

const StatusForm = withMahmoudFrom({
    handleSubmit,
    Comp: form
})

export default StatusForm