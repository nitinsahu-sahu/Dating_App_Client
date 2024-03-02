import React from 'react'

const TextAreaComponents = (props) => {
    return (
        <textarea id={props.id} className={props.cn} type={props.typ} placeholder={props.plh} name={props.nm} rows={props.rw} />
    )
}

const InputModule = (props) => {
    return (
        <input
            type={props.type}
            id={props.name}
            className={
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${props.class}`
            }
            placeholder={props.placeholder}
            required={props.isRequired}
            value={props.value}
            onChange={props.onChange}
        />

    )
}

const LabelModule = (props) => {
    return (
        <label className="block text-sm font-medium text-gray-800 pb-0.2" for={props.for}>{props.title}</label>
    )
}
const ButtonModule = (props) => {
    return (
        <button style={{ backgroundColor: "#ff8c00" }} type={props.typ} className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center ${props.cn}`} id={props.id} onClick={props.onClick}>{props.btnname}</button>
    )
}

export { TextAreaComponents, ButtonModule, InputModule, LabelModule }
