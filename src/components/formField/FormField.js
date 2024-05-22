import React from 'react'

const TextAreaComponents = (props) => {
    return (
        <textarea id={props.id} className={props.cn} type={props.typ} placeholder={props.plh} name={props.name} rows={props.rw} />
    )
}

const InputModule = (props) => {
    return (
        <input
            type={props.type}
            id={props.id}
            name={props.name}
            className={
                `focus:ring-blue-500 border-gray-300 ${props.class}`
            }
            placeholder={props.placeholder}
            required={props.isRequired}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            maxLength={props.maxLength}
            checked={props.checked}
            ref={props.ref}
            style={props.style}
        />

    )
}
const LabelModule = (props) => {
    return (
        <label className={`text-sm font-medium ${props.class}`} for={props.for}>{props.title}</label>
    )
}


const SelectModule = ({ options, value, onChange, id, subTitile }) => {
    return (
        <select id={id} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a {subTitile}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.title}</option>
            ))}
        </select>
    )
}

const ButtonModule = (props) => {
    return (
        <button style={{ backgroundColor: "#ff8c00" }} type={props.typ} className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center ${props.cn}`} id={props.id} onClick={props.onClick}>{props.btnname}</button>
    )
}

const FollowUnfollowModule = ({ typ, onClick, btnname }) => {
    return (
        <button
            type={typ}
            className={
                `py-1 m-1 px-2 text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center`
            }
            onClick={onClick}
        >
            {btnname}
        </button>
    )
}
export { TextAreaComponents, ButtonModule, InputModule, LabelModule, SelectModule, FollowUnfollowModule }
