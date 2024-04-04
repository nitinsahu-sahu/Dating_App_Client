export const formateDate = (date) => {
    const hours = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours > 12 ? 'pm' : 'am'}`
}

export const downloadFile = (e, fileName) => {
    e.preventDefault()
    let downloadOrignalUrl = `${process.env.REACT_APP_SERVER_FILE_IMG_URL}/file/${fileName}`
    try {
        fetch(downloadOrignalUrl).then(res => res.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = "none"
            a.href = url
            const nameSplit = downloadOrignalUrl.split("/").pop()
            a.download = "" + nameSplit + ""
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch(error => console.log("Error while downloading file", error.message))
    } catch (error) {
        console.log("Error while downloading file", error.message)
    }
}