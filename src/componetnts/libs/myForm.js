import React from "react"

const Input = (props) => {
    return (
        <div>
            {props.label && <span>{props.label}</span>}
            <br />
            <input {...props}/>
        </div>
    )
}

const Select = (props) => (
    <div>
        {props.label && <span>{props.label}</span>}
        <br />
        <select {...props}>
        {
            props.options.map(({value, name}) => (
                <option value={value} key={name}>{name}</option>
            ))
        }
        </select>
    </div>
)

const Form = (props) => {
    return (
        <form {...props}>
            <center>
                 {props.children}
            </center>
        </form>
    )
}

const withMahmoudFrom = ({handleSubmit, Comp}) => {
    const values = (e) => {
        e.preventDefault();
        let data = {}
        Array.from(e.target.elements).forEach(({name, value}) => {
            if(name) data[name] = value ;
        });
        handleSubmit(data);
    }
    return (props) => (
        Comp({handleSubmit: values})
    )
}

export {Form, Input, Select, withMahmoudFrom}
