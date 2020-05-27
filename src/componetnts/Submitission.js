import React from 'react'
import {connect} from 'react-redux'
import split from '../actions/splitIntoPages'
import store from '../stores/store'

const border = {
    border: "1px solid black"
}

const tableStyle = {
    border,
    width: "100%",
    "border-collapse": "collapse",
    "border-spacing": 0
}

const tdStyle = {
    border,
    "background": "#def",
    "border-top": "1px solid #e1e1e1",
    "border-right": "1px solid #e1e1e1",
    padding: "0.4em",
    "font-size": "1.3rem",
    "font-size": "0.9em",
    "text-align": "center",
    overflow: "hidden"
}

const button = {
    color: "white",
    "background-color": "#4CAF50",
    border: "none",
    display: "inline-block",
    padding: "8px 16px",
    cursor: "pointer",
    margin: "5px"
}
const verdictColor = (verdict) => {
    if(verdict === "OK"){
        return {
            ...tdStyle, 
            color: "#0a0"
        }
    }
    return tdStyle
}


const Submitission = (props) => {
    return (
        <div>
            <h1>{props.msg}</h1>
            <table style={tableStyle}>
                {
                    (!props.page || props.page.length == 0? "" :
                    <tr>
                        <th style={{...tdStyle, "background-color": "white"}}>#</th>
                        <th style={{...tdStyle, "background-color": "white"}}>Problem</th>
                        <th style={{...tdStyle, "background-color": "white"}}>Lang</th>
                        {
                        (props.verdict == "anyVerdict" ?
                            <th style={{...tdStyle, "background-color": "white"}}>Verdict</th>
                            : ""
                        )      
                        }   
                    </tr>
                    )
                }
                {
                  (!props.page ? "" :
                  props.page.map((submitission) => {
                      return (
                          <tr>
                            <td style={tdStyle}><a target='_blank' href={`https://codeforces.com/contest/${submitission.contestId}/submission/${submitission.id}`}>{submitission.id}</a></td>
                            <td style={tdStyle}><a target='_blank' href={`https://codeforces.com/contest/${submitission.contestId}/problem/${submitission.problem.index}`}>{`${submitission.problem.index} - ${submitission.problem.name}`}</a></td>
                            <td style={tdStyle}>{submitission.programmingLanguage}</td>
                            {
                                (props.verdict == "anyVerdict" ?
                                    <td style={verdictColor(submitission.verdict)}>{submitission.verdict}</td>
                                    : ""
                                )
                            }
                          </tr>
                      )
                  }))
                }
            </table>
            <div>page: {props.pageNumber}</div>
            {
                (props.submitions.length == 0 ? "" :
                    <center>
                        <button onClick={next} style={button}>next</button>
                        <button onClick={prev} style={button}>prev</button>
                    </center>
                )
            }
        </div>
    )
}

let next = () => {
    const state = store.getState()
    if(state.pageNumber < state.maxPageNumber) {
        split.nextPage();
        split.splitPage();
    }
}

let prev = () => {
    const state = store.getState()
    if(state.pageNumber > 1) {
        split.prevPage();
        split.splitPage();
    }
}

const mapStateToProps = (state) => {
    return {
        submitions: state.submitions,
        msg: state.msg,
        page: state.page,
        pageNumber: state.pageNumber,
        verdict: state.verdict
    }
}

export default connect(mapStateToProps)(Submitission)