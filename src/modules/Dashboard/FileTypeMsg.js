import { IoMdStopwatch } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { formateDate } from "../../components/common-component/DateFormat";
import { memo } from "react";

const FileTypeMsg = ({ msg, updatedAt }) => {
    function downloadFile(e, fileName) {
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
    return (
        <>
            {
                msg?.includes('.pdf') ? <div>
                    <div className="grid justify-center">
                        <iframe src={`${process.env.REACT_APP_SERVER_FILE_IMG_URL}/file/${msg}`} className='h-28 w-28' />
                    </div>
                    <div className='flex justify-between'>
                        <div style={{ width: '9rem', height: '35px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            <p className='text-xs mt-1 pdftext '>{msg}</p>
                        </div>
                        <div className='content-center grid'>
                            <MdFileDownload
                                size={18}
                                className='rounded-lg border-2 border-black'
                                onClick={(e) => downloadFile(e, msg)}
                            />
                        </div>
                    </div>

                    <div className='msg-time '>
                        <span className='pt-0.5' style={{ color: '#b71c1c' }}><IoMdStopwatch /></span>{formateDate(updatedAt)}
                    </div>
                </div> : <div>
                    <img src={`${process.env.REACT_APP_SERVER_FILE_IMG_URL}/file/${msg}`} height={10} />
                    <div className='flex justify-between'>
                        <div style={{ width: '9rem' }}>
                            <p className='text-xs mt-1 imgtext'>{msg}</p>
                        </div>
                        <div className='content-center grid'>
                            <MdFileDownload
                                size={18}
                                className='rounded-lg border-2 border-black'
                                onClick={(e) => downloadFile(e, msg)}
                            />
                        </div>
                    </div>
                    <div className='msg-time '>
                        <span className='pt-0.5' style={{ color: '#b71c1c' }}><IoMdStopwatch /></span>{formateDate(updatedAt)}
                    </div>
                </div>
            }
        </>
    )
}

export default memo(FileTypeMsg)