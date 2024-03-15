import React from 'react'
const ImageComponent = ({ alt, externalClass, srcLink}) => {
    return (
        <img
            src={`${process.env.REACT_APP_SERVER_IMG_URL}/${srcLink}`}
            className={
                `p-[2px] rounded-full min-w-10 ${externalClass} `
            }
            alt={alt}
        />
    )
}

export default ImageComponent